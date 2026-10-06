# ADR 0012: Retire the project creation start page

## Status

Accepted. Amended by ADR 0013: `/creator` was retired the same day, so the URLs and links described below now go to the first creation step (`/launch/new/funding/strategy`) instead of `/creator`, and the creation flow's exits go to the landing page.

## Context

The creation start page at `/launch/start` ("How to fundraise on Geyser") was a long marketing and guidance page in front of the project creation flow. Geyser is focusing on Circular Grants and winding down general crowdfunding (see `PRODUCT.md`), so a page that promotes launching a crowdfunding project no longer matches the product. The `/creator` page already carries the creator pitch and the sign-in-gated "launch" action.

## Decision drivers

- Do not give retiring crowdfunding features new or continued prominence.
- Keep existing links and bookmarks working.
- Keep the sign-in gate that sits in front of the creation flow.

## Considered options

- Keep the page and restyle it. Rejected because it grows a surface that is being retired.
- Delete the page and send its URLs to the first creation step. Rejected because the first step needs a signed-in user with a social account, which the start page used to check.
- Delete the page and redirect its URLs to `/creator`. Chosen.

## Decision outcome

- `src/modules/project/pages/projectCreation/views/start/**` is deleted.
- `/launch`, `/launch/start` and `/launch/rules` redirect to `/creator`, preserving the query string.
- In-app links that pointed at the start page (the nav "create project" button, the My projects banner, the profile button, the impact fund application modal, the creation-flow exit, and the private-route fallback) now point at `/creator`.
- `useLaunchNow` moved to `projectCreation/hooks/` and `SocialLinks` to `src/shared/molecules/`, because other pages use them.

## Consequences

### Positive

- One creator entry page instead of two.
- Less legacy crowdfunding UI to maintain and rebrand.

### Negative

- The launch checklist, FAQ and playbook content on the old page is no longer available in the app.
- Translation strings used only by the deleted page remain in the language files until a separate clean-up.

## Implementation status

Implemented on branch `codex/landing-circular-grants-wireframe`. Redirects are not yet verified in a browser.
