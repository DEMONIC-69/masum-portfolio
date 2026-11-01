# Ask Masum AI deployment

The portfolio is deployed as a static GitHub Pages site. The AI model therefore runs behind a separate Cloudflare Worker, which keeps the Gemini API key out of the public website bundle.

## Connect the assistant once

1. Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/app/apikey). Keep it private.
2. Sign in to Cloudflare, then from this repository deploy the Worker:

   ```powershell
   npx wrangler login
   npx wrangler deploy
   ```

3. Add the Gemini key to the deployed Worker as a secret:

   ```powershell
   npx wrangler secret put GEMINI_API_KEY
   ```

   Paste it into Wrangler's hidden prompt; do not put it in source files, GitHub, or chat. The worker is configured with `gemini-3.8-flash`. Adjust the model in `wrangler.jsonc` only if Google changes its supported stable model list.

4. Copy the deployed Worker URL printed by Wrangler. In the GitHub repository settings, open **Secrets and variables → Actions → Variables → New repository variable** and add `MASUM_AI_ENDPOINT` with that URL. It is a public Worker address, not an API key.
5. Push the site commit to `main` (or rerun the Pages workflow). The deployment workflow injects this public endpoint into the static build; it never injects the API key.

The Worker permits requests from `https://masumkaji.tech`, `https://www.masumkaji.tech`, and local Vite development. It accepts short text chat only, limits request size and output, applies a per-isolate best-effort request cap, does not log visitor prompts, and grounds answers in confirmed public portfolio facts. CORS is not an access-control mechanism by itself, so watch Gemini usage and set provider-side limits as available.

## Local development

Create a `.dev.vars` file beside `wrangler.jsonc` containing `GEMINI_API_KEY=...` (never commit it), then use `npx wrangler dev`. In a separate terminal, run Vite with `VITE_MASUM_AI_ENDPOINT=http://localhost:8787`.

Until the Worker is deployed and `MASUM_AI_ENDPOINT` is configured in GitHub, the widget intentionally identifies the AI connection as being set up and does not substitute canned answers.
