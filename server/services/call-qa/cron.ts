/**
 * Call QA cron: every 2 minutes score up to 20 completed Plivo/Sarvam calls that have a
 * transcript (>= 200 chars) and no score yet, oldest first. Test calls, free-plan users and the
 * global `call_qa_enabled=false` switch are skipped. Runs from server/index.ts, never from the
 * call-status webhook.
 */
import { findEligibleCalls, isCallQaEnabled, scoreCall } from "./index";

const SWEEP_INTERVAL_MS = 2 * 60_000;
const FIRST_SWEEP_DELAY_MS = 30_000;
const MAX_PER_SWEEP = 20;
const LOG = "🧪 [CallQA]";

let sweeping = false;
let timer: NodeJS.Timeout | null = null;

/** One sweep; overlapping sweeps are skipped. Returns the number of calls scored. */
export async function runCallQaSweep(): Promise<number> {
  if (sweeping) return 0;
  sweeping = true;
  let scored = 0;
  try {
    if (!(await isCallQaEnabled())) return 0;
    const calls = await findEligibleCalls(MAX_PER_SWEEP);
    for (const call of calls) {
      const outcome = await scoreCall(call.id);
      if (outcome.ok) scored++;
    }
    if (calls.length > 0) console.log(`${LOG} Sweep scored ${scored}/${calls.length} call(s)`);
  } catch (error: unknown) {
    console.error(`${LOG} Sweep error:`, error instanceof Error ? error.message : error);
  } finally {
    sweeping = false;
  }
  return scored;
}

export function startCallQaCron(): void {
  if (timer) return;
  console.log(`${LOG} Cron started (every ${SWEEP_INTERVAL_MS / 1000}s, up to ${MAX_PER_SWEEP} calls per sweep)`);
  setTimeout(() => { void runCallQaSweep(); }, FIRST_SWEEP_DELAY_MS);
  timer = setInterval(() => { void runCallQaSweep(); }, SWEEP_INTERVAL_MS);
}

export function stopCallQaCron(): void {
  if (timer) clearInterval(timer);
  timer = null;
}
