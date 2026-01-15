/** Authentication assertions for Playwright tests */

import { expect, Page } from '@playwright/test'
import { getUserDropdown } from './actions'

/** Verify that the Connect authentication popup is visible */
export const expectConnectPopup = async (page: Page) => {
  await expect(page.getByText('Connect')).toBeVisible()
}

/** Verify that the user is logged in (avatar is visible) */
export const expectUserLoggedIn = async (page: Page) => {
  const dropdown = getUserDropdown(page)
  const avatar = dropdown.locator('img')
  
  await expect(avatar).toBeVisible({ timeout: 10000 })
}

/** Verify that the user is logged out (avatar is not visible) */
export const expectUserLoggedOut = async (page: Page) => {
  const dropdown = getUserDropdown(page)
  const avatar = dropdown.locator('img')
  
  await expect(avatar).not.toBeVisible()
}

/** Verify that Sign In button is visible */
export const expectSignInButton = async (page: Page) => {
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
}
