# Changelog

## [0.1.0] - 2026-07-30

- Build the evidence-led React/TypeScript portfolio with required routes,
  responsive layout, focus management, reduced-motion support, and custom 404.
- Add locally verified case studies for ServicePulse, CloudFileFlow, and
  ReleaseGuard with evidence, trade-offs, lessons, and honest limitations.
- Add automated route and accessibility assertions covering the home page and
  project case-study routes.
- Add GitHub repository metadata for future publication: workflow, Dependabot,
  pull-request template, and content/accessibility issue template.
- Add current ServicePulse screenshots captured from labeled synthetic demo
  mode and published in the public portfolio source.
- Add current CloudFileFlow and ReleaseGuard static demo media generated from
  fresh local API/worker and CLI outputs.
- Add a Vercel deployment runbook with pre-deployment checks, Hobby/free-tier
  guardrails, preview and production verification steps, rollback notes, and
  claims boundaries.
- Refresh transitive development dependencies after GitHub Dependabot alerts:
  `brace-expansion` is now locked to 5.0.9 and `undici` to 7.29.0. The
  portfolio check gate and high-severity npm audit passed after the lockfile
  update.
- Add an npm `preview` script for serving the production Vite bundle locally
  before Vercel deployment. The corrected preview route check served the home
  page, three project case-study routes, and SPA fallback from the built
  `dist/` output.
- Refresh the local test DOM dependency to `jsdom` 30.0.1 after a cancelled
  GitHub-native Dependabot update attempt; the Node.js engine floor is now
  documented as 22.22.2 or newer.

Live Vercel deployment and final public profile/link review remain pending.
