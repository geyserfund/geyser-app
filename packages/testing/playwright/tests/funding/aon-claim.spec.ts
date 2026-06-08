/** Full AON funding and creator claim flow */

import { BrowserContext, expect, test } from '@playwright/test'

import { loginWithRealNostr, setupRealAuth } from '../../domains/auth/realAuth'
import { clickContribute } from '../../domains/funding/actions'
import { expectFundingAmountScreen } from '../../domains/funding/assertions'
import { TEST_COMMENT } from '../../domains/funding/constants'
import { completeFundingDetails, completeFundingInitWithDonation } from '../../domains/funding/flows'
import { completeAonOnchainPayout, openAonClaimModal, waitForAonClaimReady } from '../../domains/funding/payout'
import { settleVisibleBitcoinPaymentAndConfirm } from '../../domains/funding/settlement'
import { acceptProjectReviewViaJwt } from '../../domains/projectCreation/backend'
import { DEFAULT_PROJECT_DETAILS, MIN_AON_GOAL_AMOUNT, TEST_IMAGE_PATHS } from '../../domains/projectCreation/constants'
import { createAONProject } from '../../domains/projectCreation/flows'
import {
  continueFromAcceptedReview,
  continueFromRewardsToLaunchReview,
  payLaunchFeeAndReachPublishStep,
  publishProjectAndAssertLive,
  submitProjectForReviewInUi,
} from '../../domains/projectCreation/launchFlow'
import { checkLiveBackendAvailability } from '../../domains/shared/backend'
import { ENV } from '../../domains/shared/constants'

test.describe('AON Full Funding and Creator Claim', () => {
  test.describe.configure({ mode: 'serial' })
  test.setTimeout(720000)

  test.beforeEach(async ({ page }) => {
    const backend = await checkLiveBackendAvailability(page.request, { requireAuth: true })
    test.skip(!backend.ok, `Skipping AON claim test: ${backend.reason}`)
    test.skip(
      !ENV.PROJECT_REVIEW_SUBMIT_JWT,
      'Skipping AON claim test: PROJECT_REVIEW_SUBMIT_JWT is required for backend review acceptance.',
    )
    test.skip(
      !ENV.PROJECT_CREATION_ACCOUNT_PASSWORD,
      'Skipping AON claim test: PROJECT_CREATION_ACCOUNT_PASSWORD is required for creator payout.',
    )

    await setupRealAuth(page)
    await page.goto('/')
    await loginWithRealNostr(page)
  })

  test('should create, fully fund, and claim an AON project as creator', async ({ browser, page }) => {
    const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const projectDetails = {
      ...DEFAULT_PROJECT_DETAILS,
      name: `test-aon-claim-${uniqueSuffix}`,
      thumbnailImage: TEST_IMAGE_PATHS.thumbnail,
      headerImages: [TEST_IMAGE_PATHS.header],
    }
    const goal = {
      amountSats: MIN_AON_GOAL_AMOUNT,
      duration: 1,
    }

    const createdProject = await createAONProject(page, projectDetails, goal)

    await continueFromRewardsToLaunchReview(page, {
      accountPassword: ENV.PROJECT_CREATION_ACCOUNT_PASSWORD,
    })
    await submitProjectForReviewInUi(page)
    await acceptProjectReviewViaJwt(page.request, {
      projectId: createdProject.projectId,
      reviewSubmitJwt: ENV.PROJECT_REVIEW_SUBMIT_JWT,
    })
    await continueFromAcceptedReview(page)
    await payLaunchFeeAndReachPublishStep(page, {
      accountPassword: ENV.PROJECT_CREATION_ACCOUNT_PASSWORD,
    })
    await publishProjectAndAssertLive(page, createdProject.projectName)

    let fundingContext: BrowserContext | null = null

    try {
      fundingContext = await browser.newContext({
        acceptDownloads: true,
        baseURL: ENV.APP_URL,
        ignoreHTTPSErrors: true,
      })
      const fundingPage = await fundingContext.newPage()

      await fundingPage.goto(`/project/${createdProject.projectName}`)
      await clickContribute(fundingPage)
      await expectFundingAmountScreen(fundingPage)
      await completeFundingInitWithDonation(fundingPage, goal.amountSats)
      await completeFundingDetails(fundingPage, { comment: TEST_COMMENT })
      await settleVisibleBitcoinPaymentAndConfirm(fundingPage, { finalTimeoutMs: 240000 })
    } finally {
      await fundingContext?.close()
    }

    await waitForAonClaimReady(page, createdProject.projectName)
    await openAonClaimModal(page)
    await completeAonOnchainPayout(page, {
      accountPassword: ENV.PROJECT_CREATION_ACCOUNT_PASSWORD,
      bitcoinAddress: ENV.MINE_BLOCK_ADDRESS,
    })
  })
})
