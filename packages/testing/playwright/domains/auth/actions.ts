/** Atomic authentication actions for Playwright tests */

import { Page } from '@playwright/test'

/** Click the Sign In button to open the authentication popup */
export const clickSignIn = async (page: Page) => {
  // Wait for page to be fully loaded before clicking
  const signInButton = page.getByRole('button', { name: 'Sign in' })
  await signInButton.waitFor({ state: 'visible', timeout: 10000 })
  await signInButton.click()
}

/** Select Nostr authentication method from the auth popup */
export const selectNostrAuth = async (page: Page) => {
  await page.getByRole('button', { name: 'Nostr' }).click()
}

/** Open the user dropdown menu */
export const openUserMenu = async (page: Page) => {
  const dropdown = page.getByTestId('platform-dropdown-menu')
  await dropdown.click()
}

/** Click the Sign Out menu item in the user menu */
export const clickSignOut = async (page: Page) => {
  // Sign Out is rendered as a MenuItem (role="menuitem"), not a button
  await page.getByRole('menuitem', { name: 'Sign Out' }).click()
}

/** Get the user profile avatar element (visible only when logged in) */
export const getUserAvatar = (page: Page) => {
  return page.getByTestId('user-profile-avatar')
}

/** Get the Sign In button element (visible only when logged out) */
export const getSignInButton = (page: Page) => {
  return page.getByRole('button', { name: 'Sign in' })
}
