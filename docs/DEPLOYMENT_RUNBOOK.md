# Portfolio deployment runbook

Last updated: 2026-08-02

This runbook is for deploying the static Vite portfolio to Vercel after the
candidate has logged in and confirmed the Hobby/free plan. It is a deployment
procedure, not evidence that deployment has already happened.

## Current deployment boundary

- Selected target: Vercel Hobby/free-tier deployment for the static portfolio.
- Cost ceiling: CAD 0 unless the candidate explicitly changes it.
- Current source repository:
  `https://github.com/Tirthrajsinh28/portfolio`.
- Current public source commit verified by Portfolio CI:
  `30909f39465f3efd1a12ecd16ba567bd118cf364`.
- Current build config: `vercel.json` uses `npm run build` and outputs `dist`.
- No Vercel project, production URL, deployment health check, custom domain, or
  paid feature is verified yet.

## Sources checked

- Vercel CLI overview:
  `https://vercel.com/docs/cli`
- Vercel CLI deploy command:
  `https://vercel.com/docs/cli/deploy`
- Deploying a project from the CLI:
  `https://vercel.com/docs/projects/deploy-from-cli`
- Vercel CLI pull command:
  `https://vercel.com/docs/cli/pull`

The checked Vercel docs describe `vercel deploy` / `vercel --prod`,
`vercel pull --environment=production`, `vercel deploy --logs`,
`vercel curl`, and production deployment verification. Recheck pricing and
account plan in the Vercel dashboard before publishing a live URL.

## Pre-deployment gate

Run from `C:\PortfolioWorkspace\portfolio`:

```powershell
npm.cmd ci
npm.cmd run check
npm.cmd audit --audit-level=high
```

Run from `C:\PortfolioWorkspace`:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\Test-PublicExportReadiness.ps1
git diff --check
Get-FileHash -Algorithm SHA256 -LiteralPath source-docs\resume.pdf,source-docs\linkedin-profile.pdf
```

Expected source-document hashes:

- `resume.pdf`:
  `C89786BEF17EE4B621D7EFE653AFC63B650ACC57A9E47DFBCCB46318AA2994EF`
- `linkedin-profile.pdf`:
  `7B33694E53608748D6391392AB4F972EFD60E8DEAEA6AA5F32F5C6DFB2A2FD38`

Do not deploy if the checks fail, source documents changed, or public content
contains unsupported certification, degree, employer, metric, production, user,
traffic, or live-service claims.

## Login and project link

Run from `C:\PortfolioWorkspace\portfolio`:

```powershell
npx.cmd --yes vercel@latest --version
npx.cmd --yes vercel@latest login
npx.cmd --yes vercel@latest whoami
npx.cmd --yes vercel@latest link
```

During `vercel link`:

- Use the candidate's own Vercel account or personal scope.
- Confirm the plan is Hobby/free before proceeding.
- Do not choose Pro, Enterprise, paid team seats, paid storage, analytics
  add-ons, paid domains, or any credit-card-backed option.
- Do not commit `.vercel/`, `.env`, `.env.local`, tokens, or dashboard secrets.

If the project is linked through the Vercel dashboard instead of CLI, record
the selected account/scope and project name in `reports/DEPLOYMENT_REPORT.md`.

## Preview deployment

Run from `C:\PortfolioWorkspace\portfolio`:

```powershell
npx.cmd --yes vercel@latest deploy --logs
```

Record:

- Preview deployment URL.
- Vercel project name and account/scope.
- CLI version.
- Source commit.
- Build result.
- Any warnings or errors.

Verify the preview:

```powershell
npx.cmd --yes vercel@latest curl / --deployment <preview-url>
npx.cmd --yes vercel@latest logs --deployment <preview-url> --level error
```

Also check these routes in a browser before production:

- `/`
- `/projects`
- `/projects/servicepulse`
- `/projects/cloudfileflow`
- `/projects/releaseguard`
- `/experience`
- `/education`
- `/skills`
- `/resume`
- `/contact`
- `/data-handling`
- a non-existent route for the custom 404

For each route, verify:

- Page loads without console errors.
- Header/nav/footer render.
- Keyboard focus is visible.
- Main content is reachable.
- Case-study screenshots/media load.
- Links point to the intended GitHub/LinkedIn/mail routes.

## Production deployment

Only after the preview passes:

```powershell
npx.cmd --yes vercel@latest deploy --prod --logs
```

Record stdout because the Vercel docs state deploy stdout is the deployment
URL. Then verify:

```powershell
npx.cmd --yes vercel@latest curl / --deployment <production-url>
npx.cmd --yes vercel@latest logs --environment production --level error --since 5m
```

If `vercel curl` is unavailable or unsuitable, use:

```powershell
Invoke-WebRequest -Uri <production-url> -UseBasicParsing
```

Do not claim deployment success until:

- The production URL is recorded.
- The production home route returns HTTP 200.
- Core routes are browser-checked.
- Current screenshots/media load from the deployed site.
- No high-severity dependency audit failure remains.
- `reports/DEPLOYMENT_REPORT.md`, `reports/LINK_CHECK_REPORT.md`,
  `reports/FINAL_AUDIT.md`, and `STATUS.md` are updated.

## Rollback

If the production deployment is wrong:

1. Do not hide the failed deployment.
2. Record the failure, URL, error, and suspected cause.
3. Use the Vercel dashboard or CLI rollback/promote flow to restore the last
   known-good deployment.
4. Rerun the production URL and route checks.
5. Record the rollback result in `reports/DEPLOYMENT_REPORT.md`.

## Post-deployment publication steps

After the deployed URL is verified:

1. Update the portfolio source README with the live URL.
2. Update the GitHub profile README live-link status.
3. Update GitHub profile website field only after GitHub `user` scope or manual
   UI access is available.
4. Update `reports/LINK_CHECK_REPORT.md`, `reports/DEPLOYMENT_REPORT.md`,
   `reports/FINAL_AUDIT.md`, `reports/GITHUB_AUDIT.md`, and `STATUS.md`.
5. Rerun public export readiness and protected source-document hash checks.
6. Commit and push the public-source refresh.
7. Only then use the live link in LinkedIn/resume drafts.

## Claims guard

Even after Vercel deployment, do not claim:

- ServicePulse, CloudFileFlow, or ReleaseGuard are live cloud services unless
  those separate systems are deployed and checked.
- CloudFileFlow uses AWS S3/SQS/LocalStack in public deployment unless that
  adapter is implemented and verified.
- ReleaseGuard is published on npm unless a registry publication is executed
  and verified.
- Any AWS certification until the exact certification title/status/date are
  confirmed.
- Any confidential Cisco/DXC architecture, metrics, or proprietary details.
