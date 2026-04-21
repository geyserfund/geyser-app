/** AON (All-or-Nothing) project creation tests */

import { expectUserLoggedIn } from '../../domains/auth/assertions'
import { loginWithRealNostr, setupRealAuth } from '../../domains/auth/realAuth'
import { fillAONGoalAmount, fillAONGoalDuration } from '../../domains/projectCreation/actions'
import {
  expectFundingGoalPage,
  expectFundingStrategyPage,
  expectProjectCreated,
  expectProjectDetailsPage,
} from '../../domains/projectCreation/assertions'
import { DEFAULT_AON_GOAL, DEFAULT_PROJECT_DETAILS, TEST_IMAGE_PATHS } from '../../domains/projectCreation/constants'
import { expect, test } from '../../domains/projectCreation/fixtures'
import { checkLiveBackendAvailability } from '../../domains/shared/backend'
import {
  completeProjectDetails,
  navigateToProjectCreation,
  selectAONStrategy,
  setAONGoal,
} from '../../domains/projectCreation/flows'
import { AONGoalOptions, ProjectDetailsOptions } from '../../domains/projectCreation/types'

test.describe.configure({ mode: 'serial' })
test.setTimeout(240000)

test.describe('AON Project Creation - Fixture', () => {
  test('should create AON project with minimal required fields using fixture', async ({ page, aonProject }) => {
    // The fixture already creates the project, so we just verify it was created
    expect(aonProject.projectId).toBeTruthy()
    expect(aonProject.projectName).toBeTruthy()

    // Verify we're on the rewards page (next step after goal)
    await expect(page).toHaveURL(/\/launch\/\d+\/rewards/)
  })
})

test.describe('AON Project Creation - Flow', () => {
  test.beforeEach(async ({ page }) => {
    const backend = await checkLiveBackendAvailability(page.request, { requireAuth: true })
    test.skip(!backend.ok, `Skipping project-creation tests: ${backend.reason}`)

    await setupRealAuth(page)
    await page.goto('/')
    await loginWithRealNostr(page)
    await expectUserLoggedIn(page)
  })

  test('should create AON project step by step', async ({ page }) => {
    // Step 1: Navigate to project creation
    await navigateToProjectCreation(page)
    await expectProjectDetailsPage(page)

    // Step 2: Complete project details
    const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const projectDetails: ProjectDetailsOptions = {
      ...DEFAULT_PROJECT_DETAILS,
      name: `test-aon-step-${uniqueSuffix}`,
      thumbnailImage: TEST_IMAGE_PATHS.thumbnail,
      headerImages: [TEST_IMAGE_PATHS.header],
    }
    await completeProjectDetails(page, projectDetails)
    await expectFundingStrategyPage(page)

    // Step 3: Select AON strategy
    await selectAONStrategy(page)
    await expectFundingGoalPage(page)

    // Step 4: Set AON goal
    const goal: AONGoalOptions = DEFAULT_AON_GOAL
    await setAONGoal(page, goal)

    // Verify project was created and rewards page is visible
    await expectProjectCreated(page, projectDetails.name)
    await expect(page.getByRole('button', { name: 'Create product' })).toBeVisible()
  })

  test('should validate required fields on project details form', async ({ page }) => {
    // Navigate to project creation
    await navigateToProjectCreation(page)
    await expectProjectDetailsPage(page)

    // Try to submit without filling required fields
    const continueButton = page.getByRole('button', { name: 'Continue' }).first()
    await continueButton.click()

    // Form should not submit when required fields are missing.
    await expectProjectDetailsPage(page)
  })

  test('should validate AON funding goal constraints', async ({ page }) => {
    // Navigate through details to reach funding goal
    const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const projectDetails: ProjectDetailsOptions = {
      ...DEFAULT_PROJECT_DETAILS,
      name: `test-aon-validation-${uniqueSuffix}`,
      thumbnailImage: TEST_IMAGE_PATHS.thumbnail,
      headerImages: [TEST_IMAGE_PATHS.header],
    }

    await navigateToProjectCreation(page)
    await expectProjectDetailsPage(page)
    await completeProjectDetails(page, projectDetails)
    await selectAONStrategy(page)
    await expectFundingGoalPage(page)

    const addGoalButton = page.getByRole('button', { name: /Add a goal/i }).first()
    const hasGoalsModalFlow = await addGoalButton.isVisible().catch(() => false)

    if (hasGoalsModalFlow) {
      // New flow: confirm button stays disabled until required fields are valid.
      await addGoalButton.click()
      const goalModal = page.getByRole('dialog').filter({ hasText: /Create goal|Edit goal/i }).first()
      await expect(goalModal).toBeVisible()
      await expect(goalModal.getByRole('button', { name: /Confirm/i })).toBeDisabled()
      await goalModal.getByLabel(/goal-add-edit-close/i).click()
      await expect(goalModal).toBeHidden()
    } else {
      // Legacy flow: invalid values should keep user on funding goal step.
      await fillAONGoalAmount(page, 200000)
      await fillAONGoalDuration(page, 0)
      await page.getByRole('button', { name: 'Continue' }).click()
    }

    await expectFundingGoalPage(page)
  })
})
