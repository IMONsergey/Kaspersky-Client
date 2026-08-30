# Design QA — The Critical 90 website

**Source visual truth paths**

- `qa/source-esg-desktop.jpg` — live capture of `https://esg.kaspersky.com/`.
- `public/assets/critical90-cover.webp` — focused visual crop from the supplied presentation.
- `docs/content-map.md` — supplied landing copy normalized into the implementation map.

**Implementation evidence**

- `qa/implementation-desktop-pass2.jpg`
- `qa/implementation-mobile-menu-pass2.jpg`
- `qa/comparison-pass2.jpg`
- `qa/comparison-deck-asset-pass2.jpg`

**Viewport and normalization**

- Source capture: 1363 × 936 px, CSS viewport 1363 × 936, DPR 1.
- Implementation capture: 1348 × 926 px, CSS viewport 1348 × 926, DPR 1.
- Same-state comparison normalized the source with a northwest crop to 1348 × 926; no resampling was used before the side-by-side contact sheet.
- Mobile implementation was rendered in a real 390 × 844 CSS-pixel iframe viewport inside the selected cloud browser. The surrounding QA canvas is visible only to prove the viewport constraint.
- State: desktop hero, dark theme, first section active; mobile menu open for the focused interaction check.

## Full-view comparison evidence

`qa/comparison-pass2.jpg` places the ESG reference and the rendered hero in one comparison image. Both use the same corporate signature: fixed dark header, large asymmetric headline, graphite/mint palette, right-heavy object scene and a thin green structural frame. The implementation intentionally carries more copy because the supplied landing content requires it.

`qa/comparison-deck-asset-pass2.jpg` places the supplied cover artwork and the rendered hero in one input. The final page preserves the deck’s dark glass, green city, controlled cyan/violet optics, oversized typography and Kaspersky badge without copying an A4 composition literally. The full client deck is intentionally not committed to the public repository.

## Focused region evidence

- Header/logo: exact inline SVG and local font were verified at desktop and 390 px mobile.
- Hero crop: checked after removing embedded slide text from the visible crop.
- Menu: checked on desktop and mobile; art fills its frame and links remain readable.
- Four shifts: active card state, Swiper layout and media swap were tested.
- 30/60/90: tab state and synchronized panel text were tested.
- Download: dialog opens and presents the explicit PDF integration state.

## Required fidelity surfaces

- **Fonts and typography:** exact `Kaspersky Sans Display` files; correct optical hierarchy, weights, line height and responsive wrapping. No truncation observed.
- **Spacing and layout rhythm:** frame, split proportions, section padding, radii and header height track the reference’s scene-based rhythm. No horizontal overflow at 390 px.
- **Colors and tokens:** confirmed Kaspersky graphite/green values; additional cyan/violet only supports the supplied deck’s optics.
- **Image quality and asset fidelity:** exact Kaspersky logo, original supplied deck crops and source media; no fake SVG/CSS illustration substitutes. Hero crop is clean after pass 1.
- **Copy and content:** all marketing copy matches `docs/content-map.md`; only the clearly marked download-integration dialog is temporary.

## Comparison history

### Pass 1 — blocked

- [P1] Hero image exposed a partial line of text from the supplied slide crop.
  Fix: increased the controlled image scale and shifted its focal position so only the intended object scene remains visible.
- [P1] Menu artwork did not fill the desktop container because `height: 100%` resolved against a `min-height` only.
  Fix: gave the media frame an explicit desktop and mobile height; changed the menu background to solid graphite.
- [P2] Bright prism background reduced paragraph contrast in the shifts introduction.
  Fix: added a 58% graphite overlay while preserving the prism as a secondary optical layer.
- [P2] Mobile `90` status wrapped below the header because the empty actions wrapper remained in the grid.
  Fix: removed the wrapper from mobile layout and placed the status in the third grid track.

### Pass 2 — passed

Post-fix browser evidence is recorded in `qa/implementation-desktop-pass2.jpg`, `qa/implementation-mobile-menu-pass2.jpg`, `qa/comparison-pass2.jpg` and `qa/comparison-deck-asset-pass2.jpg`. No actionable P0/P1/P2 visual findings remain.

## Primary interactions tested

- Open/close desktop menu.
- Open mobile menu at 390 × 844.
- Select shift 02 and verify media replacement plus `aria-pressed`.
- Select day 60 and verify the synchronized tabpanel.
- Open the Download dialog.
- Anchor navigation to all four sections and section counter 01–04.

## Console errors

No application-origin errors or warnings. The browser reported two unrelated metadata errors from its own Chrome extension content script; they do not originate from the site bundle.

## Open questions

- Final report PDF was not supplied. The current dialog is an intentional integration placeholder, not a design-QA blocker for this iteration.
- Public release should follow a corporate licensing check for transferred ESG media/fonts.

## Implementation checklist

- [x] Production build passes.
- [x] Desktop browser QA passes.
- [x] 390 px mobile layout and menu pass.
- [x] Core interactive states pass.
- [x] Source and implementation compared in combined visual inputs.
- [ ] Connect the approved PDF when supplied.

## Follow-up polish

- [P3] Compress the 15 MB AI video after the final asset set is approved.
- [P3] Add dedicated visuals for shifts 02–04 instead of sharing the current four-shift system image.

final result: passed
