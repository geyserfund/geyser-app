/** Composed authentication flows for Playwright tests */

import { Page } from '@playwright/test'

import { clickSignIn, clickSignOut, openUserMenu, selectNostrAuth } from './actions'

/** Options for login flow */
export type LoginOptions = {
  /** Whether to use mocked authentication (default: true) */
  useMocks?: boolean
}

/** Options for logout flow */
export type LogoutOptions = {
  /** Whether to use mocked authentication helpers (default: false) */
  useMocks?: boolean
}

/** Complete login flow with Nostr authentication */
export const loginWithNostr = async (page: Page, options: LoginOptions = {}) => {
  const { useMocks = true } = options

  // NOTE: Browser-level mocks (window.nostr, auth endpoints) should be set up
  // in test beforeEach BEFORE page.goto() so components can detect them during render

  // Click Sign In and wait for popup
  await clickSignIn(page)

  if (useMocks) {
    // NOW set up GraphQL mock to return logged-in user
    // This is done AFTER opening popup but BEFORE clicking Nostr
    // This timing ensures initial page load was naturally logged out
    const { mockGraphQLMe } = await import('./mocks')
    await mockGraphQLMe(page)
  }

  // Click Nostr button
  await selectNostrAuth(page)

  // Wait for authentication to complete
  await page.waitForResponse(
    (response) =>
      response.url().includes('/graphql') &&
      response.status() === 200 &&
      response.request().postDataJSON()?.operationName === 'Me',
    { timeout: 10000 },
  )

  // Small delay to ensure UI updates
  await page.waitForTimeout(1000)
}

/** 
 * Complete logout flow
 * 
 * NOTE: Logout does NOT query GraphQL like login does!
 * The logout() function in AuthContext:
 * - Clears local state (sets user.id = 0)
 * - Makes a fire-and-forget fetch to /logout endpoint
 * - UI updates naturally via useEffect watching user.id
 */
export const logout = async (page: Page, options: LogoutOptions = {}) => {
  const { useMocks = false } = options

  if (useMocks) {
    const { mockGraphQLMeLoggedOut } = await import('./mocks')
    await mockGraphQLMeLoggedOut(page)
  }

  const isLoggedOutUi = async () => {
    const signInButton = page.getByRole('button', { name: /^Sign in$/i }).first()
    const avatar = page.getByTestId('user-profile-avatar').first()
    const avatarLink = page.getByRole('link', { name: /avatar/i }).first()
    const myProjectsLink = page.getByRole('link', { name: /My projects/i }).first()

    const signInVisible = await signInButton.isVisible().catch(() => false)
    const avatarVisible = await avatar.isVisible().catch(() => false)
    const avatarLinkVisible = await avatarLink.isVisible().catch(() => false)
    const myProjectsVisible = await myProjectsLink.isVisible().catch(() => false)

    return signInVisible && !avatarVisible && !avatarLinkVisible && !myProjectsVisible
  }

  const waitForLoggedOutState = async (timeout = 8000) => {
    const timeoutAt = Date.now() + timeout

    while (Date.now() < timeoutAt) {
      if (await isLoggedOutUi()) {
        // Ensure logged-out state is stable and not a transient UI flip.
        await page.waitForTimeout(1200)
        if (await isLoggedOutUi()) {
          return true
        }
      }

      await page.waitForTimeout(250)
    }

    return false
  }

  const performLogoutAttempt = async () => {
    await openUserMenu(page)
    await clickSignOut(page)
  }

  // Perform logout actions
  await performLogoutAttempt()

  // Logout updates local auth state immediately; backend logout request can be fire-and-forget.
  if (await waitForLoggedOutState(8000)) {
    return
  }

  // Retry one more interactive sign out before route fallback for transient menu click misses.
  await performLogoutAttempt().catch(() => undefined)

  if (await waitForLoggedOutState(8000)) {
    return
  }

  // Fallback for environments where dedicated logout route can hang on loading:
  // clear browser session state directly, then reload to re-bootstrap logged-out UI.
  await page.context().clearCookies()
  await page.evaluate(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  if (!(await waitForLoggedOutState(15000))) {
    throw new Error(`Logout did not transition to a logged-out state at URL: ${page.url()}`)
  }
}
