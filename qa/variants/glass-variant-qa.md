# Glass variant — implementation QA checkpoint

Date: 2026-08-30

## Scope

- Route: `/Kaspersky-Client/variants/glass/`
- Source content: `docs/content-map.md`
- Brand/style grounding: `docs/website-foundations.md`, `docs/visual-concept.md`, `qa/comparison-deck-asset-pass2.jpg`
- Implementation: `src/variants/glass/`
- Assets: `public/variants/glass/`

## Checks completed

- `npm run build`: passed.
- `npm run test:sites`: 4/4 passed.
- `git diff --check`: passed.
- All four generated PNG assets have an alpha channel and report `opaque=false`.
- Main route remains the default; the glass bundle is lazy-loaded only for `/variants/glass/`.
- Desktop cloud-browser checkpoint at 1363 × 936:
  - hero layout and header grid rendered without horizontal overflow;
  - generated hero and shifts assets loaded at native resolution;
  - expanded menu opened and exposed all four section links;
  - four shift controls rendered;
  - no application console errors after the WebGL capability guard was added.
- WebGL-unavailable fallback verified: the generated hero object remains visible and all content/interactions remain functional.

## Deferred production QA

- Hardware WebGL animation, mobile browser capture, reduced-motion emulation and full-page visual comparison will be rerun after integration by the production QA owner.
- The final PDF is still unavailable, so the download CTA intentionally opens the existing service-state dialog.
