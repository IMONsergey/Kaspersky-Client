# Design QA — Editorial Signal

## Source visual truth

- `docs/reference-style-analysis.md`
- `docs/visual-concept.md`
- `docs/website-foundations.md`
- `docs/content-map.md`
- Generated transparent assets in `public/variants/editorial/`

## Implementation

- Route: `/variants/editorial/`
- Components: `src/variants/editorial/EditorialApp.jsx`
- Styles: `src/variants/editorial/editorial.css`
- Canvas: PixiJS 8, loaded only after the editorial hero mounts

## Source checks

- All marketing copy is taken verbatim from `docs/content-map.md`; layout-only section names and numeric navigation markers are reused from the same map.
- Kaspersky Sans Display is used from the existing local font files.
- All four generated assets retain alpha transparency; lossless WebP delivery reduces their combined weight to approximately 3.2 MB.
- The main route remains selected unless the normalized pathname starts with `/variants/editorial`.
- Responsive layouts are defined for 12, 8 and 4-column grids.
- Canvas animation stops for reduced motion, when the document is hidden, and when the hero leaves the viewport.
- Morphicons use semantic icon pairs and `reducedMotion="user"`.

## Browser evidence

- Source mock pixels: not applicable; the approved source is the written Swiss Editorial build brief plus generated asset set.
- Implementation screenshot: unavailable.
- Viewport and density: unavailable.
- State: browser capture pending production integration.
- Primary interactions: source-reviewed; browser interaction pass pending.
- Console errors: browser pass pending.
- Full-view comparison: blocked because the cloud browser rejected the local preview URL after the dev server restarted.
- Focused comparison: blocked for the same reason.

## Findings

- No P0/P1/P2 source, build, asset, alpha-channel, or route-integration issue remains.
- Visual proportions, Pixi runtime behavior, responsive states, menu interaction and final browser console state require the production browser pass requested by the integrating agent.

## Comparison history

- Initial local browser attempt exposed a duplicate-React hook error caused by asynchronously importing both route applications. The route bootstrap was changed to stable static React imports with route-selective rendering. A follow-up local capture was blocked by the cloud browser URL policy, so the visual fix cannot be claimed as browser-verified here.

final result: blocked
