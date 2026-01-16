/**
 * Authentication E2E Tests
 *
 * Tests for login and logout functionality using Nostr authentication.
 *
 * This test suite uses mocked Nostr extension and GraphQL responses
 * to test the authentication flow without requiring a real Nostr extension.
 */

import { expect, test } from '@playwright/test'

import { clickSignIn } from '../../domains/auth/actions'
import { expectConnectPopup, expectUserLoggedIn, expectUserLoggedOut } from '../../domains/auth/assertions'
import { loginWithNostr, logout } from '../../domains/auth/flows'
import { setupNostrAuthMocks } from '../../domains/auth/mocks'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // CRITICAL: Set up browser-level mocks BEFORE page navigation
    // This ensures window.nostr exists when components render
    // Otherwise ConnectWithNostr will return null and button won't render
    await setupNostrAuthMocks(page)

    // Navigate to landing page after mocks are set up
    await page.goto('/')
  })

  test('should open login popup on landing page', async ({ page }) => {
    // Arrange & Act
    await clickSignIn(page)

    // Assert
    await expectConnectPopup(page)
  })

  test('should login with Nostr and logout', async ({ page }) => {
    // Act - Login
    await loginWithNostr(page)

    // Assert - User is logged in
    await expectUserLoggedIn(page)

    // Act - Logout
    await logout(page)

    // Assert - User is logged out
    await expectUserLoggedOut(page)
  })

  test('should maintain login state after navigation', async ({ page }) => {
    // Arrange - Login
    await loginWithNostr(page)
    await expectUserLoggedIn(page)

    // Act - Navigate to different pages
    await page.goto('/projects')

    // Assert - User should still be logged in
    await expectUserLoggedIn(page)
  })
})
