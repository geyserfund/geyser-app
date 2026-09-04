# ADR 0010: Rename Recoverable Grants to Circular Grants

## Status

Accepted

## Context

The managed grant product is being renamed from Recoverable Grants to Circular Grants. The rename crosses the app/server GraphQL boundary, persisted project classification, payment capability names, environment configuration, frontend routes, and user-facing copy. The managed funding model and its behavior do not change.

## Decision drivers

- Use one consistent product term across code, APIs, configuration, URLs, and copy.
- Preserve existing managed-grant records and funding behavior.
- Avoid stale serialized funding summaries after the field rename.
- Keep the historical ADR and changelog record append-only.

## Considered options

- Rename only visible copy. Rejected because internal APIs, persisted identifiers, routes, and configuration would retain the retired product term.
- Add compatibility aliases. Rejected because the requested release is a coordinated hard cutover.
- Perform a coordinated full rename. Chosen because app and server are released together and existing data can be migrated in place.

## Decision outcome

All active app identifiers, GraphQL fields and types, routes, tests, and copy use Circular Grant terminology. The persisted project discriminator and managed-goal title are renamed by a forward-only migration. Public routes and API fields use only the new names. Existing externally managed GCS object paths and the managed Stripe account secret retain their Recoverable Grant names so the coordinated release does not break deployed resources.

Managed-grant classification, payment behavior, protected-goal rules, attribution, and the 14-day funding window remain unchanged.

## Consequences

### Positive

- Product terminology is consistent across the full application boundary.
- Existing records retain their classification and funding history.
- A new cache namespace prevents old serialized field names from being read.

### Negative

- Old GraphQL clients and public URLs are unsupported after the coordinated release.
- Deployment must preserve the existing managed Stripe secret and apply the database migration before the new server runs.

## Rollout and validation

Deploy the database migration, server, and app as one coordinated release. Regenerate GraphQL types, run app type/state/Playwright checks, run the server focused test suite, verify renamed routes and configuration, and scan active files for stale terminology while excluding immutable historical records.
