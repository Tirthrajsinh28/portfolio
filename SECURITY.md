# Security Policy

This portfolio is a client-side React application. It currently has no contact
form, authentication, analytics, advertising scripts, or stored visitor data.
That reduces the current attack surface, but it is not a comprehensive security
claim.

## Supported scope

Security review currently applies to the local portfolio source, build
configuration, dependency lockfile, route rendering, accessibility tests, and
publication metadata.

## Reporting

General professional contact may use `tirthrajsinh2803@gmail.com`. For
security reports after publication, prefer GitHub private vulnerability
reporting or repository security advisories when available.

Do not open public issues containing secrets, personal data, private source
documents, employer-confidential material, or exploit payloads.

## Current limitations

- Vercel Hobby is selected for the portfolio, but no external deployment has
  been verified.
- Remote GitHub Actions, GitHub secret scanning, and Dependabot alert review
  have not run because the repository is not published.
- Security headers such as HSTS depend on the eventual hosting platform and
  have not been verified.
