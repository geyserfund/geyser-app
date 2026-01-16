/** Composed authentication flows for Playwright tests */

import { Page } from '@playwright/test'

import { clickSignIn, clickSignOut, openUserMenu, selectNostrAuth } from './actions'

/** Options for login flow */
export type LoginOptions = {
  /** Whether to use mocked authentication (default: true) */
  useMocks?: boolean
}

/** Complete login flow with Nostr authentication */
export const loginWithNostr = async (page: Page, options: LoginOptions = {}) => {
  const { useMocks = true } = options

  // NOTE: Browser-level mocks (window.nostr, auth endpoints) should be set up
  // in test beforeEach BEFORE page.goto() so components can detect them during render

  // Click Sign In and wait for popup
  await clickSignIn(page)
  await page.getByText('Connect').waitFor({ state: 'visible', timeout: 5000 })

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
export const logout = async (page: Page) => {
  // Perform logout actions
  await openUserMenu(page)
  await clickSignOut(page)

  // Wait for logout endpoint to be called
  // This is a REST call, not GraphQL
  await page.waitForResponse(
    (response) => response.url().includes('/logout'),
    { timeout: 5000 },
  )

  // Small delay to ensure UI updates from local state changes
  await page.waitForTimeout(500)
}
