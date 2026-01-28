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
import {
  completeProjectDetails,
  navigateToProjectCreation,
  selectAONStrategy,
  setAONGoal,
} from '../../domains/projectCreation/flows'
import { AONGoalOptions, ProjectDetailsOptions } from '../../domains/projectCreation/types'

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

    // Should show validation errors (form should not submit)
    await expect(page.getByText('Title is a required field.')).toBeVisible()
    await expect(page.getByText('Project name is a required field.')).toBeVisible()
    await expect(page.getByText('Project objective is a required field.')).toBeVisible()

    // Verify we're still on the same page (form didn't submit)
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

    // Enter invalid values and submit
    await fillAONGoalAmount(page, 200000)
    await fillAONGoalDuration(page, 0)
    await page.getByRole('button', { name: 'Continue' }).click()

    // Should show validation errors and remain on goal page
    await expect(page.getByText('Goal must be at least 210,000 sats')).toBeVisible()
    await expect(page.getByText('Duration must be at least 1 day')).toBeVisible()
    await expectFundingGoalPage(page)
  })
})
