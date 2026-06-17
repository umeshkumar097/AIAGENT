import { db } from './server/db.js';
import { agents, plivoPhoneNumbers, campaigns } from './shared/schema.js';
import { eq, and, inArray, isNull } from 'drizzle-orm';

async function testGet() {
  try {
    const userId = '876909f6-a64d-4226-8d22-321bf9d82e1d'; // The user id from earlier
    
    const phoneNumbers = await db
      .select({
        id: plivoPhoneNumbers.id,
        phoneNumber: plivoPhoneNumbers.phoneNumber,
        friendlyName: plivoPhoneNumbers.friendlyName,
        country: plivoPhoneNumbers.country,
        region: plivoPhoneNumbers.region,
        status: plivoPhoneNumbers.status,
        assignedAgentId: plivoPhoneNumbers.assignedAgentId,
      })
      .from(plivoPhoneNumbers)
      .where(
        and(
          eq(plivoPhoneNumbers.userId, userId),
          inArray(plivoPhoneNumbers.status, ['active', 'assigned'])
        )
      );

    const assignedAgentIds = phoneNumbers
      .filter(pn => pn.assignedAgentId)
      .map(pn => pn.assignedAgentId!);
    
    const assignedAgents = assignedAgentIds.length > 0 
      ? await db
          .select({
            id: agents.id,
            name: agents.name,
            type: agents.type,
            telephonyProvider: agents.telephonyProvider,
          })
          .from(agents)
          .where(inArray(agents.id, assignedAgentIds))
      : [];

    const agentMap = new Map(assignedAgents.map(a => [a.id, a]));

    const availableAgents = await db
      .select({
        id: agents.id,
        name: agents.name,
        type: agents.type,
        telephonyProvider: agents.telephonyProvider,
      })
      .from(agents)
      .where(
        and(
          eq(agents.userId, userId),
          inArray(agents.telephonyProvider, ['plivo', 'twilio']),
          eq(agents.type, 'incoming'),
          eq(agents.isActive, true)
        )
      );

    const activeStatuses = ['pending', 'running', 'scheduled', 'paused'];
    const phoneIdsToCheck = phoneNumbers.filter(pn => !pn.assignedAgentId).map(pn => pn.id);
    
    const activeCampaigns = phoneIdsToCheck.length > 0 ? await db
      .select({
        phoneNumberId: campaigns.phoneNumberId,
        campaignName: campaigns.name,
        campaignStatus: campaigns.status,
      })
      .from(campaigns)
      .where(
        and(
          inArray(campaigns.phoneNumberId, phoneIdsToCheck),
          inArray(campaigns.status, activeStatuses as any),
          isNull(campaigns.deletedAt)
        )
      ) : [];

    console.log("Success! Active campaigns:", activeCampaigns);
    console.log("Available agents:", availableAgents.length);
    console.log("Available phones:", phoneNumbers.length);
    process.exit(0);
  } catch (err) {
    console.error("Failed:", err);
    process.exit(1);
  }
}

testGet();
