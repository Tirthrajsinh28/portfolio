# Tirthrajsinh Parmar Portfolio

An evidence-led portfolio for a backend-focused software engineer. The application presents original project work, verification status, trade-offs, and limitations without inventing production results or unsupported professional claims.

## Current status

Foundation plus the ServicePulse, CloudFileFlow, and ReleaseGuard local case
studies are implemented. Public deployment has not been attempted.
Vercel Hobby is the selected portfolio deployment target, but no Vercel
project, URL, or health check has been verified yet.

The app includes:

- Home and About.
- Projects and individual project scope pages.
- Experience, Education, Technical Skills, and Resume status pages.
- Contact and data-handling pages.
- Custom 404.
- Responsive layout, visible focus, skip link, and reduced-motion support.
- Unit and automated accessibility tests.
- ServicePulse, CloudFileFlow, and ReleaseGuard case studies with locally
  verified architecture, test evidence, trade-offs, lessons, and explicit
  infrastructure/publication blockers.
- Current ServicePulse screenshots plus CloudFileFlow and ReleaseGuard static
  demo media generated from fresh local project outputs.

Project repository links are present for the published source repositories.
Live-demo links remain withheld until deployment gates pass. Featured projects
are labeled with local/source evidence and are not presented as live services.

## Requirements

- Node.js 22.12 or later.
- npm 11 or later.

The portfolio requires Node.js 22.22.2 or newer. The verified local foundation
used Node.js 24.15.0 and npm 11.12.1.

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite.

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Run all checks:

```bash
npm run check
```

Preview the production build locally:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
```

See `CHANGELOG.md` for the current local release-note draft and remaining
publication blockers.

See `SECURITY.md` for the current security reporting policy and limitations.

## Content integrity

- Generated projects are labeled as independent portfolio work.
- Employment detail is intentionally held until source claims are confirmed.
- Education may be shown as `Computer Programming, Sault College,
  September 2024-April 2026`; do not add a diploma or degree type until that
  exact credential type is confirmed.
- No AWS certification, percentage metric, production traffic, customer, or deployment claim is made.
- The candidate's phone number is not published.
- Public email is candidate-approved as `tirthrajsinh2803@gmail.com`.

## Deployment

Selected target: Vercel Hobby for a static Vite portfolio deployment with a
CAD $0 cost ceiling. `vercel.json` records the intended build command and
output directory. Deployment has not been executed; a later deployment stage
will record the exact command, URL, health check, rollback procedure, and
known limits.

The executable deployment checklist is in
[`docs/DEPLOYMENT_RUNBOOK.md`](docs/DEPLOYMENT_RUNBOOK.md). It records the
pre-deployment test gate, Vercel login/link commands, preview checks,
production checks, rollback notes, and claims guard.

## License

MIT
