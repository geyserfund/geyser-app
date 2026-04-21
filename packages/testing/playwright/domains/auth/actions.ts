/** Atomic authentication actions for Playwright tests */

import { Locator, Page } from '@playwright/test'

const SIGN_IN_LABEL = /^Sign in$/i
const SIGN_IN_WAIT_TIMEOUT_MS = 15000
const AUTH_POPUP_WAIT_TIMEOUT_MS = 5000

const isVisible = async (locator: Locator) => locator.isVisible().catch(() => false)

const isAuthPopupVisible = async (page: Page) => {
  const authDialog = page.getByRole('dialog').first()
  const nostrOption = page.getByRole('button', { name: /Nostr|Connect with Nostr/i }).first()

  if (await isVisible(authDialog)) {
    return true
  }

  return isVisible(nostrOption)
}

/** Click the Sign In button to open the authentication popup */
export const clickSignIn = async (page: Page) => {
  const signInButton = page.getByRole('button', { name: SIGN_IN_LABEL }).first()
  const profileMenuButton = page.getByTestId('platform-dropdown-menu').first()

  const clickAndWaitForPopup = async (locator: Locator) => {
    if (!(await isVisible(locator))) {
      return false
    }

    await locator.click({ force: true })

    const popupVisible = await Promise.race([
      page
        .getByRole('dialog')
        .first()
        .waitFor({ state: 'visible', timeout: AUTH_POPUP_WAIT_TIMEOUT_MS })
        .then(() => true)
        .catch(() => false),
      page
        .getByRole('button', { name: /Nostr|Connect with Nostr/i })
        .first()
        .waitFor({ state: 'visible', timeout: AUTH_POPUP_WAIT_TIMEOUT_MS })
        .then(() => true)
        .catch(() => false),
    ])

    return popupVisible || (await isAuthPopupVisible(page))
  }

  await page.waitForLoadState('domcontentloaded')
  await Promise.race([
    signInButton.waitFor({ state: 'visible', timeout: SIGN_IN_WAIT_TIMEOUT_MS }).catch(() => undefined),
    profileMenuButton.waitFor({ state: 'visible', timeout: SIGN_IN_WAIT_TIMEOUT_MS }).catch(() => undefined),
  ])

  if (await clickAndWaitForPopup(signInButton)) {
    return
  }

  const isProfileMenuVisible = await isVisible(profileMenuButton)

  if (isProfileMenuVisible) {
    await profileMenuButton.click()
    const signInMenuTrigger = page
      .getByRole('menuitem', { name: SIGN_IN_LABEL })
      .or(page.getByRole('button', { name: SIGN_IN_LABEL }))
      .or(page.getByRole('link', { name: SIGN_IN_LABEL }))
      .first()

    if (await clickAndWaitForPopup(signInMenuTrigger)) {
      return
    }
  }

  if (await clickAndWaitForPopup(signInButton)) {
    return
  }

  throw new Error(`Unable to find a visible Sign in trigger at URL: ${page.url()}`)
}

/** Select Nostr authentication method from the auth popup */
export const selectNostrAuth = async (page: Page) => {
  const nostrButton = page.getByRole('button', { name: /Nostr|Connect with Nostr/i }).first()
  await nostrButton.waitFor({ state: 'visible', timeout: 10000 })
  await nostrButton.click({ force: true })
}

/** Open the user dropdown menu */
export const openUserMenu = async (page: Page) => {
  const dropdown = page.getByTestId('platform-dropdown-menu')
  await dropdown.click()
}

/** Click the Sign Out menu item in the user menu */
export const clickSignOut = async (page: Page) => {
  const signOutMenuItem = page
    .getByRole('menuitem', { name: /^Sign Out$/i })
    .or(page.getByRole('button', { name: /^Sign Out$/i }))
    .or(page.getByRole('link', { name: /^Sign Out$/i }))
    .first()
  await signOutMenuItem.waitFor({ state: 'visible', timeout: 10000 })
  await signOutMenuItem.scrollIntoViewIfNeeded()
  await signOutMenuItem.click({ force: true })
}

/** Get the user profile avatar element (visible only when logged in) */
export const getUserAvatar = (page: Page) => {
  return page.getByTestId('user-profile-avatar')
}

/** Get the Sign In button element (visible only when logged out) */
export const getSignInButton = (page: Page) => {
  return page.getByRole('button', { name: SIGN_IN_LABEL }).first()
}
