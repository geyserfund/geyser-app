# ADR 0005: Keep build secrets out of browser bundles

## Status

Accepted

## Context

The browser build used `define['process.env'] = env`, which serialized the full build environment into client JavaScript. The Sentry source-map upload token was also named `VITE_APP_SENTRY_AUTH_TOKEN`. Production bundles therefore exposed a credential that must remain private.

## Decision drivers

- Prevent build-time credentials from reaching browser assets.
- Keep Sentry source-map upload working during production and staging builds.
- Preserve the explicit client `APP_URL` replacement used by the heroes page.

## Considered options

- Continue defining the full `process.env` object. Rejected because every build environment value can be emitted into browser code.
- Disable Sentry source-map uploads. Rejected because releases would lose source-map-backed error diagnostics.
- Keep Sentry configuration as build-only variables and define only the required public client value. Accepted.

## Decision outcome

Cloud Build passes `SENTRY_ORG`, `SENTRY_URL`, and `SENTRY_AUTH_TOKEN` as build arguments without a `VITE_` prefix. Vite reads them only to configure the Sentry upload plugin. The browser build defines `process.env.APP_URL` directly instead of defining the whole `process.env` object.

## Consequences

### Positive

- Sentry upload credentials do not appear in browser bundles through the Vite define configuration.
- Future build-only variables are not exposed by default.
- Source-map uploads continue to use the existing Sentry plugin.

### Negative

- New browser configuration must use `import.meta.env.VITE_*` or an explicit safe define; it cannot rely on the full Node environment object.

## Validation

- Build with a known non-production sentinel Sentry token and verify that the token is absent from `dist`.
- Scan the deployed bundle after redeployment and confirm that it contains no Sentry auth token.
- Rotate the exposed production credential before deployment.
