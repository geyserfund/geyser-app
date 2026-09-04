# ADR-0009: Fully deprecate paid launches

Status: Accepted

## Context and Problem Statement

The app still contains paid-launch plan selection, launch-fee payment, launch-destination funding, and a Prism claim compatibility branch. These paths are no longer supported. Managed Recoverable Grants remain the only projects that can be created, while historical paid-launch records must remain available in the database.

## Decision Drivers

- Remove all user-facing paid-launch payment and launch-plan behavior.
- Prevent old drafts from retrying deprecated payments.
- Preserve generic historical Prism/TIA payout and withdrawal behavior where needed for existing balances.
- Remove obsolete browser configuration and contract calldata generation.
- Coordinate the breaking GraphQL field removal with the server.

## Decision Outcome

Chosen option: retain only the managed Recoverable Grant creation/finalization flow and remove paid-launch runtime behavior.

The app removes paid-launch routes, screens, contribution creation, Prism claim construction, launch-plan feedback fields, and paid-launch configuration. Existing non-managed creation drafts are shown a deprecation state and cannot enter a payment flow. Generic historical payout and withdrawal UI remains. Database-only history is not exposed through the active GraphQL client.

### Consequences

- Good: creators cannot initiate new paid-launch payments from the app.
- Good: the browser bundle no longer contains paid-launch contract configuration.
- Bad: clients using removed GraphQL fields must be upgraded before the server schema removal.
- Neutral: persisted legacy creation-step enum values remain readable, but deprecated drafts are blocked.

## More Information

ADR-0008 is superseded by this decision. Deploy the app before removing the corresponding server GraphQL fields.
