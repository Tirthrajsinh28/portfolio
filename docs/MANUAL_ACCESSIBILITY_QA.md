# Manual Accessibility QA Checklist

Last updated: 2026-09-01

Status: Checklist only. These checks are not passed until a reviewer executes
them against the current local preview or deployed Vercel URL and records the
result in `reports/ACCESSIBILITY_REPORT.md`.

## Evidence boundary

The portfolio already has automated route, axe, CSS-contract, colour-token,
and production-route/media preflight evidence recorded in the workspace
reports. This checklist covers the remaining human/browser checks that cannot
be honestly replaced by static tests:

- physical keyboard navigation;
- browser zoom and reflow;
- visual contrast review on the rendered page;
- screen-reader spot checks;
- deployed-page link and media review after Vercel is connected.

Passing this checklist would support a statement such as "manually reviewed
for keyboard navigation, zoom/reflow, screen-reader basics, and rendered
contrast on the checked routes." It must not be described as full WCAG
conformance, a comprehensive accessibility audit, or proof that every assistive
technology/browser combination works.

## Test target

Record one target before starting:

- Local preview URL:
- Deployed Vercel URL:
- Browser and version:
- Operating system:
- Screen reader, if used:
- Date and reviewer:

Do not mix evidence from different builds without noting it.

## Routes to check

Check these routes at minimum:

- `/`
- `/about`
- `/projects`
- `/projects/servicepulse`
- `/projects/cloudfileflow`
- `/projects/releaseguard`
- `/experience`
- `/education`
- `/skills`
- `/resume`
- `/contact`
- `/privacy`
- one intentionally missing route, such as `/definitely-missing-route`

## Physical keyboard checklist

For each route:

- [ ] The first Tab stop exposes `Skip to main content`.
- [ ] Activating the skip link moves focus to the main content area.
- [ ] Tab order follows the visual reading order.
- [ ] Every interactive element can be reached without a mouse.
- [ ] Every interactive element has a visible focus indicator.
- [ ] Links, buttons, and route controls can be activated with keyboard input.
- [ ] Focus is not trapped anywhere.
- [ ] Route changes place focus at a useful page heading or main-content area.
- [ ] The custom 404 route offers a clear keyboard-reachable path back home.

Record failures with route, browser, expected behavior, actual behavior, and a
short reproduction path.

## Zoom and responsive reflow checklist

At 200% browser zoom and at a narrow mobile viewport:

- [ ] Content remains readable without horizontal page scrolling.
- [ ] Navigation remains usable.
- [ ] Project cards and case-study sidebars reflow into a readable single
      column.
- [ ] Images scale within the viewport and retain useful alternative text.
- [ ] Focus outlines are not clipped.
- [ ] No text overlaps, truncates essential content, or becomes hidden behind
      sticky UI.

## Screen-reader spot check

Use NVDA, Narrator, VoiceOver, or another available screen reader:

- [ ] The page title and primary heading identify the route.
- [ ] Landmark navigation exposes header/navigation/main/footer regions
      sensibly.
- [ ] Heading navigation moves through sections in a logical order.
- [ ] Project status and limitation copy is understandable when read aloud.
- [ ] Screenshot/demo images expose descriptive alt text.
- [ ] Link text is meaningful without relying only on surrounding layout.
- [ ] The contact page exposes the approved public email without publishing a
      phone number.
- [ ] No fake deployment, production, users, certification, or employer-metric
      claim is announced.

## Visual contrast and motion check

- [ ] Body text, muted text, action links, and buttons appear readable on the
      rendered backgrounds.
- [ ] Focus indicators are visible against nearby surfaces.
- [ ] Status pills and callouts do not rely on colour alone.
- [ ] The site remains comfortable with reduced-motion enabled.
- [ ] There is no autoplay media, fake terminal animation, or excessive motion.

## Deployed-page checks after Vercel

Run these only after a live URL exists:

- [ ] Every primary navigation link returns the expected route.
- [ ] All GitHub repository links open the correct public repository.
- [ ] Screenshot/demo images load from the deployed site.
- [ ] The custom 404 route renders instead of a host-level error page.
- [ ] HTTPS is active.
- [ ] No unsupported live-demo, production-use, user-count, star/fork, or
      deployment claim appears.

## Result template

Copy this into `reports/ACCESSIBILITY_REPORT.md` after execution:

```text
Manual accessibility QA result:
- Target:
- Date:
- Reviewer:
- Routes checked:
- Keyboard result:
- Zoom/reflow result:
- Screen-reader result:
- Visual contrast result:
- Deployed-link/media result:
- Issues found:
- Fixes applied:
- Rerun result:
- Remaining limitations:
```

If any critical keyboard, zoom, screen-reader, or deployed-link issue is found,
fix it and rerun the affected route checks before publishing an accessibility
claim.
