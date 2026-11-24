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

Merging into `main` starts a production deployment.

## Production domain

Vercel hosts production at **`https://ubertradies.online/`**. The canonical link, Open Graph URL, `robots.txt` and `sitemap.xml` all use that address, and `vercel.json` permanently redirects `www.ubertradies.online` to the apex.

Before the first production deploy:

1. Add `ubertradies.online` and `www.ubertradies.online` to the Vercel project (Settings → Domains).
2. At the domain registrar, set the records Vercel shows. Typically that is an apex `A` record of `76.76.21.21` and a `www` `CNAME` to `cname.vercel-dns.com`. Remove the old redirect to the Manus site.
3. If Vercel shows different A records, set the repository variable `VERCEL_EXPECTED_A` (space-separated IPs) so the DNS check matches.
4. Confirm the `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` secrets exist.

The deploy workflow waits up to 30 minutes for the apex A records to match exactly, deploys, then requires the homepage to load over HTTPS on `ubertradies.online` or `www.ubertradies.online` and contain this site's canonical link. A redirect to any other host, including the former Manus deployment, fails the check.

```bash
python3 scripts/check_ubertradies_dns.py                     # one-shot DNS check
python3 scripts/check_ubertradies_dns.py --expected-a 1.2.3.4 # custom Vercel IP
python3 scripts/check_ubertradies_https.py                   # one-shot HTTPS check
```
