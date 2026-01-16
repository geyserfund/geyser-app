/** Authentication assertions for Playwright tests */

import { expect, Page } from '@playwright/test'

import { getSignInButton, getUserAvatar } from './actions'

/** Verify that the Connect authentication popup is visible */
export const expectConnectPopup = async (page: Page) => {
  await expect(page.getByText('Connect')).toBeVisible()
}

/**
 * Verify that the user is logged in
 * Dual-check approach: ProfileAvatar is visible AND Sign In button is NOT visible
 */
export const expectUserLoggedIn = async (page: Page) => {
  const avatar = getUserAvatar(page)
  const signInButton = getSignInButton(page)

  // Check that avatar is visible
  await expect(avatar).toBeVisible({ timeout: 10000 })

  // Check that Sign In button is NOT visible
  await expect(signInButton).not.toBeVisible()
}

/**
 * Verify that the user is logged out
 * Dual-check approach: Sign In button is visible AND ProfileAvatar is NOT visible
 */
export const expectUserLoggedOut = async (page: Page) => {
  const avatar = getUserAvatar(page)
  const signInButton = getSignInButton(page)

  // Check that Sign In button is visible
  await expect(signInButton).toBeVisible({ timeout: 10000 })

  // Check that avatar is NOT visible
  await expect(avatar).not.toBeVisible()
}

/** Verify that Sign In button is visible */
export const expectSignInButton = async (page: Page) => {
  await expect(getSignInButton(page)).toBeVisible()
}
