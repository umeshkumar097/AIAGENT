import { db } from '../../../server/db';
import { sql } from 'drizzle-orm';
import { OpenAIPoolService } from '../../../server/engines/plivo/services/openai-pool.service';
import { RAGKnowledgeService, cosineSimilarity, generateEmbedding } from '../../../server/services/rag-knowledge';
import type { WhatsAppConversation, WhatsAppMessage } from '../types';
import { whatsAppConversationService } from './whatsapp-conversation.service';
import { whatsAppAutoReplySettingsService } from './whatsapp-auto-reply-settings.service';
import { whatswayService } from './whatsway.service';
import { metaWhatsAppService } from './meta-whatsapp.service';

/**
 * WhatsApp AI auto-reply: answers an inbound customer message with the conversation's assigned
 * agent (system prompt + knowledge base) through OpenAI chat/completions and sends the reply as a
 * 24-hour session message via the provider that delivered the inbound (Waki or Meta).
 *
 * Guarantees: one AI reply per inbound message (atomic claim), never replies to our own outbound,
 * ignores messages older than MAX_MESSAGE_AGE_MS, sends nothing outside the 24-hour window.
 */

export type InboundProvider = 'whatsway' | 'meta';

export interface InboundReplyContext {
  userId: string;
  conversation: WhatsAppConversation;
  message: WhatsAppMessage;
  provider: InboundProvider;
  /** Provider timestamp of the inbound message (defaults to now). */
  receivedAt?: Date;
}

const LOG = '[WhatsApp AutoReply]';
const DEFAULT_MODEL = 'gpt-4o-mini';
const MAX_MESSAGE_AGE_MS = 5 * 60 * 1000;
const HISTORY_MESSAGES = 12;
const OPENAI_TIMEOUT_MS = 25_000;
const HANDOFF_MARKER = '[HANDOFF]';
/** Same retrieval thresholds as the Sarvam voice pipeline (sarvam-knowledge.ts). */
const KB_MAX_CHUNKS = 2000;
const KB_MIN_SCORE = 0.25;
const KB_MAX_PASSAGES = 4;
const KB_MAX_CONTEXT_CHARS = 1400;
const KB_MIN_QUERY_WORDS = 3;
const KB_CACHE_TTL_MS = 5 * 60 * 1000;
const REPLYABLE_TYPES = new Set(['text', 'button', 'interactive']);

const HANDOFF_PATTERNS: RegExp[] = [
  /\b(human|real person|live agent|customer care|support team|representative|operator|executive)\b/i,
  /\btalk to (an? )?(agent|someone|person)\b/i,
  /\bspeak (to|with) (an? )?(agent|someone|person)\b/i,
  /\bagent\b/i,
  /\bbaat karn[ia] hai\b/i,
  /\bkisi se baat\b/i,
  /\b(insaan|aadmi|bande|banda) se (baat|milna)\b/i,
  /किसी से बात|इंसान से|बात करनी है|एजेंट/,
];

const WHATSAPP_STYLE_WRAPPER = `
You are now replying on WhatsApp chat, not on a phone call. Rules for every reply:
- Keep it short: 2 to 4 sentences, plain conversational text.
- Reply in the same language AND script the customer uses (Devanagari if they write Devanagari, Hinglish in Latin letters if they write Hinglish, English if they write English).
- No markdown: no asterisks, no headings, no bullet lists, no code blocks. Emojis only if the customer uses them.
- Use only the business information you have been given; if you do not know, say so briefly and offer to connect them with the team.
- If the customer asks for a human, a team member, or a callback, or you cannot help, write one short handover line and put the marker ${HANDOFF_MARKER} at the very end of the reply.
`.trim();

interface AgentRow {
  id: string;
  name: string;
  systemPrompt: string | null;
  llmModel: string | null;
  language: string | null;
  knowledgeBaseIds: string[] | null;
}

interface KbCacheEntry {
  loadedAt: number;
  chunks: Array<{ text: string; embedding: number[] }>;
}

function resolveChatModel(llmModel: string | null | undefined): string {
  const model = (llmModel || '').trim();
  if (!model) return DEFAULT_MODEL;
  // Voice agents store realtime/audio models that chat/completions does not accept
  if (/realtime|whisper|translate|tts|transcribe/i.test(model)) return DEFAULT_MODEL;
  return model;
}

export function wantsHuman(text: string): boolean {
  const trimmed = (text || '').trim();
  if (!trimmed) return false;
  return HANDOFF_PATTERNS.some(pattern => pattern.test(trimmed));
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/`+/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export class WhatsAppAutoReplyService {
  private kbCache = new Map<string, KbCacheEntry>();

  /**
   * First message from a new contact: apply the user's default agent when the account default is on.
   * Returns the (possibly updated) conversation.
   */
  async applyUserDefaults(userId: string, conversation: WhatsAppConversation): Promise<WhatsAppConversation> {
    if (!conversation.isNew) return conversation;
    const settings = await whatsAppAutoReplySettingsService.findByUserId(userId);
    if (!settings?.whatsappAutoReplyDefault || !settings.defaultWhatsappAgentId) return conversation;
    await whatsAppConversationService.setAutoReply(userId, conversation.id, true, settings.defaultWhatsappAgentId);
    console.log(`${LOG} New conversation ${conversation.id}: default agent applied`);
    return { ...conversation, autoReplyEnabled: true, assignedAgentId: settings.defaultWhatsappAgentId };
  }

  /** Entry point for webhooks. Never throws; every failure is logged and swallowed. */
  async handleInbound(ctx: InboundReplyContext): Promise<void> {
    try {
      await this.process(ctx);
    } catch (error: any) {
      console.error(`${LOG} Failed for conversation ${ctx.conversation.id}: ${error?.message || error}`);
    }
  }

  private async process(ctx: InboundReplyContext): Promise<void> {
    const { userId, message } = ctx;
    if (message.direction !== 'inbound' || message.senderType !== 'customer') return;
    if (!REPLYABLE_TYPES.has(message.messageType) || !message.content?.trim()) return;

    const receivedAt = ctx.receivedAt || new Date(message.createdAt || Date.now());
    if (Date.now() - receivedAt.getTime() > MAX_MESSAGE_AGE_MS) {
      console.log(`${LOG} Ignoring stale inbound (${Math.round((Date.now() - receivedAt.getTime()) / 1000)}s old)`);
      return;
    }

    // Re-read: the webhook refreshed the window after the object we were handed was loaded
    const conversation = await whatsAppConversationService.getConversationById(ctx.conversation.id);
    if (!conversation || conversation.userId !== userId) return;
    if (!conversation.autoReplyEnabled || !conversation.assignedAgentId) return;
    if (conversation.status !== 'active') return;

    const claimed = await whatsAppConversationService.claimAutoReply(conversation.id, message.id);
    if (!claimed) {
      console.log(`${LOG} Reply already claimed for message ${message.id}; skipping`);
      return;
    }

    if (!whatsAppConversationService.isWindowOpen(conversation)) {
      console.log(`${LOG} 24-hour window closed for conversation ${conversation.id}; nothing sent`);
      return;
    }

    const agent = await this.loadAgent(userId, conversation.assignedAgentId);
    if (!agent) {
      console.warn(`${LOG} Assigned agent not found for conversation ${conversation.id}; auto-reply disabled`);
      await whatsAppConversationService.setAutoReply(userId, conversation.id, false);
      return;
    }

    if (wantsHuman(message.content)) {
      await this.handoff(ctx, conversation, agent, 'Sure — connecting you to our team. Someone will reply here shortly.');
      return;
    }

    const [history, knowledge] = await Promise.all([
      whatsAppConversationService.getMessages(conversation.id, { limit: HISTORY_MESSAGES }),
      this.retrieveKnowledge(userId, agent, message.content),
    ]);

    const reply = await this.generateReply(agent, history, knowledge);
    if (!reply) return;

    const handoffRequested = reply.includes(HANDOFF_MARKER);
    const text = stripMarkdown(reply.replace(HANDOFF_MARKER, '')).trim();

    if (text) await this.send(ctx, conversation, agent, text, message.id);
    if (handoffRequested) {
      await whatsAppConversationService.handoffToHuman(conversation.id);
      console.log(`${LOG} Model requested handoff for conversation ${conversation.id}`);
    }
  }

  private async handoff(ctx: InboundReplyContext, conversation: WhatsAppConversation, agent: AgentRow, ack: string): Promise<void> {
    await this.send(ctx, conversation, agent, ack, ctx.message.id);
    await whatsAppConversationService.handoffToHuman(conversation.id);
    console.log(`${LOG} Customer asked for a human in conversation ${conversation.id}; auto-reply off`);
  }

  private async send(
    ctx: InboundReplyContext,
    conversation: WhatsAppConversation,
    agent: AgentRow,
    text: string,
    replyToMessageId: string
  ): Promise<void> {
    const { userId, provider } = ctx;
    try {
      const sendResult = provider === 'meta'
        ? await metaWhatsAppService.sendReply(userId, conversation.contactPhone, text, { agentId: agent.id })
        : await whatswayService.sendReply(userId, conversation.contactPhone, text, { agentId: agent.id });

      await whatsAppConversationService.addMessage({
        conversationId: conversation.id,
        userId,
        direction: 'outbound',
        senderType: 'agent',
        messageType: 'text',
        content: text,
        metaMessageId: sendResult?.messageId,
        status: 'sent',
        metadata: { agentId: agent.id, replyTo: replyToMessageId, source: 'auto-reply', provider },
      });
      console.log(`${LOG} Replied in conversation ${conversation.id} via ${provider} (${text.length} chars)`);
    } catch (error: any) {
      console.error(`${LOG} Send failed for conversation ${conversation.id}: ${error?.message || error}`);
    }
  }

  private async loadAgent(userId: string, agentId: string): Promise<AgentRow | null> {
    const result = await db.execute(sql`
      SELECT id, name, system_prompt, llm_model, language, knowledge_base_ids
      FROM agents WHERE id = ${agentId} AND user_id = ${userId} LIMIT 1
    `);
    const row = (result as any).rows[0];
    if (!row) return null;
    return {
      id: row.id,
      name: row.name,
      systemPrompt: row.system_prompt,
      llmModel: row.llm_model,
      language: row.language,
      knowledgeBaseIds: Array.isArray(row.knowledge_base_ids) ? row.knowledge_base_ids : null,
    };
  }

  private async loadChunks(userId: string, agent: AgentRow): Promise<KbCacheEntry['chunks']> {
    const ids = (agent.knowledgeBaseIds || []).filter(id => typeof id === 'string' && id.length > 0);
    if (ids.length === 0) return [];
    const cacheKey = `${userId}:${agent.id}:${ids.join(',')}`;
    const cached = this.kbCache.get(cacheKey);
    if (cached && Date.now() - cached.loadedAt < KB_CACHE_TTL_MS) return cached.chunks;
    const chunks = await RAGKnowledgeService.loadChunksForSearch(ids, userId, KB_MAX_CHUNKS);
    this.kbCache.set(cacheKey, { loadedAt: Date.now(), chunks });
    return chunks;
  }

  /** Best passages for the inbound text, formatted for the system prompt (null when none). */
  private async retrieveKnowledge(userId: string, agent: AgentRow, query: string): Promise<string | null> {
    try {
      const trimmed = query.trim();
      if (trimmed.split(/\s+/).length < KB_MIN_QUERY_WORDS) return null;
      const chunks = await this.loadChunks(userId, agent);
      if (chunks.length === 0) return null;

      const embedding = await generateEmbedding(trimmed);
      const ranked = chunks
        .map(chunk => ({ text: chunk.text, score: cosineSimilarity(embedding, chunk.embedding) }))
        .filter(c => c.score >= KB_MIN_SCORE)
        .sort((a, b) => b.score - a.score)
        .slice(0, KB_MAX_PASSAGES);
      if (ranked.length === 0) return null;

      let budget = KB_MAX_CONTEXT_CHARS;
      const passages: string[] = [];
      for (const { text } of ranked) {
        if (budget <= 80) break;
        const slice = text.length > budget ? `${text.substring(0, budget - 1)}…` : text;
        passages.push(`- ${slice}`);
        budget -= slice.length;
      }
      return passages.join('\n');
    } catch (error: any) {
      console.warn(`${LOG} Knowledge retrieval failed: ${error?.message || error}`);
      return null;
    }
  }

  private async getOpenAIKey(): Promise<string | null> {
    try {
      const cred = await OpenAIPoolService.getLeastLoadedCredential();
      if (cred?.apiKey) return cred.apiKey;
    } catch (error: any) {
      console.warn(`${LOG} OpenAI pool lookup failed: ${error?.message || error}`);
    }
    return process.env.OPENAI_API_KEY || null;
  }

  private async generateReply(agent: AgentRow, history: WhatsAppMessage[], knowledge: string | null): Promise<string | null> {
    const apiKey = await this.getOpenAIKey();
    if (!apiKey) {
      console.error(`${LOG} No OpenAI credential available (pool empty and OPENAI_API_KEY unset)`);
      return null;
    }

    const systemParts = [
      (agent.systemPrompt || `You are ${agent.name}, a helpful assistant for this business.`).trim(),
      WHATSAPP_STYLE_WRAPPER,
    ];
    if (knowledge) systemParts.push(`Relevant business information for this question:\n${knowledge}`);

    const messages = [
      { role: 'system', content: systemParts.join('\n\n') },
      ...history
        .filter(m => m.content && m.content.trim())
        .map(m => ({
          role: m.direction === 'inbound' ? 'user' : 'assistant',
          content: m.content.trim().substring(0, 2000),
        })),
    ];
    if (messages.length === 1) return null;

    const model = resolveChatModel(agent.llmModel);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages, temperature: 0.4, max_tokens: 320 }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        console.error(`${LOG} OpenAI ${response.status} for model ${model}: ${detail.substring(0, 200)}`);
        return null;
      }
      const json: any = await response.json();
      const text = json?.choices?.[0]?.message?.content;
      return typeof text === 'string' && text.trim() ? text.trim() : null;
    } catch (error: any) {
      console.error(`${LOG} OpenAI request failed: ${error?.name === 'AbortError' ? 'timeout' : error?.message}`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
}

export const whatsAppAutoReplyService = new WhatsAppAutoReplyService();
