---
name: Geyser
description: Bitcoin capital for local economies, through Circular Grants and trusted Field Partners.
colors:
  deep-forest: "#26483D"
  deep-forest-pressed: "#1D382F"
  warm-parchment: "#F4EFE4"
  parchment-raised: "#FBF8F1"
  charcoal-brown: "#292925"
  burnt-ochre: "#D98A3D"
  clay-terracotta: "#B9644A"
  sage: "#9DAF91"
  sage-tint: "#DCE4D6"
  sand-border: "#DAD9D6"
  sand-secondary-text: "#63635E"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', 'Figtree', sans-serif"
    fontSize: "60px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Bricolage Grotesque', 'Figtree', sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Figtree', sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.4
  lead:
    fontFamily: "'Figtree', sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "'Figtree', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Figtree', sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.2
rounded:
  innerCard: "6px"
  button-md: "8px"
  card: "10px"
  full: "9999px"
spacing:
  card-padding-mobile: "12px"
  card-padding-desktop: "24px"
  title-to-content: "24px"
  related-blocks: "32px"
  section-gap-mobile: "48px"
  section-gap-desktop: "80px"
components:
  button-primary:
    backgroundColor: "{colors.deep-forest}"
    textColor: "{colors.warm-parchment}"
    typography: "{typography.label}"
    rounded: "{rounded.card}"
    height: "40px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.deep-forest-pressed}"
    textColor: "{colors.warm-parchment}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.sand-secondary-text}"
    rounded: "{rounded.card}"
    height: "40px"
    padding: "0 16px"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.sand-secondary-text}"
    rounded: "{rounded.card}"
    height: "40px"
    padding: "0 16px"
  card:
    backgroundColor: "{colors.parchment-raised}"
    textColor: "{colors.charcoal-brown}"
    rounded: "{rounded.card}"
    padding: "24px"
  hero:
    backgroundColor: "{colors.deep-forest}"
    textColor: "#FFFFFF"
    typography: "{typography.display}"
---

# Design System: Geyser

> **Migration status.** This identity is implemented in the app theme (`src/shared/styles/brandPalette.ts`, `colors.ts`, the button theme and the shared heading components) for light and dark mode. The colour values in this file are the light-mode values; dark mode uses the forest dark scale in `brandPalette.ts` on near-black surfaces, except that primary buttons and progress bar fills stay Deep Forest with white labels (`utils.primarySolid*`) and display headings are white (`utils.heading`). Burnt ochre, terracotta and sage are defined as constants but have no theme scale yet.

## Overview

**Creative North Star: "The Field Report"**

Geyser should read like a report filed from the place where the money lands: documentary, accountable and specific. Real photographs of real people and partners carry the page. Type and colour stay calm and grounded so that evidence, not decoration, does the persuading. The tone is editorial, never promotional.

The system is warm and plain. A parchment page, forest-green structure, charcoal text, and a sturdy poster-like display face give it the feel of printed local material. Surfaces are quiet: cards are a slightly lighter paper on paper, with a hairline border and almost no shadow.

Rejected, by explicit decision: pastel tinted panels (pale yellow or teal card backgrounds), all-caps kicker labels above headings, and icons sitting in coloured circles. The previous bright-teal crowdfunding look is retired.

**Key Characteristics:**
- Photography of people and places leads; illustration is secondary.
- One green carries structure: hero, headings, primary buttons, icons and links.
- Paper-on-paper surfaces with hairline borders, not coloured panels.
- Display type only on headlines and section titles; everything else stays in the UI sans.
- Buttons sit beside or below the copy they act on, right-aligned.

## Colors

An earth palette: one deep green for structure, warm paper neutrals, and a small set of warm accents used sparingly.

### Primary
- **Deep Forest** (`deep-forest`): the hero overlay, headings and section titles, primary button fills, icons, links and the Live indicator. White or parchment text on it is roughly 9–10:1.
- **Deep Forest Pressed** (`deep-forest-pressed`): hover and active state of primary buttons.

### Secondary
- **Burnt Ochre** (`burnt-ochre`): a rare accent for highlights, progress, key figures or one emphasised phrase. Never a button fill, and never text on parchment (2.4:1). Currently unused on the landing page.

### Tertiary
- **Clay Terracotta** (`clay-terracotta`): reserved; no assigned role yet. Passes only as large text on parchment (3.7:1).
- **Sage** (`sage`) and **Sage Tint** (`sage-tint`): soft surface tints and subtle fills only. Never text or icons on parchment (2.0:1).

### Neutral
- **Warm Parchment** (`warm-parchment`): the page background.
- **Parchment Raised** (`parchment-raised`): card and panel surfaces, one step lighter than the page.
- **Charcoal Brown** (`charcoal-brown`): body text; 12.7:1 on parchment.
- **Sand Secondary Text** (`sand-secondary-text`): secondary and supporting copy.
- **Sand Border** (`sand-border`): hairline card borders and dividers.

### Named Rules
**The One Green Rule.** Deep Forest is the only colour that carries structure and action. If a second colour starts filling buttons or headings, the system has drifted.

**The Fill-Not-Text Rule.** Ochre, terracotta and sage never appear as text or icons on parchment. They are fills and accents; they fail contrast as type.

**The No Tinted Panels Rule.** Sections are not distinguished by pastel background colours. Use the raised parchment card, spacing, or a photograph.

## Typography

**Display Font:** Bricolage Grotesque (with Figtree, sans-serif)
**Body Font:** Figtree (with sans-serif)

**Character:** A slightly irregular, hand-set poster grotesque for the voice, over a friendly neutral sans for everything functional. The pairing should feel like a printed local notice with a well-made form underneath.

### Hierarchy
- **Display** (600, 60px desktop / 30px mobile, 1.1): the hero headline only.
- **Headline** (600, 30px desktop / 20px mobile, 1.2): landing section titles and panel headings, in Deep Forest.
- **Title** (700, 18px, 1.4): card titles and item headings inside panels; Figtree.
- **Lead** (500, 24px desktop / 20px mobile, 1.5): the hero sub-title.
- **Body** (400, 16px, 1.6): running copy; secondary copy uses the sand secondary text colour. Dense UI text is 14px.
- **Label** (500, 16px): buttons and chips.

### Named Rules
**The Voice-Only Rule.** Bricolage Grotesque appears on headlines and section titles only. Body copy, buttons, cards, forms and navigation stay in Figtree.

**The No Kicker Rule.** No all-caps eyebrow labels above headings. The heading carries the section on its own.

Note: Bricolage Grotesque has no italic. The italic on "with Bitcoin" in the hero is browser-synthesised; treat a designed emphasis for that phrase as an open decision.

## Layout

Content sits in a centred column with a maximum width of 1200px (1248px including gutters). Page gutters are 12px on mobile and 24px on desktop. The desktop breakpoint (`lg`) is 57em (about 912px); grids step 1 → 2 → 3 columns at mobile, 768px, and desktop.

Vertical rhythm has three tiers: 24px from a section title to its content, 24–32px between related blocks, and 48px (mobile) or 80px (desktop) between sections.

The hero is full-bleed, 470px tall on desktop and 310px on mobile. A solid Deep Forest field covers the left 45% and fades out by 65%, with the photograph occupying the right 72% on desktop so the subject stays clear of the text.

Section titles are full-width and left-aligned, with any section action on the same row at the right. Inside cards, the title runs full width and the action button sits right-aligned, level with the copy on desktop and below it on mobile.

## Elevation & Depth

Nearly flat. Depth comes from tonal layering: a lighter paper card on the parchment page, separated by a 0.5px hairline border. A single very soft shadow token is the only elevation in the system.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 2px 6px -2px rgba(0, 0, 0, 0.04)`): every bordered card. Borderless surfaces carry no shadow.

### Named Rules
**The One Shadow Rule.** Use the card shadow token or none. No one-off `box-shadow` values in feature UI.

## Shapes

Gently rounded and consistent. Cards and large buttons use a 10px radius; images and tiles nested inside a card use 6px; medium buttons use 8px. Images that run to a card's edge take the card's top corners and no radius of their own. Circles are reserved for avatars and the Live indicator, not for icon backdrops.

## Components

### Buttons
- **Shape:** softly rounded rectangle (10px at the 40px large size; 8px at 32px).
- **Primary:** Deep Forest fill with a parchment label, 16px/500, 16px horizontal padding, usually with a trailing arrow icon.
- **Hover / Focus:** fill darkens to Deep Forest Pressed.
- **Outline:** transparent with a 1px sand border and secondary-text label; used for secondary actions such as "Read the case study". On hover the border and label turn forest over a faint forest tint.
- **Ghost:** text and arrow only; used for "Discover more" in section headers. On hover it gains the same faint forest tint.

### Chips
- **Style:** the region filter (Live, In Latin America, In Africa) uses outline buttons, centred above the grant grid, each with a leading Phosphor icon.
- **State:** the selected chip sets `aria-pressed`, which the outline button styles with a forest tint fill, a Deep Forest border and a Deep Forest label. The Live chip carries the animated Live dot.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** Parchment Raised on the Warm Parchment page.
- **Shadow Strategy:** the single card shadow (see Elevation & Depth).
- **Border:** 0.5px hairline in sand border.
- **Internal Padding:** 12px mobile, 24px desktop. Feature cards may run an image edge to edge at the top, with padded content below.

### Inputs / Fields
- **Style:** white field with a 1px sand border and the same soft radius; the newsletter field pairs with a primary "Join" button on the right.

### Navigation
- A top bar on the page background (no separate fill or divider) with the Geyser wordmark, text menu triggers, an outline "Support Geyser" button and a text "Log in". Vertical padding is 10px on desktop and 6px on mobile.

### Hero
- Full-bleed photograph under a Deep Forest field, with a white display headline that breaks before its emphasised phrase, and a medium-weight white lead paragraph. No buttons.

### Icons
- Phosphor (`react-icons/pi`) is the only icon set. Icons are drawn bare, in Deep Forest or the current text colour, never inside a coloured circle.

## Do's and Don'ts

### Do:
- **Do** lead sections with real photographs of people, partners and places.
- **Do** use Deep Forest for headings, primary buttons, icons and links.
- **Do** keep cards as Parchment Raised on Warm Parchment with a hairline border.
- **Do** set headlines and section titles in Bricolage Grotesque at weight 600, and everything else in Figtree.
- **Do** right-align action buttons, level with the copy on desktop and below it on mobile.
- **Do** use Phosphor icons only.

### Don't:
- **Don't** use pastel tinted panels (pale yellow, teal or similar) to mark a section.
- **Don't** add all-caps kicker labels above headings.
- **Don't** place icons inside coloured circles.
- **Don't** use ochre, terracotta or sage as text or icon colour on parchment.
- **Don't** fill buttons with ochre.
- **Don't** reintroduce the bright teal primary on rebranded surfaces.
- **Don't** add one-off `box-shadow` values or card radii.
