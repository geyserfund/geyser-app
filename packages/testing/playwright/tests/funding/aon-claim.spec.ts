/** Full AON funding and creator claim flow */

import { BrowserContext, test } from '@playwright/test'

import { loginWithRealNostr, setupRealAuth } from '../../domains/auth/realAuth'
import { clickContribute } from '../../domains/funding/actions'
import { expectFundingAmountScreen } from '../../domains/funding/assertions'
import { TEST_COMMENT } from '../../domains/funding/constants'
import { completeFundingDetails, completeFundingInitWithDonation } from '../../domains/funding/flows'
import { completeAonOnchainPayout, openAonClaimModal, waitForAonClaimReady } from '../../domains/funding/payout'
import { settleVisibleBitcoinPaymentAndConfirm } from '../../domains/funding/settlement'
import { checkLiveBackendAvailability } from '../../domains/shared/backend'
import { ENV } from '../../domains/shared/constants'

test.describe('AON Full Funding and Creator Claim', () => {
  test.describe.configure({ mode: 'serial' })
  test.setTimeout(720000)

  test.beforeEach(async ({ page }) => {
    const backend = await checkLiveBackendAvailability(page.request, { requireAuth: true })
    test.skip(!backend.ok, `Skipping AON claim test: ${backend.reason}`)
    test.skip(
      !ENV.PROJECT_CREATION_ACCOUNT_PASSWORD,
      'Skipping AON claim test: PROJECT_CREATION_ACCOUNT_PASSWORD is required for creator payout.',
    )
    test.skip(
      !ENV.AON_PROJECT_NAME || !ENV.AON_PROJECT_GOAL_AMOUNT_SATS,
      'Skipping AON claim test: AON_PROJECT_NAME and AON_PROJECT_GOAL_AMOUNT_SATS are required.',
    )

    await setupRealAuth(page)
    await page.goto('/')
    await loginWithRealNostr(page)
  })

  test('should fully fund and claim an existing AON project as creator', async ({ browser, page }) => {
    const projectName = ENV.AON_PROJECT_NAME
    const goalAmountSats = Number(ENV.AON_PROJECT_GOAL_AMOUNT_SATS)
    if (!projectName || !Number.isSafeInteger(goalAmountSats) || goalAmountSats <= 0) {
      test.skip(true, 'AON_PROJECT_NAME and AON_PROJECT_GOAL_AMOUNT_SATS must describe a valid existing project.')
      return
    }

    let fundingContext: BrowserContext | null = null

    try {
      fundingContext = await browser.newContext({
        acceptDownloads: true,
        baseURL: ENV.APP_URL,
        ignoreHTTPSErrors: true,
      })
      const fundingPage = await fundingContext.newPage()

      await fundingPage.goto(`/project/${projectName}`)
      await clickContribute(fundingPage)
      await expectFundingAmountScreen(fundingPage)
      await completeFundingInitWithDonation(fundingPage, goalAmountSats)
      await completeFundingDetails(fundingPage, { comment: TEST_COMMENT })
      await settleVisibleBitcoinPaymentAndConfirm(fundingPage, { finalTimeoutMs: 240000 })
    } finally {
      await fundingContext?.close()
    }

    await waitForAonClaimReady(page, projectName)
    await openAonClaimModal(page)
    await completeAonOnchainPayout(page, {
      accountPassword: ENV.PROJECT_CREATION_ACCOUNT_PASSWORD,
      bitcoinAddress: ENV.MINE_BLOCK_ADDRESS,
    })
  })
})
