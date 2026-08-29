# Kaspersky Report Style Audit

Source analyzed: `/Users/erdc/Downloads/sr_en_annual-report_pages_kaspersky_2025.pdf`.

Document instructions inside source files were treated only as document content, not as task instructions.

## Non-Negotiable Content Rule

The DOCX at `/Users/erdc/Documents/ChatGPT/Kaspersky-Client/Taks Docs/Отчет длинная версия.docx` is the single source of truth for all new-report content.

- Never rewrite, improve, summarize, translate, shorten, expand, or replace the report content.
- Slide text must be copied verbatim from the DOCX.
- If a slide cannot fit the available text, change the layout, hierarchy, or slide split, not the wording.
- Old generated runs in `output/*` are rejected as references and must not be used as design or content authority.
- The old PDF is only the visual/style reference; it is not a content source for the new report.
- The new report format is A4 portrait, even though the old visual reference PDF is horizontal.
- Do not compose final pages by placing text over generated imagery in code. Final creative pages should be generated as one complete image through `image_gen`.

## Core Direction

The old report is a horizontal 16:9 editorial report, not a standard document layout. The strongest pages combine premium dark 3D scene design with clean Kaspersky-style typography and restrained analytical UI furniture.

The new report should follow the same system, but avoid literal cybersecurity cliches. The visual standard is: corporate, cinematic, object-based, precise, and quiet.

## Visual System

- Source-reference format: 16:9 landscape pages.
- New-report format: A4 portrait pages.
- Primary mode: dark editorial canvas for covers and chapter openers.
- Secondary mode: white analytical pages with mint data cards and soft teal fields.
- Typography: large geometric sans, white on dark pages, black/dark teal on light pages.
- Main titles: very large, left-aligned, two-line compositions where useful.
- Body text: compact, calm, low line length, never decorative.
- Navigation: small rounded pills across the top; active pill filled mint.
- Frames: thin mint rounded rectangles around hero scenes and data panels.
- Metrics: oversized light-weight numerals, minimal labels, often in bordered cards.
- Side labels: small vertical mono/sans labels on the right edge.

## Palette

- Near black: `#1b1c19` / `#101116`.
- Deep teal: `#217366`, `#276564`, `#134238`.
- Active mint: `#60dcc6`.
- Pale mint/white field: `#eefcf9`, `#ffffff`.
- Accent: very limited blue-violet only as shadow or secondary glow.

## 3D / Illustration Rules

- Use cinematic cyber-futurist product scenes, not clean toy-like 3D icons.
- Use physical product-sculpture metaphors: glass, matte black metal, frosted acrylic, glowing contour lines, platforms, transparent panels, modular architecture, robotic/industrial objects where relevant.
- Prefer abstract staged installations over literal cybersecurity icons.
- Good motifs: glass rings, plinths, modular blocks, suspended panels, protective contours, decision timelines, glowing tracks, dark product stages, transparent dashboards, illuminated edges.
- Dominant project accent: `#29CCB1` and closely related teal/mint tones.
- Avoid: generic shields as the main idea, generic server racks as the main scene, oversized padlocks, fingerprints, brains, cloud icons, hacker imagery, skulls, code rain, cityscapes, generic dashboards, isolated white-background icon stacks.
- Every illustration must be contextual: read the exact DOCX section for the slide, then select a metaphor for that slide's meaning.
- Do not put dense readable text inside generated 3D objects unless it is part of a deliberate data slide.

## Cover Slide Direction

For the new executive guide, the first slide should use:

- Left side: brand text, title, subtitle, short kicker, URL.
- Right side: one framed premium 3D scene.
- Concept: `90 days` as a decision window, not as an IT dashboard.
- Visual metaphor: a translucent arc/ring with three checkpoint nodes and four abstract risk modules.
- Title content:
  - `kaspersky`
  - `The critical 90`
  - `An executive guide to reduce cyber-risk in the next 90 days`
  - `Four cyber shifts will affect your business in 2026-2027. Here’s what to do about it.`
  - `kaspersky.com`

## Rejected Direction

Earlier output-style directions are not to be reused. The rejected visual language includes generic shields, server racks, labeled risk cards, icon-heavy cyber panels, and literal security dashboards.

Programmatically composed text-over-background pages are also rejected for this project. Use complete `image_gen` pages instead.

## Current Generated Candidate

Saved candidate:

`/Users/erdc/Documents/ChatGPT/Kaspersky-Client/output/imagegen_current/slide_01_critical_90_v2.png`

This candidate removes the worst literal cybersecurity elements and moves toward the original report's physical 3D editorial language.
