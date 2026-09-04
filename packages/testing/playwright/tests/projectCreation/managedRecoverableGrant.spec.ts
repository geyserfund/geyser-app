/** Managed Recoverable Grant project-creation flow */

import { expect, test } from '@playwright/test'

import { loginWithRealNostr, setupRealAuth } from '../../domains/auth/realAuth'
import { expectFundingStrategyPage, expectProjectDetailsPage } from '../../domains/projectCreation/assertions'
import { DEFAULT_PROJECT_DETAILS, TEST_IMAGE_PATHS } from '../../domains/projectCreation/constants'
import { completeProjectDetails, navigateToProjectCreation } from '../../domains/projectCreation/flows'
import { checkLiveBackendAvailability } from '../../domains/shared/backend'

test.describe('Managed Recoverable Grant Project Creation', () => {
  test.setTimeout(120000)

  test.beforeEach(async ({ page }) => {
    const backend = await checkLiveBackendAvailability(page.request, { requireAuth: true })
    test.skip(!backend.ok, `Skipping project-creation tests: ${backend.reason}`)

    await setupRealAuth(page)
    await page.goto('/')
    await loginWithRealNostr(page)
  })

  test('offers only Recoverable Grant as the creation funding option', async ({ page }) => {
    await navigateToProjectCreation(page)
    await expectProjectDetailsPage(page)

    const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1000)}`
    await completeProjectDetails(page, {
      ...DEFAULT_PROJECT_DETAILS,
      name: `test-managed-grant-${uniqueSuffix}`,
      thumbnailImage: TEST_IMAGE_PATHS.thumbnail,
      headerImages: [TEST_IMAGE_PATHS.header],
    })

    await expectFundingStrategyPage(page)
    await expect(page.getByRole('heading', { name: 'Recoverable Grant' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Open Funding' })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'All-or-Nothing' })).toHaveCount(0)
  })

  test('does not submit the creation form with missing project details', async ({ page }) => {
    await navigateToProjectCreation(page)
    await expectProjectDetailsPage(page)

    await page.getByRole('button', { name: 'Continue' }).first().click()
    await expectProjectDetailsPage(page)
  })
})
