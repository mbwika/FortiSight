
  # FortiSight Consulting Website

  This is a code bundle for FortiSight Consulting Website. The original project is available at https://www.figma.com/design/evrGw7ujKE7ouXcLrvEgGU/FortiSight-Consulting-Website.

  The web app is developed using React (TypeScript), Tailwind CSS, and Vite, and is deployed to Cloudflare Workers (static assets + a small API worker for the contact form). EmailJS is integrated to make it possible to send emails from the code.
  Instructions on how to integrate EmailJS are provided under the file: EMAIL_SETUP.md

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Building

  For the React app built with Vite, you can use the following command to package it for deployment:

  `npm run build`

  This creates a `build/` directory with the minified, production-ready site. `build/` is regenerated from `public/` and `src/` on every run — only `public/` and `src/` need to be edited by hand.

  ## Deployment (automatic)

  Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and runs `wrangler deploy` against the `codensecurity` Cloudflare Worker (see `wrangler.toml`) — the same worker that serves both the static site and the `/api/contact` endpoint (`worker.js`). No manual `wrangler deploy` is needed anymore.

  **One-time setup** (required before the workflow can deploy successfully): add these as repository secrets under Settings → Secrets and variables → Actions:

  | Secret | Where to get it |
  |---|---|
  | `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" template (scope it to this account) |
  | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Overview (shown in the right-hand sidebar) |

  Until both secrets are set, the workflow run will fail at the `wrangler deploy` step — the build itself will still succeed. Worker-side secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) are separate and already set directly on the Worker via `wrangler secret put`; they don't need to be added to GitHub.

  ## Deployment (manual, fallback)

  You can still deploy directly from your machine if needed:

  ```
  npm run build
  npx wrangler deploy
  ```
  
