-- Pricing revision 2026-09 (INR, excl. GST; GST is added at checkout).
-- Cost basis per connected minute on the Plivo + Sarvam + gpt-4o-mini stack ≈ ₹2.5
-- (Plivo ₹0.38, Sarvam STT ₹0.50, Sarvam TTS ≈ ₹1.2, OpenAI ≈ ₹0.25, + pulse/failed-call waste).
-- Plans land at ₹4.0–5.0 per minute, top-ups at ₹4.0–5.5 per minute (37–50% gross margin).
--
-- Guarded by global_settings.pricing_revision so it applies exactly once: admins can edit prices
-- afterwards without a redeploy resetting them. Safe to re-run.
DO $$
DECLARE
  applied boolean;
  vp text;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM global_settings WHERE key = 'pricing_revision' AND value = '"2026-09"'::jsonb
  ) INTO applied;
  IF applied THEN
    RETURN;
  END IF;

  -- Keep whatever voice-provider mode the admin chose for the existing paid plan
  SELECT voice_provider INTO vp FROM plans WHERE name = 'pro' LIMIT 1;
  IF vp IS NULL THEN vp := 'both'; END IF;

  -- Free: a short trial, not a free tier (15 min ≈ ₹40 of vendor cost per signup)
  UPDATE plans SET
    display_name = 'Free',
    description = 'Try AI calling with 15 free minutes on shared numbers. Upgrade any time.',
    monthly_price = 0, yearly_price = 0,
    max_agents = 1, max_campaigns = 1, max_contacts_per_campaign = 10,
    max_webhooks = 1, max_knowledge_bases = 2, max_flows = 1, max_phone_numbers = 0, max_widgets = 1,
    included_credits = 15, default_llm_model = 'gpt-4o-mini',
    can_choose_llm = false, can_purchase_numbers = false, use_system_pool = true,
    rest_api_enabled = false, team_management_enabled = false, max_team_members = 0, max_custom_roles = 0,
    features = '{"basicAnalytics":true,"callRecording":true,"transcription":true,"emailSupport":true,"apiAccess":false,"prioritySupport":false,"customVoices":false,"advancedAnalytics":false,"whiteLabel":false,"dedicatedManager":false}'::jsonb,
    is_active = true, updated_at = now()
  WHERE name = 'free';

  -- Starter: ₹1,499 / 300 min (₹5.00 per min)
  INSERT INTO plans (name, display_name, description, monthly_price, yearly_price,
    max_agents, max_campaigns, max_contacts_per_campaign, max_webhooks, max_knowledge_bases, max_flows,
    max_phone_numbers, max_widgets, included_credits, default_llm_model, can_choose_llm, can_purchase_numbers,
    use_system_pool, features, voice_provider, rest_api_enabled, team_management_enabled, max_team_members,
    max_custom_roles, is_active)
  VALUES ('starter', 'Starter',
    'For small businesses starting with AI calling: 300 minutes a month, your own number, campaigns and knowledge base.',
    1499, 14990,
    3, 5, 500, 3, 5, 3,
    1, 1, 300, 'gpt-4o-mini', false, true,
    true,
    '{"basicAnalytics":true,"callRecording":true,"transcription":true,"emailSupport":true,"apiAccess":false,"prioritySupport":false,"customVoices":true,"advancedAnalytics":false,"whiteLabel":false,"dedicatedManager":false,"batchCalling":true,"webhookIntegration":true,"ragKnowledgeBase":true,"flowAutomation":true,"multiLanguage":true}'::jsonb,
    vp, false, false, 0, 0, true)
  ON CONFLICT (name) DO UPDATE SET
    display_name = EXCLUDED.display_name, description = EXCLUDED.description,
    monthly_price = EXCLUDED.monthly_price, yearly_price = EXCLUDED.yearly_price,
    max_agents = EXCLUDED.max_agents, max_campaigns = EXCLUDED.max_campaigns,
    max_contacts_per_campaign = EXCLUDED.max_contacts_per_campaign, max_webhooks = EXCLUDED.max_webhooks,
    max_knowledge_bases = EXCLUDED.max_knowledge_bases, max_flows = EXCLUDED.max_flows,
    max_phone_numbers = EXCLUDED.max_phone_numbers, included_credits = EXCLUDED.included_credits,
    can_choose_llm = EXCLUDED.can_choose_llm, can_purchase_numbers = EXCLUDED.can_purchase_numbers,
    use_system_pool = EXCLUDED.use_system_pool, features = EXCLUDED.features,
    rest_api_enabled = EXCLUDED.rest_api_enabled, is_active = true, updated_at = now();

  -- Growth (the existing 'pro' row, kept in place so current subscribers stay linked): ₹3,999 / 900 min (₹4.44)
  UPDATE plans SET
    display_name = 'Growth',
    description = 'For growing teams: 900 minutes a month, up to 3 numbers, your choice of LLM, API and integrations.',
    monthly_price = 3999, yearly_price = 39990,
    max_agents = 10, max_campaigns = 25, max_contacts_per_campaign = 5000,
    max_webhooks = 10, max_knowledge_bases = 25, max_flows = 10, max_phone_numbers = 3, max_widgets = 3,
    included_credits = 900, default_llm_model = NULL,
    can_choose_llm = true, can_purchase_numbers = true, use_system_pool = false,
    rest_api_enabled = true, team_management_enabled = false, max_team_members = 0, max_custom_roles = 0,
    features = '{"basicAnalytics":true,"callRecording":true,"transcription":true,"emailSupport":true,"apiAccess":true,"prioritySupport":false,"customVoices":true,"advancedAnalytics":true,"whiteLabel":false,"dedicatedManager":false,"batchCalling":true,"webhookIntegration":true,"ragKnowledgeBase":true,"flowAutomation":true,"multiLanguage":true}'::jsonb,
    is_active = true, updated_at = now()
  WHERE name = 'pro';

  -- Business: ₹9,999 / 2,500 min (₹4.00 per min)
  INSERT INTO plans (name, display_name, description, monthly_price, yearly_price,
    max_agents, max_campaigns, max_contacts_per_campaign, max_webhooks, max_knowledge_bases, max_flows,
    max_phone_numbers, max_widgets, included_credits, default_llm_model, can_choose_llm, can_purchase_numbers,
    use_system_pool, features, voice_provider, rest_api_enabled, team_management_enabled, max_team_members,
    max_custom_roles, is_active)
  VALUES ('business', 'Business',
    'For call-heavy businesses: 2,500 minutes a month, 10 numbers, team access, REST API and priority support.',
    9999, 99990,
    25, 100, 25000, 50, 100, 50,
    10, 10, 2500, NULL, true, true,
    false,
    '{"basicAnalytics":true,"callRecording":true,"transcription":true,"emailSupport":true,"apiAccess":true,"prioritySupport":true,"customVoices":true,"advancedAnalytics":true,"whiteLabel":false,"dedicatedManager":false,"batchCalling":true,"webhookIntegration":true,"ragKnowledgeBase":true,"flowAutomation":true,"multiLanguage":true}'::jsonb,
    vp, true, true, 5, 3, true)
  ON CONFLICT (name) DO UPDATE SET
    display_name = EXCLUDED.display_name, description = EXCLUDED.description,
    monthly_price = EXCLUDED.monthly_price, yearly_price = EXCLUDED.yearly_price,
    max_agents = EXCLUDED.max_agents, max_campaigns = EXCLUDED.max_campaigns,
    max_contacts_per_campaign = EXCLUDED.max_contacts_per_campaign, max_webhooks = EXCLUDED.max_webhooks,
    max_knowledge_bases = EXCLUDED.max_knowledge_bases, max_flows = EXCLUDED.max_flows,
    max_phone_numbers = EXCLUDED.max_phone_numbers, included_credits = EXCLUDED.included_credits,
    can_choose_llm = EXCLUDED.can_choose_llm, can_purchase_numbers = EXCLUDED.can_purchase_numbers,
    use_system_pool = EXCLUDED.use_system_pool, features = EXCLUDED.features,
    rest_api_enabled = EXCLUDED.rest_api_enabled, team_management_enabled = EXCLUDED.team_management_enabled,
    max_team_members = EXCLUDED.max_team_members, max_custom_roles = EXCLUDED.max_custom_roles,
    is_active = true, updated_at = now();

  -- Any other legacy plan rows stay (subscriptions reference them) but are hidden from the Upgrade page
  UPDATE plans SET is_active = false, updated_at = now() WHERE name NOT IN ('free', 'starter', 'pro', 'business');

  -- Credit top-ups: retire the old packs (transactions keep their reference) and add the new ladder
  UPDATE credit_packages SET is_active = false, updated_at = now();
  INSERT INTO credit_packages (name, description, credits, price, is_active) VALUES
    ('100 minutes',   'Top-up for small campaigns — ₹5.49 per minute',            100,   549,  true),
    ('500 minutes',   'Most popular top-up — ₹5.00 per minute',                    500,  2499,  true),
    ('1,000 minutes', 'For regular campaigns — ₹4.50 per minute (save 10%)',      1000,  4499,  true),
    ('2,500 minutes', 'For busy teams — ₹4.20 per minute (save 16%)',             2500, 10499,  true),
    ('5,000 minutes', 'High volume — ₹4.00 per minute (save 20%)',                5000, 19999,  true);

  INSERT INTO global_settings (key, value, description)
  VALUES ('pricing_revision', '"2026-09"'::jsonb, 'Last applied pricing revision (plans + credit packages)')
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
END $$;
