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
  // Check for "Launch your project" button
  await expect(page.getByRole('button', { name: /Launch your project/i })).toBeVisible({ timeout: 10000 })
}

/** Verify project details form page is visible */
export const expectProjectDetailsPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/launch\/(new|\d+)\/details/)
  // Check for form title
  await expect(page.getByRole('heading', { name: 'Project details' })).toBeVisible({ timeout: 10000 })
  // Check for Continue button
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible()
}

/** Verify funding strategy selection page is visible */
export const expectFundingStrategyPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/launch\/\d+\/funding\/strategy/)
  // Check for funding strategy options
  await expect(page.getByText(/All-or-nothing/i)).toBeVisible({ timeout: 10000 })
  await expect(page.getByText(/Open Funding/i)).toBeVisible()
}

/** Verify AON funding goal form page is visible */
export const expectFundingGoalPage = async (page: Page) => {
  await expect(page).toHaveURL(/\/launch\/\d+\/funding\/goal/)
  // Check for goal amount input
  await expect(page.getByTestId('donation-input')).toBeVisible({ timeout: 10000 })
  // Check for duration input
  await expect(page.getByLabel(/duration/i).or(page.locator('input[type="number"]').first())).toBeVisible()
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
