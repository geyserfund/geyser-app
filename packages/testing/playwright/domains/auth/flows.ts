/** Composed authentication flows for Playwright tests */

import { Page } from '@playwright/test'

import { clickSignIn, clickSignOut, openUserMenu, selectNostrAuth } from './actions'
import { mockGraphQLMeLoggedOut, setupNostrAuthMocks } from './mocks'

/** Options for login flow */
export type LoginOptions = {
  /** Whether to use mocked authentication (default: true) */
  useMocks?: boolean
}

/** Complete login flow with Nostr authentication */
export const loginWithNostr = async (page: Page, options: LoginOptions = {}) => {
  const { useMocks = true } = options

  if (useMocks) {
    // Setup mocks before navigation
    await setupNostrAuthMocks(page)
  }

  // Perform login actions
  await clickSignIn(page)

  // Wait for auth popup to appear
  await page.getByText('Connect').waitFor({ state: 'visible', timeout: 5000 })

  await selectNostrAuth(page)

  // Wait for authentication to complete
  // Look for the GraphQL Me query response
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

/** Complete logout flow */
export const logout = async (page: Page) => {
  // Setup mock for logged out state
  await mockGraphQLMeLoggedOut(page)

  // Perform logout actions
  await openUserMenu(page)
  await clickSignOut(page)

  // Wait for logout to complete
  await page.waitForResponse(
    (response) =>
      response.url().includes('/graphql') &&
      response.status() === 200 &&
      response.request().postDataJSON()?.operationName === 'Me',
    { timeout: 10000 },
  )

  // Small delay to ensure UI updates
  await page.waitForTimeout(500)
}
