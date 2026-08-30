# Signal Terrain — implementation QA

## Scope

- Route: `/variants/signal/`
- Branch: `experiment/v5-signal-intelligence`
- Content source: `docs/content-map.md`
- Canvas: `p5` instance mode, dynamically imported only by the Signal route
- Icon motion: `morphicons` with Lucide icon data and reduced-motion support

## Source checks

- The four shift titles, five evidence items, 30/60/90 copy, hero copy, support copy and download CTA are reproduced verbatim from `docs/content-map.md`.
- Main route remains routed to the existing `App` and `styles.css` modules.
- Signal assets are isolated under `public/variants/signal/`.
- Generated images have a real alpha channel and transparent corner pixels.
- PNG masters were retained in the shared ImageGen output directory; the website uses optimized alpha-WebP derivatives.

## Generated asset set

| Asset | Website role | Dimensions | Approx. weight |
|---|---|---:|---:|
| `signal-array.webp` | Hero: four signal sources converging | 1536 × 1024 | 377 KB |
| `topology-chambers.webp` | Four cyber shifts system | 1672 × 941 | 250 KB |
| `contour-stack.webp` | Three-stage 30/60/90 instrument | 1024 × 1536 | 281 KB |
| `resolved-signal.webp` | Final convergence object | 1254 × 1254 | 357 KB |

All four were generated with transparent-background prompts using the same graphite, smoked-glass, mint, cyan and restrained violet material system. Prompts explicitly excluded text, numbers, logos, locks and shields.

## Automated validation

- `npm run build`: passed.
- `npm run test:sites`: 4/4 passed.
- Production p5 chunk is isolated behind a dynamic import; gzip size is approximately 340 KB.
- Canvas caps pixel density, reduces its grid on mobile, pauses outside the viewport or in a hidden tab, and renders a static frame for `prefers-reduced-motion`.

## Browser gate

Production browser QA is intentionally deferred to the integration pass requested by the lead agent. The local Vite server could not expose the shared preview port in this worktree because the environment returned `uv_interface_addresses` during server URL discovery. Build output and Sites packaging are valid.

Final result: source validation passed; production browser validation pending integration.
