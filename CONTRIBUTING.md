# Contributing to the portfolio

This repository presents verified portfolio evidence for Tirthrajsinh Parmar.
Changes should keep the public story accurate, recruiter-friendly, accessible,
and supported by local evidence.

## Ground rules

- Do not add unverified degrees, certifications, employment metrics, production
  traffic, customer claims, testimonials, awards, or deployment claims.
- Keep education wording as `Computer Programming, Sault College, September
  2024-April 2026`; do not add a diploma or degree type until that exact type
  is confirmed.
- Do not publish a phone number, private email, source documents, credentials,
  candidate records, or employer-confidential information.
- Do not commit source PDFs, generated build output, dependency directories,
  local reports not intended for publication, secrets, or private drafts.
- Label portfolio projects as independent projects, portfolio projects, or
  technical case studies.
- Keep case-study examples, diagrams, and screenshots based on synthetic
  project data or current local demonstrations, not employer or customer data.
- Keep screenshots, repository links, and live-demo links aligned with the
  current verified state. If a link is not public yet, say so plainly.

## Local setup

```powershell
npm.cmd ci
npm.cmd run dev
```

Use `npm.cmd` on Windows because PowerShell may block the `npm.ps1` shim.

## Required verification before a change is published

```powershell
npm.cmd run check
npm.cmd audit --audit-level=high
```

The `check` script runs linting, TypeScript, Vitest accessibility/route tests,
and the production build. Record the exact command and result in the program
status report before describing a change as locally verified.

## Accessibility expectations

- Preserve semantic headings, landmarks, labels, visible focus styles, and
  keyboard-reachable navigation.
- Keep reduced-motion support intact.
- Avoid autoplay media, fake terminal animation, low-contrast text, and skill
  percentage bars.
- Add or update automated tests when a route, interaction, or case-study layout
  changes.

## Content review checklist

Before opening a pull request or exporting this repository:

- Confirm public copy follows `reports/CLAIMS_LEDGER.md`.
- Confirm project evidence matches current local test and deployment reports.
- Confirm no private source PDFs or generated artifacts are staged.
- Confirm deployment wording is limited to work that has actually been
  executed and recorded.
- Confirm contact details were approved for public display.

## Pull request notes

Summarize:

- What changed.
- Which claims or project evidence were affected.
- Which commands were run.
- Any remaining limitations or external blockers.
