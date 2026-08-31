# Variants 11–17 / design QA

Date: 2026-08-31  
Production: `https://imonsergey.github.io/Kaspersky-Client/variants/`

## Visual comparison

- `source-production-comparison.jpg` places each public Kaspersky reference beside its implemented Critical 90 adaptation at the same 1440 px capture width.
- `mobile-contact-sheet.jpg` checks all seven published first screens at a 390 px capture width.
- The comparison confirms that each implementation transfers the reference architecture: time atlas, live map, transparency timeline, partner universe, character path, tactile journey and editorial series.
- The supplied deck system remains consistent across all seven: Kaspersky Sans, graphite, mint/emerald, off-white, restrained violet and high-contrast editorial scale.

## Production checks

- All seven routes and the 17-concept hub load from GitHub Pages.
- No horizontal overflow was observed at the desktop capture viewport.
- The responsive rules collapse multi-column content, navigation and cards to a single readable mobile flow.
- Source assets are local; no implementation hotlinks to reference sites.
- Morphicons are used for semantic living icons and honor the user’s reduced-motion preference.
- WebGL canvases detect unavailable contexts and retain a readable static composition; public screenshot rendering confirmed the Three.js, regl and Babylon.js hero scenes.

## Interaction checks

- Future Atlas: 30/60/90 selector updates the active horizon.
- Live Risk Map: risk-channel selection updates the active channel.
- Evidence Atlas: timeline selection updates the phase detail panel.
- Decision Universe: planet selection and search update the strategic focus.
- Right Path: shift selection updates the active character and evidence.
- 90-Day Journey: chapter rail anchors and Matter.js tokens are present.
- Priorities Unlocked: story selection updates the featured episode.

## Issues fixed during QA

- P0: React icon renderer crash on Evidence Atlas and Decision Universe — fixed by routing the affected icons through Morphicons.
- P1: overlap in the Live Risk Map header grid — fixed with explicit min/max grid tracks and spacing.
- P1: low-contrast Cyber Pathways lead over the character composition — fixed with a translucent editorial panel.
- P2: WebGL error noise in browsers without a graphics context — fixed with capability detection and static fallbacks.

## Remaining severity

- P0: none
- P1: none
- P2: none

final result: passed
