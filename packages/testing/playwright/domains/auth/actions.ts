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

/** Click the Sign Out button in the user menu */
export const clickSignOut = async (page: Page) => {
  await page.getByRole('button', { name: 'Sign Out' }).click()
}

/** Get the user dropdown button element */
export const getUserDropdown = (page: Page) => {
  return page.getByTestId('platform-dropdown-menu')
}

/** Check if user avatar is visible in dropdown (indicates logged in state) */
export const isUserAvatarVisible = async (page: Page): Promise<boolean> => {
  const dropdown = getUserDropdown(page)
  const avatar = dropdown.locator('img')

  try {
    await avatar.waitFor({ state: 'visible', timeout: 5000 })
    return true
  } catch {
    return false
  }
}
