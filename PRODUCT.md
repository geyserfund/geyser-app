# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: donors.** Bitcoiners and impact-minded givers who fund Circular Grants and Impact Funds. They arrive wanting to know where their sats go, who is accountable for them locally, and what happened to earlier donations. The product is designed around them first.

**Secondary: Field Partners.** Local organisations that identify, verify and onboard local businesses, run each campaign from start to finish, and steward the Community Fund that recirculated contributions flow into. They also arrive as prospects ("Become a Field Partner").

**Secondary: grant recipients and applicants.** Local entrepreneurs funded through a Field Partner, and projects applying to a regional Impact Fund (for example the Latin America Bitcoin Impact Fund, LABIF).

**Legacy: crowdfunding creators and their contributors.** See Capabilities and Constraints.

## Product Purpose

Geyser moves Bitcoin capital into local economies through Circular Grants: grants to approved local businesses, made through trusted Field Partners, with no repayment required. When able, recipients can contribute to a Community Fund that supports the next local entrepreneur, so donated capital keeps circulating locally.

Geyser has stated that it is focusing all its efforts on Circular Grants. Success is growth in Field Partners and Circular Grants: the landing page states a goal of going from 2 Field Partners and 10 Circular Grants to 12 Field Partners and 24 Circular Grants in 2027.

## Positioning

Debt-free, recirculating capital delivered through accountable local partners. Circular Grants address the gap where banks are inaccessible and microfinance debt can cause pressure, stigma and exclusion. Unlike a loan, nothing must be repaid; unlike a one-off donation, the money is intended to keep working in the same community.

Geyser was previously positioned as a Bitcoin and Nostr native crowdfunding platform. That positioning is being retired.

## Operating Context

- Donors discover Circular Grants on the landing page, browse live grants by region (Africa, Latin America), and donate to an individual grant or to the Geyser Impact Fund.
- Field Partners apply through an external application form, then operate campaigns for local businesses.
- Regional Impact Funds accept applications from projects (LABIF for Latin America).
- Case studies and transparency reporting support donor trust (Afribit Kibera case study; a Circular Grants transparency page).
- The interface is translated into many languages; Spanish and French receive new strings alongside English.

## Capabilities and Constraints

- **Funding is Bitcoin-only.** Bitcoin and Lightning are the native rails; no other currency or token becomes first-class. The code also contains card and Apple Pay contribution paths; how they fit the Bitcoin-only commitment is an open decision.
- **Crowdfunding is being wound down.** Existing projects keep working, but open campaigns, all-or-nothing campaigns, rewards and creator tools are no longer the headline and should not gain new prominence. No timeline has been set (open decision).
- **Open source.** The app stays open source under its current licence.
- **Terminology:** Circular Grant, Field Partner, Community Fund, Impact Fund, Geyser Impact Fund, LABIF. Use these terms exactly.
- **Stack:** React, Chakra UI v2, Apollo GraphQL with generated hooks, i18next. Light and dark colour modes both ship.

## Brand Commitments

- The name stays **Geyser** (geyser.fund).
- The logo is the new Geyser wordmark and the "G" block mark (`src/assets/logo-name-*.svg`, `logo-dark.svg`, `logo-light.svg`, `logo-dark-green.svg`). The earlier lightning-bolt logo is retired.
- The wider identity (colour, typography, imagery) is being rethought for a grassroots, Circular Grants focus; that work is recorded in DESIGN.md, not here.

## Evidence on Hand

- Afribit Kibera Field Partner case study (page in the app, hero image on Geyser's media storage).
- Circular Grants community image: `https://storage.googleapis.com/geyser-media/impact-funds/circular-grants-impact-fund-hero.png`.
- Landing hero portrait: `public/images/landing-hero-market-portrait.webp`.
- LABIF map: `public/images/impact-funds/labif-latin-america-map.png`.
- Stated figures: 2 Field Partners and 10 Circular Grants today; target of 12 and 24 in 2027 (from landing copy; verify before reusing elsewhere).
- Field Partner leaderboard data exists in the API.
- No donor testimonials, press quotes or audited impact figures have been provided. Do not fabricate them.

## Product Principles

1. **Donor trust comes first.** Show who is accountable locally and what earlier donations made possible before asking for money.
2. **Field Partners are the mechanism, not a footnote.** Every grant is presented through the partner who vouches for it.
3. **Circulation is the story.** Emphasise that capital stays and moves within the local economy, not that a target was hit.
4. **Bitcoin is the rail, people are the subject.** Lead with local businesses and communities; Bitcoin explains how, not why.
5. **Do not grow what is being retired.** Legacy crowdfunding features stay functional but receive no new emphasis.
