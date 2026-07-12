'use strict';
/**
 * ============================================================
 * BullMQ Call Worker
 * Processes campaign calls by delegating to existing campaign services
 * 
 * This worker is designed to be isolated and opt-in.
 * It orchestrates call processing and delegates to existing services
 * to avoid duplicating business logic.
 * ============================================================
 */

import { Worker, Job } from 'bullmq';
import { getRedisConnection } from './redis-connection';
import { QUEUE_NAMES, CampaignCallJob } from './queues';
import { substituteContactVariables, enrichDynamicDataWithContactInfo } from '../../utils/contact-variable-substitution';

const MAX_CONCURRENT_CALLS = parseInt(process.env.BULLMQ_MAX_CONCURRENT_CALLS || '10', 10);

let callWorker: Worker<CampaignCallJob> | null = null;

interface CallResult {
  success: boolean;
  callId: string;
  duration?: number;
  status: 'completed' | 'failed' | 'no-answer' | 'busy' | 'error' | 'initiated';
  error?: string;
}

async function processCall(job: Job<CampaignCallJob>): Promise<CallResult> {
  const { callId, campaignId, engine, retryCount } = job.data;
  
  console.log(`[CallWorker] Processing call ${callId} for campaign ${campaignId} engine=${engine} (attempt ${retryCount + 1})`);
  
  try {
    const result = await initiateCall(job.data);
    console.log(`[CallWorker] Call ${callId} result: ${result.status}`);
    return result;
    
  } catch (error: any) {
    console.error(`[CallWorker] Call ${callId} failed:`, error.message);
    
    return {
      success: false,
      callId,
      status: 'error',
      error: error.message,
    };
  }
}

async function initiateCall(data: CampaignCallJob): Promise<CallResult> {
  const { callId, phone, agentId, campaignId, contactId, userId, engine, metadata } = data;
  
  const { db } = await import('../../db');
  const { agents, contacts, campaigns, calls } = await import('../../../shared/schema');
  const { eq } = await import('drizzle-orm');
  
  const [agent] = await db.select().from(agents).where(eq(agents.id, agentId)).limit(1);
  
  if (!agent) {
    throw new Error(`Agent ${agentId} not found`);
  }
  
  const [contact] = await db.select().from(contacts).where(eq(contacts.id, contactId)).limit(1);
  
  if (!contact) {
    throw new Error(`Contact ${contactId} not found`);
  }
  
  const [existingCall] = await db.select().from(calls).where(eq(calls.id, callId)).limit(1);
  if (existingCall && existingCall.status !== 'pending' && existingCall.status !== 'queued') {
    console.log(`[CallWorker] Call ${callId} already has status ${existingCall.status}, skipping`);
    return {
      success: true,
      callId,
      status: 'initiated',
    };
  }
  
  try {
    let success = false;
    let errorMessage: string | undefined;
    
    switch (engine) {
      case 'openai': {
        const { TwilioOpenAICallService } = await import('../../engines/twilio-openai/services/twilio-openai-call.service');
        const { phoneNumbers } = await import('../../../shared/schema');
        
        const fromNumberId = metadata?.fromNumberId as string;
        if (!fromNumberId) {
          throw new Error('fromNumberId is required for OpenAI calls');
        }
        
        const result = await TwilioOpenAICallService.initiateCall({
          agentId,
          campaignId,
          contactId,
          toNumber: phone,
          userId,
          fromNumberId,
        });
        success = result.success;
        errorMessage = result.error;
        break;
      }
      
      case 'sip': {
        const { PlivoElevenLabsOutboundService } = await import('../../engines/plivo-elevenlabs/services/outbound-call.service');
        const { sipTrunks, sipPhoneNumbers, elevenLabsCredentials } = await import('../../../shared/schema');
        
        if (!agent.sipPhoneNumberId) {
          throw new Error('Agent has no SIP phone number configured');
        }
        
        const [sipPhone] = await db.select().from(sipPhoneNumbers).where(eq(sipPhoneNumbers.id, agent.sipPhoneNumberId)).limit(1);
        
        if (!sipPhone || !sipPhone.sipTrunkId) {
          throw new Error('SIP phone number not found or has no trunk');
        }
        
        const [sipTrunk] = await db.select().from(sipTrunks).where(eq(sipTrunks.id, sipPhone.sipTrunkId)).limit(1);
        
        if (!sipTrunk || sipTrunk.provider !== 'plivo') {
          throw new Error('Only Plivo SIP trunks are supported');
        }
        
        const [elCred] = agent.elevenLabsCredentialId 
          ? await db.select().from(elevenLabsCredentials).where(eq(elevenLabsCredentials.id, agent.elevenLabsCredentialId)).limit(1)
          : [];
        
        if (!elCred) {
          throw new Error('ElevenLabs credentials not found');
        }
        
        // Substitute contact variables in firstMessage
        const contactInfo = {
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
          customFields: contact.customFields as Record<string, any> || null,
        };
        const hydratedFirstMessage = agent.firstMessage 
          ? substituteContactVariables(agent.firstMessage, contactInfo)
          : undefined;
        
        const dynamicData = enrichDynamicDataWithContactInfo(contactInfo);
        
        const result = await PlivoElevenLabsOutboundService.makeCall({
          toNumber: phone,
          fromNumber: sipPhone.phoneNumber,
          agentId: agent.elevenLabsAgentId || agentId,
          elevenLabsApiKey: elCred.apiKey,
          plivoAuthId: sipTrunk.username || '',
          plivoAuthToken: sipTrunk.password || '',
          agentConfig: {
            agentId: agent.elevenLabsAgentId || agentId,
            firstMessage: hydratedFirstMessage,
            language: agent.language || undefined,
            dynamicData,
          },
          // Tracking fields so the call can be recorded and billed.
          userId,
          dbAgentId: agent.id,
          campaignId,
          contactId,
        });
        success = result.success;
        errorMessage = result.error;
        break;
      }
      
      case 'elevenlabs': {
        console.log(`[CallWorker] ElevenLabs calls are handled by batch API, marking ${callId} as initiated`);
        success = true;
        break;
      }

      case 'elevenlabs-sip': {
        // ElevenLabs SIP: call via ElevenLabs API directly (no Plivo WebSocket bridge)
        const { sipPhoneNumbers } = await import('../../../shared/schema');
        const { importPlugin } = await import('../../utils/plugin-import');

        if (!agent.sipPhoneNumberId) {
          throw new Error('Agent has no SIP phone number configured for elevenlabs-sip');
        }

        const [sipPhone] = await db.select()
          .from(sipPhoneNumbers)
          .where(eq(sipPhoneNumbers.id, agent.sipPhoneNumberId))
          .limit(1);

        if (!sipPhone || !sipPhone.externalElevenLabsPhoneId) {
          throw new Error('SIP phone number not found or not provisioned with ElevenLabs');
        }

        if (!agent.elevenLabsAgentId) {
          throw new Error('Agent does not have an ElevenLabs agent ID');
        }

        const contactInfo = {
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
          customFields: contact.customFields as Record<string, any> || null,
        };

        // Build dynamic variables for ElevenLabs
        const dynamicVars: Record<string, string> = {
          contact_phone: phone,
          contact_name: [contact.firstName, contact.lastName].filter(Boolean).join(' ') || '',
          contact_first_name: contact.firstName || '',
          contact_last_name: contact.lastName || '',
          contact_email: contact.email || '',
        };

        const sipClientData: Record<string, unknown> = {
          source: 'campaign',
          campaignId,
          contactId,
          dynamic_variables: dynamicVars,
        };

        const { ElevenLabsSipService } = await importPlugin('plugins/sip-engine/services/elevenlabs-sip.service.ts');

        const result = await ElevenLabsSipService.makeOutboundCall(
          userId,
          sipPhone as any,
          phone,
          agentId,
          sipClientData
        );

        success = result.success;
        errorMessage = result.error;

        if (result.success) {
          console.log(`[CallWorker] ElevenLabs SIP call initiated: ${result.conversationId}`);
        }
        break;
      }
      
      case 'plivo': {
        const { PlivoCallService } = await import('../../engines/plivo/services/plivo-call.service');
        const { plivoPhoneNumbers, flows } = await import('../../../shared/schema');
        const { OpenAIAgentFactory } = await import('../../engines/plivo/services/openai-agent-factory');
        const { PlivoEngineConfig } = await import('../../engines/plivo/config/plivo-config');
        
        const plivoPhoneNumberId = metadata?.plivoPhoneNumberId as string;
        if (!plivoPhoneNumberId) {
          throw new Error('plivoPhoneNumberId is required for Plivo OpenAI calls');
        }
        
        const [plivoPhone] = await db.select().from(plivoPhoneNumbers).where(eq(plivoPhoneNumbers.id, plivoPhoneNumberId)).limit(1);
        if (!plivoPhone) {
          throw new Error('Plivo phone number not found');
        }
        
        // Mark contact as in_progress
        await db
          .update(contacts)
          .set({ status: 'in_progress' })
          .where(eq(contacts.id, contact.id));
          
        const agentConfigData = agent.config as Record<string, any> || {};
        const validatedVoice = OpenAIAgentFactory.validateVoice(
          agent.openaiVoice || PlivoEngineConfig.defaults.voice
        );
        const validatedModel = OpenAIAgentFactory.validateModel(
          agentConfigData.openaiModel || PlivoEngineConfig.defaults.model,
          'pro'
        );
        
        let agentConfig: any;
        
        const buildSystemPromptHelper = (cont: any) => {
          let prompt = agent.systemPrompt || '';
          prompt = prompt.replace(/\{firstName\}/g, cont.firstName);
          prompt = prompt.replace(/\{lastName\}/g, cont.lastName || '');
          prompt = prompt.replace(/\{phone\}/g, cont.phone);
          prompt = prompt.replace(/\{email\}/g, cont.email || '');
          const customFields = cont.customFields as Record<string, any> || {};
          for (const [key, val] of Object.entries(customFields)) {
            prompt = prompt.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val || ''));
          }
          return prompt;
        };
        
        const buildFirstMessageHelper = (cont: any) => {
          let msg = agent.firstMessage || '';
          if (!msg) return undefined;
          const fullName = cont.lastName ? `${cont.firstName} ${cont.lastName}`.trim() : cont.firstName;
          msg = msg.replace(/\{\{contact_name\}\}/g, fullName);
          msg = msg.replace(/\{\{contact_first_name\}\}/g, cont.firstName);
          msg = msg.replace(/\{\{contact_last_name\}\}/g, cont.lastName || '');
          msg = msg.replace(/\{\{contact_phone\}\}/g, cont.phone);
          msg = msg.replace(/\{\{contact_email\}\}/g, cont.email || '');
          msg = msg.replace(/\{\{name\}\}/g, fullName);
          msg = msg.replace(/\{\{first_name\}\}/g, cont.firstName);
          msg = msg.replace(/\{\{last_name\}\}/g, cont.lastName || '');
          msg = msg.replace(/\{\{phone\}\}/g, cont.phone);
          msg = msg.replace(/\{\{email\}\}/g, cont.email || '');
          msg = msg.replace(/\{firstName\}/g, cont.firstName);
          msg = msg.replace(/\{lastName\}/g, cont.lastName || '');
          msg = msg.replace(/\{phone\}/g, cont.phone);
          msg = msg.replace(/\{email\}/g, cont.email || '');
          const customFields = cont.customFields as Record<string, any> || {};
          for (const [key, val] of Object.entries(customFields)) {
            msg = msg.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(val || ''));
            msg = msg.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val || ''));
          }
          return msg;
        };
        
        try {
          if (agent.type === 'flow' && agent.flowId) {
            const [flow] = await db.select().from(flows).where(eq(flows.id, agent.flowId)).limit(1);
            if (flow) {
              const contactVariables: Record<string, unknown> = {
                firstName: contact.firstName,
                lastName: contact.lastName || '',
                phone: contact.phone,
                email: contact.email || '',
                ...(contact.customFields as Record<string, unknown> || {}),
              };
              const language = agent.language || 'en';
              if (flow.compiledSystemPrompt && flow.compiledTools) {
                const { hydrateCompiledFlow, substituteContactVariables } = await import('../../../services/openai-voice-agent/hydrator');
                const systemPrompt = substituteContactVariables(flow.compiledSystemPrompt, contactVariables);
                const firstMessage = flow.compiledFirstMessage ? substituteContactVariables(flow.compiledFirstMessage, contactVariables) : undefined;
                const hydratedConfig = hydrateCompiledFlow({
                  compiledSystemPrompt: systemPrompt,
                  compiledFirstMessage: firstMessage || null,
                  compiledTools: flow.compiledTools as any[],
                  compiledStates: (flow.compiledStates || []) as any[],
                  voice: validatedVoice,
                  model: validatedModel,
                  temperature: agent.temperature ?? 0.7,
                  toolContext: { userId, agentId, callId },
                  language,
                  knowledgeBaseIds: agent.knowledgeBaseIds || [],
                  transferPhoneNumber: agent.transferPhoneNumber || undefined,
                  transferEnabled: !!agent.transferPhoneNumber,
                });
                agentConfig = {
                  voice: validatedVoice,
                  model: validatedModel,
                  systemPrompt: hydratedConfig.systemPrompt,
                  firstMessage: hydratedConfig.firstMessage,
                  tools: hydratedConfig.tools,
                };
              } else {
                const flowConfig: any = {
                  nodes: flow.nodes as any[],
                  edges: flow.edges as any[],
                  variables: contactVariables,
                };
                const compiledConfig = await OpenAIAgentFactory.compileFlow(flowConfig, {
                  voice: validatedVoice,
                  model: validatedModel,
                  userId,
                  agentId,
                  temperature: agent.temperature ?? 0.7,
                  language,
                });
                agentConfig = {
                  voice: compiledConfig.voice,
                  model: compiledConfig.model,
                  systemPrompt: compiledConfig.systemPrompt,
                  firstMessage: compiledConfig.firstMessage,
                  tools: compiledConfig.tools,
                };
              }
            } else {
              agentConfig = {
                voice: validatedVoice,
                model: validatedModel,
                systemPrompt: buildSystemPromptHelper(contact),
                firstMessage: buildFirstMessageHelper(contact),
              };
            }
          } else {
            agentConfig = {
              voice: validatedVoice,
              model: validatedModel,
              systemPrompt: buildSystemPromptHelper(contact),
              firstMessage: buildFirstMessageHelper(contact),
            };
          }
          
          const result = await PlivoCallService.initiateCall({
            fromNumber: plivoPhone.phoneNumber,
            toNumber: phone,
            userId,
            campaignId,
            contactId,
            agentId,
            plivoPhoneNumberId,
            agentConfig,
          });
          
          success = !!result.callUuid;
          if (!success) {
            errorMessage = 'Failed to initiate Plivo call';
          }
        } catch (initErr: any) {
          console.error(`[CallWorker] Plivo call initiation error for ${phone}:`, initErr.message);
          success = false;
          errorMessage = initErr.message;
          
          // Mark contact and call as failed in DB
          await db
            .update(contacts)
            .set({ status: 'failed' })
            .where(eq(contacts.id, contact.id));
            
          const { calls } = await import('../../../shared/schema');
          await db
            .update(calls)
            .set({ status: 'failed', endedAt: new Date() })
            .where(eq(calls.id, callId));
        }
        break;
      }
      
      default:
        throw new Error(`Unknown engine: ${engine}`);
    }
    
    return {
      success,
      callId,
      status: success ? 'initiated' : 'failed',
      error: errorMessage,
    };
    
  } catch (error: any) {
    throw error;
  }
}

export function startCallWorker(): Worker<CampaignCallJob> {
  if (callWorker) {
    return callWorker;
  }
  
  callWorker = new Worker<CampaignCallJob>(
    QUEUE_NAMES.CAMPAIGN_CALLS,
    processCall,
    {
      connection: getRedisConnection(),
      concurrency: MAX_CONCURRENT_CALLS,
      limiter: {
        max: MAX_CONCURRENT_CALLS,
        duration: 1000,
      },
    }
  );
  
  callWorker.on('completed', (job, result) => {
    console.log(`[CallWorker] Job ${job.id} completed:`, result.status);
  });
  
  callWorker.on('failed', (job, err) => {
    if (job) {
      console.error(`[CallWorker] Job ${job.id} failed after retries:`, err.message);
    }
  });
  
  callWorker.on('error', (err) => {
    console.error('[CallWorker] Worker error:', err.message);
  });
  
  console.log(`[CallWorker] Started with concurrency: ${MAX_CONCURRENT_CALLS}`);
  return callWorker;
}

export async function stopCallWorker(): Promise<void> {
  if (callWorker) {
    await callWorker.close();
    callWorker = null;
    console.log('[CallWorker] Stopped');
  }
}

export function getCallWorker(): Worker<CampaignCallJob> | null {
  return callWorker;
}
