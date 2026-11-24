# Uber Tradies website

Public, information-only website for Uber Tradies. It has no accounts, job requests, matching, bookings or payments.

Built with React 19, TypeScript, Vite and Tailwind CSS 4. It is a static single-page site; `vercel.json` sends every page address to `index.html` so links such as `/app` and `/safety` work when opened directly.

## Local development

Requires Node.js 20+ and pnpm 10.4.1 (via Corepack).

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev          # http://localhost:3000
pnpm check        # TypeScript
pnpm build:web    # static site in dist/public (what Vercel serves)
```

`pnpm build` also bundles the optional Node server in `server/` for hosts that run `pnpm start` instead of serving static files.

## Configuration

No secrets are required to build or run the site. Optional analytics loads only when a visitor opts in *and* both `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` are set as Vercel environment variables. Never commit `.env` files.

## Automation

| Workflow | Runs on | Deploys? |
| --- | --- | --- |
| `preview-staging-checks.yml` | Pull requests to `main`/`staging`, pushes to `staging` | No — install and build check only |
| `deploy-vercel.yml` | Pushes to `main`, manual run | **Yes — Vercel production** |
| `test-alerts.yml`, `test-failure-alerts.yml` | Manual only | No |

Merging into `main` starts a production deployment. Before that, confirm the production domain. The deploy workflow and the scripts in `scripts/` currently check `ubertradies.online`, while the site's canonical address and sitemap use `ubertradies.au`.
