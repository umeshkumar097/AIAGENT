import { db } from './server/db.js';
import { agents, plivoPhoneNumbers } from './shared/schema.js';
import { eq, and, inArray } from 'drizzle-orm';

async function test() {
  console.log("Testing agents query...");
  const agentQuery = await db.select().from(agents).where(inArray(agents.telephonyProvider, ['plivo', 'twilio'])).limit(1);
  console.log("Agents:", agentQuery);

  console.log("Testing phone numbers...");
  const phoneQuery = await db.select().from(plivoPhoneNumbers).limit(1);
  console.log("Phones:", phoneQuery);
  process.exit(0);
}

test().catch(console.error);
