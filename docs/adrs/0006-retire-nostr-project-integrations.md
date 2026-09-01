# ADR 0006: Retire Nostr project integrations while retaining authentication

## Status

Accepted

## Context

The app previously used Nostr for project publishing, project-key management, post reposting, badge claiming, and Nostr Wallet Connect (NWC) wallet connections. The server no longer exposes those project integrations or NWC connection details. Nostr authentication and linking an external Nostr account remain supported.

The app must keep the remaining Lightning Address wallet flow and ordinary sharing, achievements, and contribution experiences independent of Nostr. Generated GraphQL documents and user-facing legal copy must match the server contract and the runtime behavior.

## Decision drivers

- Keep app GraphQL operations compatible with the server schema.
- Preserve non-Nostr contribution, sharing, and achievement behavior.
- Remove retired project integration code and its navigation/configuration surface.
- Make the remaining Nostr authentication boundary explicit for future changes.

## Considered options

- Remove all Nostr code, including authentication and external-account linking. Rejected because Nostr authentication remains an active sign-in/account-linking path.
- Keep the project integrations hidden behind the UI. Rejected because the server contract and operational behavior have been retired.
- Retire project publishing, NWC, reposting, project-key management, and badge claiming while retaining authentication. Accepted.

## Decision outcome

The app supports Nostr only for authentication and external-account linking. Project publishing, reposting, project-key export, NWC wallet connections, and Nostr badge claiming are removed. Wallet configuration exposes Lightning Address only. Generated GraphQL schema, operations, and hooks are regenerated from the current server schema.

Non-Nostr sharing, ambassador attribution, achievement display, and contribution flows remain available. Legal and privacy disclosures describe only the integrations that still exist.

## Consequences

### Positive

- The browser no longer requests or depends on retired Nostr project fields.
- Wallet and project flows have one supported connection path.
- Remaining Nostr authentication has a clear architectural boundary.

### Negative

- Existing Nostr-only project features cannot be recovered from the app.
- Legacy stored reward prompts and wallet records require compatibility handling while they remain in the database.

## Validation

- Regenerate GraphQL artifacts against the current geyser-server schema and run typecheck/lint.
- Exercise user and project wallet queries, wallet updates, funding success sharing, and profile achievements.
- Verify that Terms and Privacy Policy no longer claim project data is propagated to Nostr relays.
