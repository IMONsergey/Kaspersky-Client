# Prism variant — source QA

Date: 2026-08-30

Route: `/variants/prism/`

Branch: `experiment/01-cinematic-prism`

## Source target

- Marketing copy: `docs/content-map.md`
- Corporate web foundations: `docs/esg-site-audit.md`, `docs/website-foundations.md`
- Visual direction: cinematic prism / refraction, Kaspersky graphite and mint, exact local Kaspersky Sans Display.

## Automated checks

| Check | Result |
|---|---|
| All 25 required content-map strings present verbatim in `PrismApp.jsx` | Pass |
| Four generated images are new to this variant | Pass |
| All four images have a real alpha channel and include fully transparent pixels | Pass |
| Route dispatch keeps `/` on the existing `App` and loads Prism only for `/variants/prism/` | Pass |
| Prism styles and implementation are isolated in `src/variants/prism/` | Pass |
| Prism assets are isolated in `public/variants/prism/` | Pass |
| Three.js is dynamically imported by the hero scene | Pass |
| Generated section assets use lazy loading and async decoding | Pass |
| WebGL context loss / import failure keeps the generated hero fallback visible | Pass |
| Canvas animation pauses outside the viewport and in hidden tabs | Pass |
| DPR is capped at 1.6 desktop / 1 mobile | Pass |
| `prefers-reduced-motion` stops the WebGL loop and disables decorative transitions | Pass |
| Header, menu, shift rows, evidence rows, phase rows and dialog expose keyboard-accessible native controls | Pass |
| `npm run build` | Pass |
| `npm run test:sites` | Pass — 4/4 |

## Responsive source review

- Desktop: unified 12-column grid, 1440 px maximum frame.
- 1120 px: eight-column grid and compressed split compositions.
- 820 px: four-column grid, stacked content, condensed header utilities.
- 560 px: single-column phase content, full-width CTA, adjusted hero and generated-asset framing.
- Minimum supported width remains 320 px; all section imagery is clipped within its section and the page prevents horizontal overflow.

## Asset validation

| File | Dimensions | Alpha | Approx. size |
|---|---:|---|---:|
| `prism-conductor.webp` | 1536 × 1024 | true | 134 KB |
| `refractive-chambers.webp` | 1600 × 800 | true | 152 KB |
| `focus-stack.webp` | 1024 × 1536 | true | 224 KB |
| `resolved-aperture.webp` | 1254 × 1254 | true | 324 KB |

The original generated PNGs remain in the session's generated-images directory; the project consumes alpha-WebP derivatives to reduce runtime transfer size.

## Manual visual QA status

Source QA is complete. Cloud-browser visual comparison is intentionally pending integration because the only browser-exposed preview port was occupied by another experiment during parallel work. Do not treat this document as final visual sign-off. The integration owner will inspect this route at desktop and mobile sizes with the other variants before publication.

## Known limitations

- Three.js adds a separately loaded ~181 KB gzip chunk. It is excluded from the main route and requested only when the Prism route mounts.
- The transparent hero poster is the fallback for WebGL-disabled clients; it does not reproduce pointer parallax.
- The download dialog remains a placeholder until the final report PDF is connected, consistent with `docs/content-map.md`.
