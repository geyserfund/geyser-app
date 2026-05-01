/** Funding error handling tests via deterministic GraphQL interception */

import { expect, Page, test } from '@playwright/test'

import {
  clickAddReward,
  clickContinueFromDetails,
  clickContinueFromInit,
  clickContribute,
  clickToggleDonationInput,
  enterComment,
  enterDonationAmount,
  enterEmail,
} from '../../domains/funding/actions'
import { expectCommentScreen, expectFundingAmountScreen } from '../../domains/funding/assertions'
import { ONCHAIN_AMOUNT, PRISM_PROJECT_NAME, TEST_COMMENT, TEST_EMAIL } from '../../domains/funding/constants'
import { checkLiveBackendAvailability } from '../../domains/shared/backend'
import { ApolloErrors } from '../../domains/shared/constants'

type ContributionCreateErrorExtension = {
  code: ApolloErrors
  maxAmount?: number
  minAmount?: number
}

const interceptContributionCreateWithError = async (page: Page, extension: ContributionCreateErrorExtension) => {
  await page.route('**/graphql', async (route) => {
    const requestBody = route.request().postDataJSON()

    if (requestBody?.operationName === 'ContributionCreate') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: null,
          errors: [
            {
              extensions: extension,
            },
          ],
        }),
      })
      return
    }

    await route.continue()
  })
}

const goToFundingCommentStepForDonation = async (page: Page) => {
  await clickContribute(page)
  await expectFundingAmountScreen(page)

  await clickToggleDonationInput(page)
  await enterDonationAmount(page, ONCHAIN_AMOUNT)
  await clickContinueFromInit(page)

  await expectCommentScreen(page)
}

const submitFundingComment = async (page: Page) => {
  await enterComment(page, TEST_COMMENT)
  await clickContinueFromDetails(page)
}

const expectFundingErrorHeading = async (page: Page, heading: RegExp) => {
  await expect(page.getByRole('heading', { name: heading })).toBeVisible({ timeout: 15000 })
  await expect(page.getByRole('link', { name: 'Back to project' })).toBeVisible()
}

test.describe('Funding Error Handling', () => {
  test.describe.configure({ mode: 'serial' })
  test.setTimeout(120000)

  test.beforeEach(async ({ page }) => {
    const backend = await checkLiveBackendAvailability(page.request)
    test.skip(!backend.ok, `Skipping funding tests: ${backend.reason}`)

    await page.goto(`/project/${PRISM_PROJECT_NAME}`)
  })

  test('shows wallet max limit error page', async ({ page }) => {
    await goToFundingCommentStepForDonation(page)
    await interceptContributionCreateWithError(page, {
      code: ApolloErrors.INVALID_FUNDING_AMOUNT,
      maxAmount: 50000,
    })

    await submitFundingComment(page)

    await expectFundingErrorHeading(page, /Above Maximum Limit/i)
  })

  test('shows wallet min limit error page', async ({ page }) => {
    await goToFundingCommentStepForDonation(page)
    await interceptContributionCreateWithError(page, {
      code: ApolloErrors.INVALID_FUNDING_AMOUNT,
      minAmount: 80000,
    })

    await submitFundingComment(page)

    await expectFundingErrorHeading(page, /Below Minimum Limit/i)
  })

  test('shows wallet unreachable error page', async ({ page }) => {
    await goToFundingCommentStepForDonation(page)
    await interceptContributionCreateWithError(page, {
      code: ApolloErrors.WALLET_UNREACHABLE,
    })

    await submitFundingComment(page)

    await expectFundingErrorHeading(page, /Wallet Unreachable/i)
  })

  test('shows inactive project error page', async ({ page }) => {
    await goToFundingCommentStepForDonation(page)
    await interceptContributionCreateWithError(page, {
      code: ApolloErrors.NON_ACTIVE_PROJECT,
    })

    await submitFundingComment(page)

    await expectFundingErrorHeading(page, /Inactive Project/i)
  })

  test('shows reward out of stock error page', async ({ page }) => {
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    const firstBuyButton = page.getByRole('button', { name: 'Buy' }).first()
    test.skip(
      !(await firstBuyButton.isVisible().catch(() => false)),
      `Skipping: ${PRISM_PROJECT_NAME} has no visible products/rewards to test the out-of-stock error.`,
    )

    await clickToggleDonationInput(page)
    await clickAddReward(page, 0)
    await clickContinueFromInit(page)

    await expectCommentScreen(page)
    await enterComment(page, TEST_COMMENT)
    await enterEmail(page, TEST_EMAIL)

    await interceptContributionCreateWithError(page, {
      code: ApolloErrors.REWARD_OUT_OF_STOCK,
    })

    await clickContinueFromDetails(page)

    await expectFundingErrorHeading(page, /Products Out of Stock/i)
  })

  test('shows generic error page for internal server errors', async ({ page }) => {
    await goToFundingCommentStepForDonation(page)
    await interceptContributionCreateWithError(page, {
      code: ApolloErrors.INTERNAL_SERVER_ERROR,
    })

    await submitFundingComment(page)

    await expectFundingErrorHeading(page, /An Error Occured/i)
  })
})
