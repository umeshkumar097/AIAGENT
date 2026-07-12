# AgentLabs Workspace Rules

## 🔐 SECURITY — GitHub Push Rules (CRITICAL)

**NEVER commit or push the following to GitHub:**

### Banned File Types
- `*.exp` — Expect scripts (contain SSH IP + passwords)
- `*.py` files in root — utility/rename scripts
- `test-*.ts` / `test-*.js` files in root
- `*_check.*`, `*_path.*`, `fetch_logs.*` files

### Banned Content in ANY File
- Server IP addresses (e.g. `135.235.218.93`)
- SSH passwords (e.g. `Umesh@2003##`)
- API Keys: OpenAI (`sk-...`), Sarvam (`sk_sif...`), ElevenLabs, Stripe, Razorpay
- Database connection strings / credentials
- `.env` files or any file containing `PASSWORD=`, `SECRET=`, `API_KEY=`

### Before EVERY `git push`:
1. Run `git diff --cached` and visually scan for secrets
2. If ANY file contains an IP, password, or API key → STOP, remove it first
3. Add the file to `.gitignore` before committing
4. Use `git rm --cached <file>` to untrack sensitive files

### Safe Files to Push
✅ TypeScript source files in `server/`, `client/`, `shared/`  
✅ `package.json`, `tsconfig.json`, `vite.config.ts`  
✅ `.gitignore`, `README.md`  
❌ Root-level `.exp`, `.py`, `test-*.ts`, `update_*.cjs` scratch files  

---

## 🚀 Deployment Rules

- Server: `135.235.218.93` (DO NOT commit this IP to GitHub)
- App: PM2 process `zonvo-app` on port 3000
- Build: `npm run build` then `pm2 restart zonvo-app`
- Domain: `app.zonvo.tech` for Plivo webhooks

## 🎙️ Sarvam Voice Agent

- Voice: `priya` on `bulbul:v3`
- LLM: `gpt-4o-mini` (streaming)
- STT: Sarvam `saaras:v3`
- WhatsApp Answer URL: `https://app.zonvo.tech/api/plivo/whatsapp/answer`
- WhatsApp Webhook URL: `https://app.zonvo.tech/api/plivo/whatsapp/message`
