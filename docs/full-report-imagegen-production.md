# Full report — ImageGen A4 production

Branch: `feat/full-report-imagegen-a4`

## Deliverable

- 27 remaining pages: 08–34
- Together with the 8 approved archive pages: 35 physical pages total
- Canvas: A4 portrait, 1:1.414
- Each page is generated from scratch in one ImageGen generation
- No deterministic text overlays, HTML/SVG reconstruction, or layout replacement
- Source copy is preserved verbatim; no rewriting, summarization, or invented labels
- Archive references are used only to control visual style and are not published in this repository

## Visual system

Use the eight approved archive pages as the sole style authority:

- tight Swiss-style editorial grid
- high information density and limited unused space
- Kaspersky-like grotesk proportions
- graphite and dark glass as the main material language
- restrained mint/cyan accents and occasional violet edge light
- premium photoreal 3D objects integrated with typography
- controlled alternation of dark content pages, light analytical pages, section dividers, and typographic accents

Avoid hackers, padlocks, generic shields, binary rain, generic AI brains, circuit-board imagery, cyberpunk scenery, fake UI, random particles, pseudo-text, and text printed on 3D objects.

## Text invariant

Every prompt carries a closed list of allowed visible strings. ImageGen must:

1. reproduce the supplied strings exactly;
2. preserve punctuation, capitalization, numbers, currency, and even source grammar;
3. add no captions, interface labels, decorative lettering, pseudo-text, or text on objects;
4. generate typography, layout, background, and illustration together in the same image.

Any page that adds, rewrites, corrects, or invents visible text is rejected and regenerated.

## QA

- Confirm exactly 27 PNG files, numbered 08–34.
- Confirm every image is A4 portrait at 1055 × 1491 px or the same 1:1.414 ratio.
- Review a contact sheet for style continuity and pacing.
- Check the visible copy against the supplied long-form document.
- Keep only accepted generations in the delivery archive.
