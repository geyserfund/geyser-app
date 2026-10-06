---
target: the landing page
total_score: 17
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
target_identity: "file:/Users/steliosrammos/Development/ln-projects/geyser/geyser-development/geyser-app/src/modules/discovery/pages/landing/views/mainView/defaultView/DefaultView.tsx"
target_fingerprint: "sha256:fe1c5f2442e5c933b670a6eaae04f310a67633172a50494f0c816a43ddb5849d"
target_path: /Users/steliosrammos/Development/ln-projects/geyser/geyser-development/geyser-app/src/modules/discovery/pages/landing/views/mainView/defaultView/DefaultView.tsx
timestamp: 2026-10-06T12-13-44Z
slug: iews-mainview-defaultview-defaultview-tsx-70ee6cb8
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Below-fold sections mount on a 2s timer with no placeholder; skeleton is a 4-row stack for a 3-column grid; filter chips have no pressed semantics |
| 2 | Match System / Real World | 2 | "Live" chip controls "Featured Circular Grants"; Circular Grant, Field Partner, LABIF appear before anything explains them |
| 3 | User Control and Freedom | 3 | Chips reversible, carousel has arrows |
| 4 | Consistency and Standards | 1 | Three card radii, five CTA styles, two section-header patterns, two hover languages, three amber treatments |
| 5 | Error Prevention | 3 | Little to get wrong |
| 6 | Recognition Rather Than Recall | 2 | Chip state scrolls away from the content it filters |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 2 | One stack of four panels is 40% of desktop and 49% of mobile page height |
| 9 | Error Recovery | 2 | Retry exists but at 24px; Top Heroes fails silently into empty cards |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **17/32** | **Acceptable (53%)** |

## Design Specificity Verdict

LLM assessment: half authored, half template. The hero photograph and the Afribit case study are specific to Geyser. The structure is not: photo hero, pill filters, card grid, then four full-width tinted panels at 24px radius, each icon chip + heading + paragraph + button, dropped into a product whose cards are 10px. The most important content looks least like Geyser.

Deterministic scan: static scan of defaultView and heroes returned 0 findings. In-page scan at a 500px viewport returned 18 findings: low-contrast 6, body-text-viewport-edge 5, clipped-overflow-container 2, undersized-ui-text 1, ai-color-palette 1, kicker-above-heading 1, skipped-heading 1, dark-glow 1. Agreeing with the review: "Learn more about Circular Grants" 3.3:1; "OUR FOCUS" eyebrow 4.4:1; newsletter placeholder 3.3:1; h1 followed by h3. False positives: hero text contrast (sits on a dark photo overlay), carousel cards off-screen by design, pull-to-refresh wrapper clipping, DEV badge.

## Overall Impression

Good raw material in the wrong order and the wrong clothes. The page asks for money before it says what a Circular Grant is, has no primary action, and the new mission panels use a different radius, padding and button language from the rest of the product.

## What's Working

1. Hero photograph with a left-weighted gradient: specific, legible, no stock feel.
2. The Field Partners panel is a complete argument in one container: claim, three mechanics, action, proof.
3. Token discipline in the new sections is mostly sound: mode-aware palette tokens, no raw hex, no one-off shadows, pi icons.

## Priority Issues

- [P1] No primary action, and the pitch arrives after the ask. Hero has no button; chips and nine cards precede any explanation; the first mission CTA is grey and reads as disabled. Fix: action row in Hero.tsx, move "Our focus" directly under the hero, make the grey CTA outline. Command: /impeccable layout
- [P1] The mission megablock is 40% of desktop and 49% of mobile. Four same-shaped panels, five CTAs. Fix: split CircularGrantsMission into three sections and interleave; put Become a Field Partner and LABIF side by side; move "Help fund this movement" to the close. Command: /impeccable layout
- [P1] Two design systems on one page. 24px/16px radii, 32-36px paddings, grey/teal/amber solid CTAs against 10px CardLayout cards. Fix: the deviation map. Command: /impeccable polish
- [P1] Dark-mode top nav is broken. PlatformNavBar.tsx hardcodes black and white. Fix: utils.text / utils.pbg. Command: /impeccable polish
- [P2] Filter bar is detached, mislabelled and clipped on mobile. Centred chips 80px above a left-aligned title; "In Africa" cut off at 390px. Fix: chips in the Featured header row, lg size, aria-pressed. Command: /impeccable layout

## Persona Red Flags

Jordan (first-timer): no hero button; "Live" vs "Featured"; three unexplained terms before the explanation; grey CTA looks disabled.
Riley (stress tester): Featured error leaves a lone "Discover more"; Top Heroes shows three title-only cards; skeleton shape does not match grid; region views can render nothing when empty.
Casey (mobile): 24px Retry, 32px arrows; third chip clipped with hidden scrollbar; about 3,000px of one block; carousel shows 18px of the next card.

## Minor Observations

- Everything jumps 1 to 3 columns at lg; tablets get full-width single cards.
- Flat 80px rhythm, non-responsive, plus 160px bottom padding.
- Afribit image crops its burned-in caption.
- docs/STYLE_GUIDE.md still documents the deprecated colour scale.

## Questions to Consider

1. If Geyser is focusing all its efforts on Circular Grants, why is that sentence the fifth thing on the page?
2. The page asks one visitor to donate to a project, donate to the fund, become a Field Partner, apply to LABIF and subscribe. Which one wins?
3. Would one project grid instead of two be stronger, with the space given to the Afribit proof?
