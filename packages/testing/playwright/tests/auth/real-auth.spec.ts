/**
 * Real Authentication E2E Tests
 *
 * These tests use REAL Nostr signing and backend authentication.
 * Unlike login-logout.spec.ts (which uses mocks), these tests:
 * - Sign events cryptographically with nostr-tools
 * - Hit real backend /auth/nostr endpoints
 * - Establish actual backend sessions
 * - Create/retrieve real user accounts
 */

import { expect, test } from '@playwright/test'

import { expectUserLoggedIn, expectUserLoggedOut } from '../../domains/auth/assertions'
import { logout } from '../../domains/auth/flows'
import { loginWithRealNostr, setupRealAuth } from '../../domains/auth/realAuth'

test.describe('Real Authentication (No Mocks)', () => {
  test.beforeEach(async ({ page }) => {
    // Setup real Nostr extension BEFORE navigation
    await setupRealAuth(page)

    // Navigate to app
    await page.goto('/')
  })

  test('should login with real Nostr signing and backend session', async ({ page }) => {
    // Perform real login
    await loginWithRealNostr(page)

    // Verify user is logged in (checks avatar visibility and Sign In button hidden)
    await expectUserLoggedIn(page)

    // Additional verification: check that dropdown menu is accessible
    const dropdownMenu = page.getByTestId('platform-dropdown-menu')
    await expect(dropdownMenu).toBeVisible()
  })

  test('should maintain session across page navigation', async ({ page }) => {
    // Login with real backend
    await loginWithRealNostr(page)
    await expectUserLoggedIn(page)

    // Navigate to projects page
    await page.goto('/projects')

    // Session should persist (real cookie-based auth)
    await expectUserLoggedIn(page)
  })

  test('should logout and clear backend session', async ({ page }) => {
    // Login
    await loginWithRealNostr(page)
    await expectUserLoggedIn(page)

    // Logout
    await logout(page)

    // Verify logged out
    await expectUserLoggedOut(page)

    // Verify session cleared by attempting to access projects
    await page.goto('/projects')
    await expectUserLoggedOut(page)
  })
})
