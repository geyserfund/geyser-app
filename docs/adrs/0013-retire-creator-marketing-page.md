# ADR 0013: Retire the creator marketing page

## Status

Accepted. Amends the redirect target chosen in [ADR 0012](0012-retire-project-creation-start-page.md).

## Context

ADR 0012 deleted the creation start page and pointed its URLs and in-app links at the creator marketing page, `/creator`. The product owner has since decided to deprecate `/creator` as well: Geyser is focusing on Circular Grants, and "Create a project" should go straight into the project creation flow instead of through a crowdfunding pitch page. The top navigation also carried a "transparent" mode that existed only so it could sit over the creator page's dark hero.

## Decision drivers

- Do not keep a marketing surface for a product line that is being wound down.
- Keep existing links and bookmarks working.
- Keep the sign-in and connected-social-account gate in front of the creation flow, without redirect loops.

## Considered options

- Keep `/creator` as the entry page (ADR 0012). Rejected by the product owner.
- Delete `/creator` and send every entry point to the first creation step. Chosen.

## Decision outcome

- `src/modules/discovery/pages/creator/**` is deleted, with its route, discovery export and route-group entry.
- `/creator`, `/creator/*`, `/launch`, `/launch/start` and `/launch/rules` redirect (replace, query string preserved) to the first creation step, `getPath('launchFundingStrategy', 'new')`.
- In-app "create project" controls (nav button, My projects banner, profile button, impact fund application modal) are buttons that call `useLaunchNow`: a signed-in user with a social account goes to the first creation step; anyone else gets the sign-in / connect-a-social-account modal and continues on success.
- `PrivateRoute` is unchanged as a gate, but a visitor who is not creator-enabled (signed out, or signed in without a connected social account) and opens a creation-flow URL directly is now redirected to the landing page instead of `/creator`, which would loop.
- The creator-only transparent mode is removed from `PlatformNavBar`, `LandingDesktopNav`, `ProjectSelectMenu`, `LandingSearchInput` and `BrandLogoFull`.
- The `discoveryCreator` path helper stays, because the redirect routes use it.

## Consequences

### Positive

- One step fewer between "Create a project" and the creation flow.
- Less legacy crowdfunding UI and no page-specific navigation styling.

### Negative

- A visitor who opens a retired URL or a creation-flow URL directly while signed out, or without a connected social account, lands on the landing page with no explanation. Only the in-app buttons show the sign-in prompt.
- The creator pitch content (who it is for, success stories) is no longer available in the app.
- Translation strings used only by the deleted page remain in the language files until a separate clean-up.

## Implementation status

Implemented on branch `codex/landing-circular-grants-wireframe`. Two creation-flow "leave" navigations under `src/modules/project/pages/projectCreation/` still target `discoveryCreator` and are to be re-pointed separately.
