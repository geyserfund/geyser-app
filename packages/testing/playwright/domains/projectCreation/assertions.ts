/** Project creation assertions for Playwright tests */

import { expect, Page } from '@playwright/test'

/** Verify landing page is loaded */
export const expectLandingPage = async (page: Page) => {
  await expect(page).toHaveURL(new RegExp(`${page.url().split('/')[0]}//${page.url().split('/')[2]}/?$`))
  // Check for common landing page elements
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible({ timeout: 10000 })
}

/** Verify launch start page is visible */
export const expectLaunchStartPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/launch\/start/)
  // CTA copy has moved to "Start your project" on launch-start page.
  await expect(page.getByRole('button', { name: /Start your project|Launch your project/i }).first()).toBeVisible({
    timeout: 10000,
  })
}

/** Verify project details form page is visible */
export const expectProjectDetailsPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/launch\/(new|\d+)\/details/)
  // Check for form title
  await expect(page.getByRole('heading', { name: /Project details/i })).toBeVisible({ timeout: 10000 })
  // Check for Continue button
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible()
}

/** Verify funding strategy selection page is visible */
export const expectFundingStrategyPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/launch\/\d+\/funding\/strategy/)
  // Check for funding strategy options
  await expect(page.getByText(/All-or-nothing|All-or-Nothing/i)).toBeVisible({ timeout: 10000 })
  await expect(page.getByText(/Open Funding|Open Fundraiser/i)).toBeVisible()
}

/** Verify AON funding goal form page is visible */
export const expectFundingGoalPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/launch\/\d+\/funding\/goal/)
  await expect(page.getByRole('heading', { name: /Funding Goal|Funding Goals/i })).toBeVisible({ timeout: 10000 })

  const hasLegacyGoalInputs = await page.getByTestId('donation-input').first().isVisible().catch(() => false)
  const hasGoalsModalEntry = await page.getByRole('button', { name: /Add a goal/i }).first().isVisible().catch(() => false)

  if (!hasLegacyGoalInputs && !hasGoalsModalEntry) {
    throw new Error(`Funding goal page did not render expected controls. Current URL: ${page.url()}`)
  }

  await expect(page.getByRole('button', { name: /Continue|Skip for now/i })).toBeVisible()
}

/** Verify project was created successfully */
export const expectProjectCreated = async (page: Page, projectName?: string) => {
  // Check URL contains a project ID (not 'new')
  const url = page.url()
  const projectIdMatch = url.match(/\/launch\/(\d+)/)
  if (!projectIdMatch || !projectIdMatch[1]) {
    throw new Error(`Expected project ID in URL, got: ${url}`)
  }

  expect(projectIdMatch[1]).not.toBe('new')

  // If project name provided, we could check GraphQL response or page content
  // For now, URL check is sufficient
}
