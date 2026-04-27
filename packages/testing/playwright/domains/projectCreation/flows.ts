/** Composed project creation flows for Playwright tests */
/* eslint-disable no-await-in-loop */

import { Page } from '@playwright/test'

import {
  clickContinueFromFundingGoal,
  clickContinueFromFundingStrategy,
  clickContinueFromProjectDetails,
  clickLaunchProjectButton,
  fillAONGoalAmount,
  fillAONGoalDuration,
  fillDescription,
  fillProjectName,
  fillProjectTitle,
  fillShortDescription,
  navigateToLaunchStart,
  selectAONFundingStrategy,
  selectCategory,
  selectLocation,
  selectSubCategory,
  setAONLaunchDate,
  uploadHeaderImage,
  uploadThumbnailImage,
} from './actions'
import {
  expectFundingGoalPage,
  expectFundingStrategyPage,
  expectLaunchStartPage,
  expectProjectDetailsPage,
} from './assertions'
import { updateProjectAonGoalViaGraphql, updateProjectFundingStrategyViaGraphql } from './backend'
import { AONGoalOptions, ProjectDetailsOptions } from './types'

const waitForAONFundingGoalForm = async (page: Page) => {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const amountInput = page.getByTestId('donation-input').first()
    const durationInput = page.locator('input[type="number"][max="60"]').first()
    const hasAmountInput = await amountInput.isVisible().catch(() => false)
    const hasDurationInput = await durationInput.isVisible().catch(() => false)

    if (hasAmountInput && hasDurationInput) {
      return
    }

    const hasGenericGoalModalFlow = await page
      .getByRole('button', { name: /Add a goal/i })
      .first()
      .isVisible()
      .catch(() => false)

    if (hasGenericGoalModalFlow) {
      await page.reload({ waitUntil: 'domcontentloaded' })
      await page.waitForURL(/\/launch\/\d+\/funding\/goal/, { timeout: 15000 })
      await page.waitForTimeout(1000)
      continue
    }

    await page.waitForTimeout(1000)
  }

  const hasGenericGoalModalFlow = await page
    .getByRole('button', { name: /Add a goal/i })
    .first()
    .isVisible()
    .catch(() => false)

  if (hasGenericGoalModalFlow) {
    return
  }

  throw new Error(`Funding goal step did not render expected controls. Current URL: ${page.url()}`)
}

const forceAONFundingStrategyAndReloadGoalStep = async (page: Page) => {
  const projectIdMatch = page.url().match(/\/launch\/(\d+)\/funding\/goal/)
  const projectId = projectIdMatch ? projectIdMatch[1] : ''

  if (!projectId) {
    throw new Error(`Unable to extract project ID from funding goal URL: ${page.url()}`)
  }

  await updateProjectFundingStrategyViaGraphql(page.request, {
    projectId,
    fundingStrategy: 'ALL_OR_NOTHING',
  })
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForURL(/\/launch\/\d+\/funding\/goal/, { timeout: 15000 })
}

/** Navigate from landing page to project details page */
export const navigateToProjectCreation = async (page: Page) => {
  await navigateToLaunchStart(page)
  await expectLaunchStartPage(page)
  await clickLaunchProjectButton(page)

  await expectProjectDetailsPage(page)
}

/** Complete entire project details form */
export const completeProjectDetails = async (page: Page, options: ProjectDetailsOptions) => {
  // Fill all form fields
  await fillProjectTitle(page, options.title)
  await fillProjectName(page, options.name)
  await fillShortDescription(page, options.shortDescription)
  await fillDescription(page, options.description)

  // Select category and subcategory using their labels
  await selectCategory(page, options.category)
  await selectSubCategory(page, options.subCategory)
  await selectLocation(page, options.location)

  // Upload images
  await uploadThumbnailImage(page, options.thumbnailImage)

  // Upload header images (at least one required)
  if (options.headerImages.length > 0) {
    const [firstImage, ...restImages] = options.headerImages
    await uploadHeaderImage(page, firstImage)
    // If multiple header images, upload them sequentially
    await restImages.reduce((previous, image) => previous.then(() => uploadHeaderImage(page, image)), Promise.resolve())
  }

  // Submit form
  await clickContinueFromProjectDetails(page)

  // Wait for navigation to funding strategy page
  await expectFundingStrategyPage(page)
}

/** Select All-or-Nothing funding strategy */
export const selectAONStrategy = async (page: Page) => {
  await selectAONFundingStrategy(page)
  await clickContinueFromFundingStrategy(page)

  // Wait for navigation to funding goal page
  await expectFundingGoalPage(page)
  await forceAONFundingStrategyAndReloadGoalStep(page)
  await waitForAONFundingGoalForm(page)
}

/** Set AON funding goal */
export const setAONGoal = async (page: Page, options: AONGoalOptions) => {
  const projectIdMatch = page.url().match(/\/launch\/(\d+)\/funding\/goal/)
  const projectId = projectIdMatch ? projectIdMatch[1] : ''
  const hasLegacyAmountInput = await page
    .getByTestId('donation-input')
    .first()
    .isVisible()
    .catch(() => false)
  const hasLegacyDurationInput = await page
    .locator('input[type="number"][max="60"]')
    .first()
    .isVisible()
    .catch(() => false)

  if (!hasLegacyAmountInput || !hasLegacyDurationInput) {
    if (!projectId) {
      throw new Error(`Unable to extract project ID from funding goal URL: ${page.url()}`)
    }

    await updateProjectAonGoalViaGraphql(page.request, {
      projectId,
      amountSats: options.amountSats,
      duration: options.duration,
    })
    await page.goto(`/launch/${projectId}/rewards`, { waitUntil: 'domcontentloaded' })
    await page.waitForURL(/\/launch\/\d+\/rewards/, { timeout: 20000 })
    return
  }

  await fillAONGoalAmount(page, options.amountSats)
  await fillAONGoalDuration(page, options.duration)

  // Optional launch date
  if (options.launchDate) {
    await setAONLaunchDate(page, options.launchDate)
  }

  // Submit form
  await clickContinueFromFundingGoal(page)
}

/** Complete full minimal AON project creation flow
 *
 * NOTE: Authentication must be done separately before calling this function.
 * Use setupRealAuth and loginWithRealNostr from domains/auth/realAuth.ts
 */
export const createAONProject = async (
  page: Page,
  projectDetails: ProjectDetailsOptions,
  goal: AONGoalOptions,
): Promise<{ projectId: string; projectName: string }> => {
  // Navigate to project creation
  await navigateToProjectCreation(page)

  // Complete project details
  await completeProjectDetails(page, projectDetails)

  // Select AON strategy
  await selectAONStrategy(page)

  // Set AON goal
  await setAONGoal(page, goal)

  // Extract project ID from URL
  const url = page.url()
  const projectIdMatch = url.match(/\/launch\/(\d+)/)
  const projectId = projectIdMatch ? projectIdMatch[1] : ''

  if (!projectId) {
    throw new Error('Failed to extract project ID from URL after creation')
  }

  return {
    projectId,
    projectName: projectDetails.name,
  }
}
