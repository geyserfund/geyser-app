# Authentication Testing

This directory contains authentication helpers for Playwright E2E tests. There are two approaches:

## Mocked Authentication (Existing)

Fast tests using mocked window.nostr and backend responses.

**Files:**
- `mocks.ts` - Mock Nostr extension, auth endpoints, and GraphQL responses
- `flows.ts` - Mocked login/logout flows

**Usage:**
```typescript
import { setupNostrAuthMocks } from '../../domains/auth/mocks'
import { loginWithNostr } from '../../domains/auth/flows'

test.beforeEach(async ({ page }) => {
  await setupNostrAuthMocks(page)
  await page.goto('/')
})

test('my test', async ({ page }) => {
  await loginWithNostr(page)
  // Test authenticated features
})
```

## Real Authentication (New)

Actual backend authentication using cryptographically signed Nostr events.

**Files:**
- `realAuth.ts` - Real Nostr signing and authentication

**Features:**
- ✅ Uses real cryptographic signing with nostr-tools
- ✅ Hits actual backend endpoints (no mocks)
- ✅ Establishes real sessions with cookies
- ✅ Backend creates/retrieves real user accounts
- ✅ Modular and reusable across test suites

**Usage:**
```typescript
import { setupRealAuth, loginWithRealNostr } from '../../domains/auth/realAuth'

test.beforeEach(async ({ page }) => {
  await setupRealAuth(page)
  await page.goto('/')
})

test('my test with real auth', async ({ page }) => {
  await loginWithRealNostr(page)
  // User is now authenticated with real backend session
  // Can test actual funding flows, wallet connections, etc.
})
```

## When to Use Each Approach

### Use Mocked Auth When:
- Testing UI components and flows in isolation
- Speed is critical (mocked tests are faster)
- Don't need actual backend sessions
- Testing scenarios that don't depend on real user data

### Use Real Auth When:
- Testing end-to-end flows that require backend sessions
- Testing features that depend on real user authentication state
- Verifying actual authentication and authorization logic
- Testing funding, wallets, or other authenticated features
- Setting up pre-authenticated state for other test suites

## Example: Using Real Auth in Funding Tests

```typescript
import { setupRealAuth, loginWithRealNostr } from '../../domains/auth/realAuth'

test.describe('Funding with Real Auth', () => {
  test.beforeEach(async ({ page }) => {
    // Setup real authentication before navigation
    await setupRealAuth(page)
    await page.goto('/')
    
    // Login with real backend session
    await loginWithRealNostr(page)
  })

  test('should fund project while logged in', async ({ page }) => {
    // User is authenticated with real backend
    await page.goto('/project/my-test-project')
    
    // Test funding flow with authenticated user
    // Real wallet connections, real transactions, etc.
  })
})
```

## Building the Nostr Bundle

Before running real auth tests, build the nostr-tools bundle:

```bash
# Inside Docker container
docker exec -ti geyser-app yarn workspace @geyser-app/testing build:nostr-bundle

# Or locally if not using Docker
yarn workspace @geyser-app/testing build:nostr-bundle
```

## Running Tests

```bash
# Run mocked auth tests (fast)
docker exec -ti geyser-app yarn test:playwright:auth

# Run real auth tests (with backend)
docker exec -ti geyser-app yarn test:playwright:real-auth

# Run all playwright tests
docker exec -ti geyser-app yarn test:playwright
```

## Test Credentials

Real authentication uses the test user defined in `domains/shared/constants.ts`:

- **nsec**: `nsec1smf92mawwjfluyj8neww9xllwyeq88dhu70zuvdyc54mq9hg286ql40vtq`
- **pubkey**: `217ac0828c448c1e68c2e781df89884bcae16a1e79fe6df267863155ab789c02`
- **npub**: `npub1y9avpq5vgjxpu6xzu7qalzvgf09wz6s708lxmun8scc4t2mcnspqrmt40y`

This user is automatically created by the backend on first authentication.

## Shared Utilities

Both approaches share these helper files:

- `actions.ts` - Common UI actions (click sign in, select auth method, etc.)
- `assertions.ts` - Common assertions (expectUserLoggedIn, etc.)
- `fixtures.ts` - Test fixtures and utilities

## Architecture

### Mocked Auth Flow
```
window.nostr (fake) → Mock /auth/nostr → Mock GraphQL → Fake session
```

### Real Auth Flow
```
window.nostr (real signing) → Real /auth/nostr → Real GraphQL → Real backend session + user
```

## Troubleshooting

### Bundle not found error
If you see `ENOENT: no such file or directory, open '.../nostr-tools.bundle.js'`, run:
```bash
docker exec -ti geyser-app yarn workspace @geyser-app/testing build:nostr-bundle
```

### Authentication fails with real backend
- Ensure backend is running and accessible
- Check that TEST_NOSTR_USER credentials are correct
- Verify backend can create/authenticate test users

### Session not persisting
- Check that cookies are being set by backend
- Verify `credentials: 'include'` is set on auth requests
- Ensure baseURL in playwright.config.ts matches your backend URL
