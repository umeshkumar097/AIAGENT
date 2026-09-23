/**
 * Call QA scorer: builds the grading prompt, calls OpenAI chat/completions (gpt-4o-mini, JSON mode)
 * and validates the reply strictly (numbers clamped to 1-10, text capped, flags whitelisted).
 * No API keys are ever logged.
 */
import { QA_FLAGS, type QaFlag } from "@shared/schema-call-qa";

export const QA_MODEL = "gpt-4o-mini";
export const QA_PROMPT_VERSION = 1;

const MAX_TRANSCRIPT_CHARS = 12_000;
const MAX_SYSTEM_PROMPT_CHARS = 3_000;
const MAX_SUMMARY_CHARS = 600;
const MAX_BULLET_CHARS = 200;
const MAX_VERDICT_CHARS = 300;
const REQUEST_TIMEOUT_MS = 45_000;

export interface QaInput {
  transcript: string;
  agentSystemPrompt?: string | null;
  agentName?: string | null;
  aiSummary?: string | null;
  durationSeconds?: number | null;
  callDirection?: string | null;
}

export interface QaResult {
  overall: number;
  greeting: number;
  understanding: number;
  objectionHandling: number;
  compliance: number;
  closing: number;
  strengths: string[];
  improvements: string[];
  flags: QaFlag[];
  verdict: string;
}

export class QaScoringError extends Error {
  constructor(message: string, public readonly retryable: boolean) {
    super(message);
  }
}

/** Keep the head and tail of very long transcripts so both greeting and closing survive. */
function trimTranscript(transcript: string): string {
  const clean = transcript.replace(/\r/g, "").trim();
  if (clean.length <= MAX_TRANSCRIPT_CHARS) return clean;
  const head = Math.floor(MAX_TRANSCRIPT_CHARS * 0.6);
  const tail = MAX_TRANSCRIPT_CHARS - head;
  return `${clean.slice(0, head)}\n\n[... ${clean.length - MAX_TRANSCRIPT_CHARS} characters omitted ...]\n\n${clean.slice(-tail)}`;
}

function cap(text: string | null | undefined, max: number): string {
  const s = (text || "").replace(/\s+/g, " ").trim();
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

export const QA_SYSTEM_PROMPT = `You are a strict but fair quality-assurance reviewer for AI voice agents that make and receive phone calls.
You grade the AGENT (not the caller). Score on a 1-10 scale where 10 is flawless, 7 is solid, 5 is mediocre and below 4 is poor.
Return ONLY a JSON object with exactly these keys:
{
  "overall": 1-10 integer,
  "greeting": 1-10 (opened warmly, identified itself and the purpose of the call quickly),
  "understanding": 1-10 (understood the caller's intent, answered what was asked, did not loop or misunderstand),
  "objectionHandling": 1-10 (handled hesitation, pushback or off-script questions gracefully; 7 if no objections came up and nothing was mishandled),
  "compliance": 1-10 (followed the agent's system prompt / instructions: allowed topics, tone, language, mandatory disclosures, hand-off rules),
  "closing": 1-10 (confirmed next steps, summarised, said goodbye; did not hang up abruptly),
  "strengths": exactly 3 short bullet strings (max 20 words each),
  "improvements": exactly 3 short actionable bullet strings (max 20 words each),
  "flags": array drawn ONLY from ["rude","wrong_info","talked_over_caller","unresolved"] (empty when none apply),
  "verdict": one sentence (max 30 words)
}
Flag meanings: rude = impolite/dismissive/condescending; wrong_info = stated facts that contradict the instructions or are clearly false;
talked_over_caller = interrupted or ignored what the caller was saying; unresolved = caller's need was not met and no next step was agreed.
Write bullets and the verdict in English. Be concrete: quote or reference what happened in the call.`;

export function buildUserPrompt(input: QaInput): string {
  const parts: string[] = [];
  if (input.agentName) parts.push(`Agent name: ${cap(input.agentName, 80)}`);
  if (input.callDirection) parts.push(`Call direction: ${cap(input.callDirection, 20)}`);
  if (typeof input.durationSeconds === "number") parts.push(`Duration: ${Math.max(0, Math.round(input.durationSeconds))} seconds`);
  parts.push("");
  parts.push("=== AGENT INSTRUCTIONS (system prompt the agent was supposed to follow) ===");
  parts.push(input.agentSystemPrompt ? cap(input.agentSystemPrompt, MAX_SYSTEM_PROMPT_CHARS) : "(not available — grade compliance on general professionalism)");
  if (input.aiSummary) {
    parts.push("");
    parts.push("=== CALL SUMMARY (auto-generated, may be imperfect) ===");
    parts.push(cap(input.aiSummary, MAX_SUMMARY_CHARS));
  }
  parts.push("");
  parts.push("=== TRANSCRIPT ===");
  parts.push(trimTranscript(input.transcript));
  parts.push("");
  parts.push("Grade the agent and return the JSON object.");
  return parts.join("\n");
}

function clampScore(value: unknown): number {
  if (value === null || value === undefined || value === "") return 5;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 5;
  return Math.min(10, Math.max(1, Math.round(n)));
}

function bullets(value: unknown, count: number): string[] {
  const list = Array.isArray(value) ? value : [];
  const out = list
    .map((item) => (typeof item === "string" ? cap(item, MAX_BULLET_CHARS) : ""))
    .filter((item) => item.length > 0)
    .slice(0, count);
  return out;
}

/** Strict validation of the model's JSON; never trusts shape, range or vocabulary. */
export function parseQaResponse(raw: string): QaResult {
  let data: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    data = parsed as Record<string, unknown>;
  } catch {
    throw new QaScoringError("Model returned invalid JSON", true);
  }
  const flags = Array.isArray(data.flags)
    ? Array.from(new Set(data.flags.filter((f): f is QaFlag => typeof f === "string" && (QA_FLAGS as readonly string[]).includes(f))))
    : [];
  return {
    overall: clampScore(data.overall),
    greeting: clampScore(data.greeting),
    understanding: clampScore(data.understanding),
    objectionHandling: clampScore(data.objectionHandling),
    compliance: clampScore(data.compliance),
    closing: clampScore(data.closing),
    strengths: bullets(data.strengths, 3),
    improvements: bullets(data.improvements, 3),
    flags,
    verdict: cap(typeof data.verdict === "string" ? data.verdict : "", MAX_VERDICT_CHARS),
  };
}

/** One chat/completions call in JSON mode. Throws QaScoringError; 429/5xx/timeouts are retryable. */
export async function scoreWithOpenAI(input: QaInput, apiKey: string): Promise<QaResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: QA_MODEL,
        temperature: 0.2,
        max_tokens: 700,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: QA_SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(input) },
        ],
      }),
    });
  } catch (error: unknown) {
    const aborted = error instanceof Error && error.name === "AbortError";
    throw new QaScoringError(aborted ? "OpenAI request timed out" : "OpenAI request failed", true);
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    const retryable = response.status === 429 || response.status >= 500;
    throw new QaScoringError(`OpenAI responded ${response.status}`, retryable);
  }
  const body = await response.json().catch(() => null) as { choices?: Array<{ message?: { content?: string } }> } | null;
  const content = body?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) throw new QaScoringError("OpenAI returned an empty completion", true);
  return parseQaResponse(content);
}
