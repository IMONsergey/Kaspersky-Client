# Design QA — The Critical 90 website · generated-asset redesign

**Source visual truth**

- `qa/source-esg-desktop.jpg` — live capture of `https://esg.kaspersky.com/`.
- `docs/content-map.md` — exact supplied landing copy.
- `prompts/imagegen-prompts.md` — transparent asset art direction and constraints.
- `https://www.morphicons.com/` — inspected motion reference for interruptible semantic icon morphs.

**Implementation evidence**

- `qa/implementation-desktop-v3.jpg` — published hero at the selected Chrome viewport.
- `qa/source-esg-desktop-v3-normalized.jpg` — source crop normalized to the implementation viewport.
- `qa/comparison-v3.jpg` — source and implementation in one combined comparison input.
- `qa/variants/hub-production.jpg` — published comparison hub.
- `qa/variants/production-heroes-contact.jpg` — settled production heroes for all five experiments.
- `qa/variants/generated-assets-contact.jpg` — all twenty experiment-specific transparent assets.
- `qa/variants/reference-comparison.jpg` — the ESG reference and all five production heroes in one combined comparison input.

**Viewport and state**

- Source: 1363 × 936 px, normalized with a northwest crop to 1348 × 926 px.
- Implementation: 1348 × 926 px, DPR 1.
- State: desktop hero, first section active, all generated assets loaded, reveal settled.
- The cloud browser rejected an isolated `data:` mobile viewport by its URL security policy. No alternate browser surface was used. Mobile was checked through the responsive source rules and the production DOM structure; a dedicated narrow-viewport screenshot remains a follow-up proof item, not a known visual defect.

## Combined comparison findings

`qa/comparison-v3.jpg` confirms the implementation keeps the corporate visual grammar of the ESG reference: exact Kaspersky logo and display face, fixed utility header, dark graphite field, asymmetric editorial headline, one large object gesture and functional mint. The redesign intentionally moves from the reference’s full-frame scene to a more SaaS-like decision system, using a true-alpha generated object plus a restrained canvas trajectory field.

The implementation is denser in the left headline region because the supplied H1 is materially longer than the reference. The 12-column alignment, edge rhythm and object-to-copy balance remain coherent. There is no visible cropping, distorted logo, unintended image matte, overflow or low-contrast copy in the settled state.

`qa/variants/reference-comparison.jpg` confirms that each experiment preserves the corporate system — exact logo, Kaspersky display typography, graphite field, functional mint, asymmetric headline/object balance and disciplined header grid — while changing the visual logic. Prism is cinematic and refractive; Editorial is typographic and linear; Orbit is navigational; Glass is modular; Signal is topographic and analytical. The five heroes are visibly distinct without drifting outside the reference language.

## Iteration history

### Pass 1 — blocked

- [P1] Hero text and generated object were auto-placed in separate CSS Grid rows because their column ranges overlap.
  Fix: explicitly locked both scene items to row 1; mobile explicitly restores the visual to row 2.
- [P1] The four-shift heading was pushed below the object for the same auto-placement reason.
  Fix: heading and object now share row 1; the card system is explicitly row 2; compact breakpoints return to normal document flow.
- [P2] The `04 shifts` hero status overlapped the last line of the H1.
  Fix: moved the status to the upper-right of the generated object and restored the mobile position separately.
- [P2] CTA icons morphed only when the pointer directly entered the SVG hit area.
  Fix: each icon now listens to hover/focus state on its full parent control.

### Pass 2 — passed

The settled production hero, menu, shifts, evidence, 90-day introduction, 30/60/90 states and download dialog were visually inspected in the selected cloud Chrome browser. No actionable P0/P1/P2 findings remain.

### Pass 3 — blocked

- [P1] Signal Intelligence let CSS Grid auto-place the hero copy in a second row, moving most of the H1 below the first viewport.
  Fix: explicitly locked the copy and generated object to the same first grid row; compact breakpoints still return the object to normal flow.
- [P2] Decision Room applied `role="listitem"` directly to interactive buttons, hiding their button semantics from assistive technology.
  Fix: the collections now use labelled groups and every interactive row retains its native button role.

### Pass 4 — passed

The corrected production build was re-captured at 1348 × 926 px. Signal copy now begins at y=266px beside its object, all Decision Room shift/evidence controls expose button semantics, the 30/60/90 tabs expose tab semantics, and no actionable P0/P1/P2 findings remain across the hub or five experiments.

## Primary interactions tested

- Open/close the fullscreen menu; exact navigation targets and generated menu object render correctly.
- Navigate to all four top-level sections; the header counter updates `01/04` → `04/04`.
- Select shift 02; `aria-pressed`, card treatment, generated-object caption and Morphicon update.
- Select evidence item 03; semantic icon morph and active row update.
- Select day 60; `aria-selected`, card inversion, progress line and icon update.
- Open and close the Download dialog.
- Hero canvas responds without intercepting links or buttons.
- Open each experiment from the comparison hub using its direct deep link.
- Prism: select shift 02 and verify `aria-pressed` plus the refractive fallback when WebGL is unavailable.
- Editorial: select shift 04 and open the native download dialog.
- Orbit: select shift 02, evidence 03 and day 60; verify `aria-pressed` / `aria-selected` and the tab panel.
- Glass: select shift 03 and open the download dialog.
- Signal: select shift 02 and open the download dialog; verify the p5 canvas and corrected same-row hero composition.

## Required fidelity surfaces

- **Grid:** one 12-column frame (`1440px` max) is shared by header and every major section; 8-column tablet and 4-column mobile rules are explicit.
- **Typography:** only local `Kaspersky Sans Display` with the fixed weight and line-height system.
- **Color:** corporate graphite/mint values; cyan/violet limited to optical edges.
- **Assets:** the main concept uses three generated transparent PNGs; the five experiments use twenty generated transparent WebPs. Every delivered image reports an `srgba` alpha channel. Previous photos, source WebP crops and videos remain removed; only the exact corporate logo is retained from the reference.
- **Motion:** canvas, reveals and Morphicons respect `prefers-reduced-motion`; icons use meaningful from/to pairs rather than decorative spinning.
- **Copy:** supplied marketing copy remains unchanged; only the clearly marked PDF integration dialog is temporary.

## Build and console

- `npm run build` — passed.
- `npm run test:sites` — 4/4 passed.
- Production images report complete loads and valid natural dimensions.
- Document horizontal overflow at the desktop QA viewport: none.
- No application-origin console errors or warnings. Logged metadata errors originate from the cloud browser’s Chrome extension.
- The selected cloud Chrome disables hardware WebGL. Prism intentionally reports this platform condition and displays its generated static fallback; OGL/regl variants also retain designed fallbacks. Each route still mounts its dedicated canvas element, while PixiJS and p5.js render normally in the selected browser.

## Open question

- The final report PDF was not supplied. The dialog remains the intentional integration placeholder.

## Follow-up proof item

- [P3] Record a dedicated 390 × 844 production capture when the selected cloud browser exposes a supported narrow viewport. Responsive CSS and semantic ordering are already present.

final result: passed
