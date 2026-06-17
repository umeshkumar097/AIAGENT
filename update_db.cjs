require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function updatePlans() {
  try {
    await pool.query(`UPDATE plans SET sip_enabled = true, sip_engines_allowed = ARRAY['elevenlabs-sip', 'openai-sip']::text[];`);
    
    // Also check if we need to update users' direct plan overrides if any
    await pool.query(`UPDATE users SET sip_enabled = true, sip_engines_allowed = ARRAY['elevenlabs-sip', 'openai-sip']::text[] WHERE sip_enabled IS NOT NULL;`).catch(e => console.log('Users table does not have SIP columns directly or failed. Ignoring.'));
    
    console.log("Database updated successfully");
  } catch (error) {
    console.error("Error updating db:", error);
  } finally {
    process.exit(0);
  }
}

updatePlans();
