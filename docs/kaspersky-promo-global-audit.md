# Kaspersky promo-site audit / variants 11–17

Audit date: 2026-08-31. Scope: public Kaspersky-owned or Kaspersky-branded interactive projects. The new implementations keep the supplied presentation’s Kaspersky Sans, graphite, mint and controlled violet system, while transferring the interaction and composition logic of each reference to the approved Critical 90 content.

## Seven reference systems

| # | Reference | Source behavior and layout | Observed stack / assets | Critical 90 adaptation |
|---|---|---|---|---|
| 11 | [Earth 2050](https://2050.earth/) | Full-viewport black atlas, central future globe, 2030/2040/2050 selector, right-hand “What’s hot” feed | Three.js, Hexasphere, panorama scripts, custom Kaspersky bundle | Three.js decision globe, 30/60/90 horizon selector, four-shift feed |
| 12 | [Cyberthreat Map](https://cybermap.kaspersky.com/) | Fullscreen telemetry field, live state, scan/radar language, dense information perimeter | WebGL/canvas real-time visualization | p5.js risk radar, live ticker, channel selector and response console |
| 13 | [Global Transparency Initiative map](https://gti.kaspersky.com/en/map) | Pale dotted world map, vertical year rail, event pin, side detail card | Next.js App Router, WebGL canvas, modular CSS chunks | regl dot field, 30/60/90 rail, evidence ledger and selected-phase drawer |
| 14 | [Partnerverse](https://partnerverse.kaspersky.com/) | Dark 3D universe, searchable planets, systems, orbits, history and case layers | Vite-built interactive app, custom 3D asset bundle | Babylon.js strategic universe, searchable shift-planets, Hall of Priorities |
| 15 | [Cyber Pathways](https://cyberpathways.kaspersky.com/en/) | White 12-column grid, black navigation bar, oversized typography, character-led selection, vertical journey | Vite bundle, Kaspersky Sans, source WebP character assets | Lottie living path, official locally stored character assets, selectable strategic shifts |
| 16 | [One Dollar Lesson](https://onedollarlesson.com/) | Fullscreen object-led journey, engraved material world, vertical chapter rail, tactile 3D scenes | Custom JavaScript/CSS animation stack, SVG infographics and rendered 3D scenes | Matter.js 90-day tokens, locally stored official wall texture, four-shift route and three chapters |
| 17 | [Tomorrow Unlocked](https://www.kaspersky.com/blog/secure-futures-magazine/tomorrow-unlocked/) | Branded editorial masthead, pastel media hero, featured player, series cards and episodic rhythm | WordPress editorial stack, canvas decorations, photographic thumbnails | PixiJS story field, locally stored official Kaspersky editorial images, four strategic “episodes” |

## Shared corporate constraints

- Typography: Kaspersky Sans Display from the project’s local font files.
- Palette: graphite `#14161B`, mint/emerald, off-white and tightly controlled violet accents from the supplied slide deck.
- Grid: desktop layouts use 12-column logic, explicit content rails and repeated alignment lines; mobile collapses to one column without losing the core interaction.
- Content: all strategic copy comes from `src/variants/round2/content.js` and the approved content map. No new claims or invented statistics were added.
- Assets: selected Cyber Pathways, One Dollar Lesson and Tomorrow Unlocked assets are stored locally under `public/variants/`; no source-site hotlinks remain in the implementation.
- Motion: every concept uses a different canvas/runtime and honors `prefers-reduced-motion`; Morphicons animate semantic icon transitions.

## Differentiation test

The seven concepts intentionally differ at the information-architecture level, not merely in color:

1. Time map and feed.
2. Real-time operational console.
3. Geographic evidence timeline.
4. Searchable spatial universe.
5. Character-led branching path.
6. Tactile chapter journey.
7. Cinematic editorial series.

This preserves the project’s presentation style while preventing the variants from collapsing into one repeated SaaS landing-page template.
