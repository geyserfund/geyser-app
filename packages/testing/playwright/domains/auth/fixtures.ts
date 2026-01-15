/** Authentication fixtures for Playwright tests */

import { test as base, Page } from '@playwright/test'
import { loginWithNostr } from './flows'
import { setupNostrAuthMocks } from './mocks'

/** Extended test with authenticated page fixture */
export const test = base.extend<{
  /** Page with authenticated user */
  authenticatedPage: Page
  /** Page without authentication (guest) */
  guestPage: Page
}>({
  /** Fixture that provides a page with authenticated user */
  authenticatedPage: async ({ page }, use) => {
    // Setup authentication before each test
    await setupNostrAuthMocks(page)
    await page.goto('/')
    await loginWithNostr(page)

    // Provide the authenticated page to the test
    await use(page)

    // Cleanup happens automatically when test ends
  },

  /** Fixture that provides a page without authentication */
  guestPage: async ({ page }, use) => {
    // Just provide a clean page without authentication
    await page.goto('/')
    await use(page)
  },
})

/** Export expect from base test for convenience */
export { expect } from '@playwright/test'
