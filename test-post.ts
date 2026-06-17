import { db } from './server/db.js';
import { agents, plivoPhoneNumbers } from './shared/schema.js';
import { eq, and, inArray } from 'drizzle-orm';
import { PlivoPhoneService } from './server/engines/plivo/services/plivo-phone.service.js';

async function testPost() {
  try {
    const userId = '876909f6-a64d-4226-8d22-321bf9d82e1d';
    // Get the first available agent
    const [agent] = await db.select().from(agents).where(and(eq(agents.userId, userId), inArray(agents.telephonyProvider, ['plivo', 'twilio']), eq(agents.type, 'incoming'))).limit(1);
    
    // Get the first available phone
    const [phone] = await db.select().from(plivoPhoneNumbers).where(and(eq(plivoPhoneNumbers.userId, userId), eq(plivoPhoneNumbers.status, 'active'))).limit(1);

    if (!agent || !phone) {
      console.log("No agent or phone found to assign.");
      process.exit(1);
    }

    console.log(`Assigning Agent ${agent.id} to Phone ${phone.id}`);
    
    await db.update(plivoPhoneNumbers).set({ assignedAgentId: agent.id }).where(eq(plivoPhoneNumbers.id, phone.id));
    
    console.log("DB update successful. Configuring webhooks...");
    
    // Let's try configuring the webhook
    const baseUrl = 'http://localhost:3003';
    await PlivoPhoneService.configureWebhooks(phone.id, baseUrl);
    
    console.log("Successfully configured webhooks!");
    process.exit(0);
  } catch (err) {
    console.error("Failed:", err);
    process.exit(1);
  }
}

testPost();
