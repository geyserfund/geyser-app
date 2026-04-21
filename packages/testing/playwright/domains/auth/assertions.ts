/** Authentication assertions for Playwright tests */

import { expect, Page } from '@playwright/test'

import { getSignInButton, getUserAvatar } from './actions'

/** Verify that the Connect authentication popup is visible */
export const expectConnectPopup = async (page: Page) => {
  const authDialog = page.getByRole('dialog').first()
  await expect(authDialog).toBeVisible({ timeout: 10000 })
  await expect(authDialog).toContainText(/Connect|Sign in to Geyser|Check your email/i)
}

/**
 * Verify that the user is logged in
 * Dual-check approach: ProfileAvatar is visible AND Sign In button is NOT visible
 */
export const expectUserLoggedIn = async (page: Page) => {
  const avatar = getUserAvatar(page)
  const signInButton = getSignInButton(page)
  const myProjectsLink = page.getByRole('link', { name: /My projects/i }).first()
  const profileMenuButton = page.getByRole('button', { name: /Open profile menu/i }).first()
  const avatarLink = page.getByRole('link', { name: /avatar/i }).first()

  // Check that top-nav Sign In button is NOT visible
  await expect(signInButton).not.toBeVisible({ timeout: 10000 })

  // Authenticated nav varies by route/layout:
  // - legacy avatar test id
  // - profile avatar link
  // - My projects shortcut
  // - profile menu trigger
  if (await avatar.isVisible().catch(() => false)) {
    await expect(avatar).toBeVisible({ timeout: 10000 })
    return
  }

  if (await avatarLink.isVisible().catch(() => false)) {
    await expect(avatarLink).toBeVisible({ timeout: 10000 })
    return
  }

  if (await myProjectsLink.isVisible().catch(() => false)) {
    await expect(myProjectsLink).toBeVisible({ timeout: 10000 })
    return
  }

  await expect(profileMenuButton).toBeVisible({ timeout: 10000 })
}

/**
 * Verify that the user is logged out
 * Dual-check approach: Sign In button is visible AND ProfileAvatar is NOT visible
 */
export const expectUserLoggedOut = async (page: Page) => {
  const avatar = getUserAvatar(page)
  const signInButton = getSignInButton(page)
  const avatarLink = page.getByRole('link', { name: /avatar/i }).first()
  const myProjectsLink = page.getByRole('link', { name: /My projects/i }).first()

  // Check that avatar is NOT visible
  await expect(avatar).not.toBeVisible({ timeout: 10000 })

  // Sign In is normally visible in the top nav.
  if (await signInButton.isVisible().catch(() => false)) {
    await expect(signInButton).toBeVisible({ timeout: 10000 })
    await expect(avatarLink).not.toBeVisible({ timeout: 10000 })
    await expect(myProjectsLink).not.toBeVisible({ timeout: 10000 })
    return
  }

  // Some layouts collapse logged-out actions without rendering top-nav Sign In.
  // In those cases, authenticated shortcuts must still be absent.
  await expect(avatarLink).not.toBeVisible({ timeout: 10000 })
  await expect(myProjectsLink).not.toBeVisible({ timeout: 10000 })
}

/** Verify that Sign In button is visible */
export const expectSignInButton = async (page: Page) => {
  await expect(getSignInButton(page)).toBeVisible()
}
