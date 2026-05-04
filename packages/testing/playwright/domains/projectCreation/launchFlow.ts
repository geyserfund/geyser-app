import { expect, Page } from '@playwright/test'

import { clickCopyLightningInvoice, clickCopyOnchainAddress } from '../funding/actions'
import { mineBlock, payLightningInvoice, payOnchain } from '../shared/bitcoin/lncli'

type ContinueToLaunchReviewOptions = {
  accountPassword?: string
}

const URL_PATTERNS = {
  story: /\/launch\/\d+\/story$/,
  aboutYou: /\/launch\/\d+\/about-you$/,
  payment: /\/launch\/\d+\/payment$/,
  paymentTaxId: /\/launch\/\d+\/payment\/tax-id$/,
  paymentAccountPassword: /\/launch\/\d+\/payment\/account-password$/,
  paymentSeedWords: /\/launch\/\d+\/payment\/seed-words$/,
  paymentFiatContributions: /\/launch\/\d+\/payment\/fiat-contributions/,
  launchFinalize: /\/launch\/\d+\/finalize$/,
} as const

const MIN_VALID_STORY_TEXT_FOR_E2E = [
  'This project is focused on building open-source tools for Bitcoin creators and supporters.',
  'The launch campaign funds feature development, creator onboarding, and long-term maintenance.',
  'Success means shipping reliable workflows that make project funding clearer, faster, and more transparent.',
  'We will publish updates consistently and share concrete outcomes with the community after launch.',
].join(' ')

const MIN_VALID_ABOUT_YOU_TEXT_FOR_E2E =
  'I am building this project in public and will keep contributors updated with clear milestones and progress reports.'

const waitForAnyUrl = async (page: Page, patterns: RegExp[], timeoutMs = 30000): Promise<RegExp> => {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    const currentUrl = page.url()

    for (const pattern of patterns) {
      if (pattern.test(currentUrl)) {
        return pattern
      }
    }

    await page.waitForTimeout(250)
  }

  throw new Error(`Timed out waiting for URL in set: ${patterns.map((pattern) => pattern.toString()).join(', ')}`)
}

const waitForAnyUrlOrNull = async (page: Page, patterns: RegExp[], timeoutMs = 30000): Promise<RegExp | null> => {
  try {
    return await waitForAnyUrl(page, patterns, timeoutMs)
  } catch {
    return null
  }
}

const getEnabledContinueButton = async (page: Page) => {
  const continueButtons = page.getByRole('button', { name: /^Continue$/i })
  const buttonCount = await continueButtons.count()

  for (let index = 0; index < buttonCount; index += 1) {
    const continueButton = continueButtons.nth(index)
    const isVisible = await continueButton.isVisible().catch(() => false)
    if (!isVisible) {
      continue
    }

    const isEnabled = await continueButton.isEnabled().catch(() => false)
    if (isEnabled) {
      return continueButton
    }
  }

  return null
}

const clickVisibleLaunchPlanOption = async (page: Page, optionName: RegExp) => {
  const option = page.getByText(optionName).first()
  const isVisible = await option
    .waitFor({ state: 'visible', timeout: 2000 })
    .then(() => true)
    .catch(() => false)

  if (!isVisible) {
    return false
  }

  await option.click()
  return true
}

const selectLaunchPaymentMethod = async (page: Page, method: 'lightning' | 'onchain') => {
  const label = method === 'onchain' ? /^On-chain$/i : /^Lightning$/i
  const option = page.getByText(label).first()
  await option.waitFor({ state: 'visible', timeout: 8000 })
  await option.click()
}

const isVisibleHeading = async (page: Page, name: RegExp, timeoutMs = 1500) =>
  page
    .getByRole('heading', { name })
    .first()
    .waitFor({ state: 'visible', timeout: timeoutMs })
    .then(() => true)
    .catch(() => false)

const getPaymentMethodErrorMessage = async (page: Page) => {
  const alert = page.getByRole('alert').first()
  const isVisible = await alert.isVisible().catch(() => false)
  if (!isVisible) {
    return null
  }

  const text = await alert.innerText().catch(() => '')
  const normalized = text.trim()
  return normalized || null
}

const clickContinue = async (page: Page) => {
  const continueButton = page.getByRole('button', { name: /Continue|Skip for now/i }).first()
  await continueButton.waitFor({ state: 'visible', timeout: 15000 })
  await continueButton.click()
}

const fillStoryStep = async (page: Page) => {
  const storyEditor = page.getByRole('textbox', { name: /editable markdown/i }).first()
  const hasStoryEditor = await storyEditor
    .waitFor({ state: 'visible', timeout: 10000 })
    .then(() => true)
    .catch(() => false)

  if (!hasStoryEditor) {
    return
  }

  await storyEditor.fill(MIN_VALID_STORY_TEXT_FOR_E2E)
}

const fillAboutYouStep = async (page: Page) => {
  const aboutYouInput = page.getByRole('textbox', { name: /write a bit more about yourself/i }).first()
  const hasAboutYouInput = await aboutYouInput
    .waitFor({ state: 'visible', timeout: 10000 })
    .then(() => true)
    .catch(() => false)

  if (!hasAboutYouInput) {
    return
  }

  await aboutYouInput.fill(MIN_VALID_ABOUT_YOU_TEXT_FOR_E2E)
}

const maybeSelectTaxEntity = async (page: Page) => {
  const entityButtons = [/^Individual$/i, /^Company$/i, /^Non-profit$/i]

  for (const label of entityButtons) {
    const button = page.getByRole('button', { name: label }).first()
    const isVisible = await button.isVisible().catch(() => false)
    if (!isVisible) {
      continue
    }

    await button.click()
    return true
  }

  return false
}

const getGeneratedAccountPassword = () => `Playwright-${Date.now()}-Aa!`

const setAllVisibleCheckboxesChecked = async (page: Page) => {
  const checkboxes = page.getByRole('checkbox')
  const checkboxCount = await checkboxes.count()

  for (let index = 0; index < checkboxCount; index += 1) {
    const checkbox = checkboxes.nth(index)
    const isChecked = await checkbox.isChecked().catch(() => false)
    if (!isChecked) {
      await checkbox.setChecked(true, { force: true })
    }
  }
}

const completePasswordRecoveryFlow = async (page: Page, accountPassword?: string): Promise<string> => {
  const recoveryPassword = accountPassword || getGeneratedAccountPassword()
  const passwordInput = page.locator('input[name="password"]').first()
  const repeatPasswordInput = page.locator('input[name="repeatPassword"]').first()

  await repeatPasswordInput.waitFor({ state: 'visible', timeout: 15000 })
  await passwordInput.fill(recoveryPassword)
  await repeatPasswordInput.fill(recoveryPassword)
  await setAllVisibleCheckboxesChecked(page)
  await clickContinue(page)

  return recoveryPassword
}

const completePasswordScreen = async (page: Page, accountPassword?: string): Promise<string> => {
  const passwordInput = page.locator('input[name="password"]').first()
  await passwordInput.waitFor({ state: 'visible', timeout: 20000 })

  const repeatPasswordInput = page.locator('input[name="repeatPassword"]').first()
  const isCreatePasswordFlow = await repeatPasswordInput.isVisible().catch(() => false)
  const resolvedPassword = accountPassword || (isCreatePasswordFlow ? getGeneratedAccountPassword() : '')

  if (!resolvedPassword) {
    throw new Error(
      'PROJECT_CREATION_ACCOUNT_PASSWORD is required when the account-password confirmation form is shown.',
    )
  }

  await passwordInput.fill(resolvedPassword)

  if (isCreatePasswordFlow) {
    await repeatPasswordInput.fill(resolvedPassword)
    await setAllVisibleCheckboxesChecked(page)
  }

  await clickContinue(page)

  if (!isCreatePasswordFlow) {
    const invalidPasswordMessage = page.getByText(/Invalid password/i).first()
    const hasInvalidPassword = await invalidPasswordMessage.isVisible().catch(() => false)

    if (hasInvalidPassword) {
      const forgotPasswordButton = page.getByRole('button', { name: /Forgot your password\?/i }).first()
      const canRecoverPassword = await forgotPasswordButton.isVisible().catch(() => false)

      if (!canRecoverPassword) {
        throw new Error('Account password is invalid and password recovery is unavailable.')
      }

      await forgotPasswordButton.click()
      return completePasswordRecoveryFlow(page, accountPassword)
    }
  }

  return resolvedPassword
}

const completeSeedWordsScreen = async (page: Page) => {
  const seedWordsCheckbox = page.getByRole('checkbox', { name: /stored my seed words somewhere secure/i })
  await seedWordsCheckbox.waitFor({ state: 'visible', timeout: 15000 })
  const isChecked = await seedWordsCheckbox.isChecked().catch(() => false)
  if (!isChecked) {
    await seedWordsCheckbox.setChecked(true, { force: true })
  }
  await clickContinue(page)
}

const waitForReviewHeading = async (page: Page) => {
  await expect(page.getByRole('heading', { name: /Project review & launch/i }).first()).toBeVisible({ timeout: 20000 })
}

const maybeCompleteLaunchPaymentPasswordStep = async (page: Page, accountPassword?: string) => {
  const passwordInput = page.locator('input[name="password"]').first()
  const hasPasswordInput = await passwordInput
    .waitFor({ state: 'visible', timeout: 3000 })
    .then(() => true)
    .catch(() => false)

  if (!hasPasswordInput) {
    return accountPassword
  }

  return completePasswordScreen(page, accountPassword)
}

const parseBip21 = (bip21Uri: string): { address: string; amountSats: number } => {
  const [bitcoinPart, queryPart] = bip21Uri.split('?')
  const address = bitcoinPart?.split(':')[1] || ''

  const amountMatch = queryPart?.match(/amount=([0-9.]+)/)
  const amountBtcString = amountMatch ? amountMatch[1] : '0'
  const [wholePart, decimalPart = ''] = amountBtcString.split('.')
  const paddedDecimal = decimalPart.padEnd(8, '0').substring(0, 8)
  const amountSats = parseInt(`${wholePart}${paddedDecimal}`, 10)

  if (!address || !Number.isFinite(amountSats) || amountSats <= 0) {
    throw new Error(`Unable to parse BIP21 URI: ${bip21Uri}`)
  }

  return { address, amountSats }
}

const mineBlockOrThrow = async () => {
  try {
    await mineBlock()
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to mine block: 401')) {
      throw new Error('BITCOIND_AUTH is unauthorized; cannot confirm launch-fee payment in this environment.')
    }

    throw error
  }
}

const waitForLaunchFeeSuccess = async (page: Page) => {
  const startedAt = Date.now()
  const maxWaitMs = 240000

  while (Date.now() - startedAt < maxWaitMs) {
    const isLaunchNowVisible = await page
      .getByRole('button', { name: /^Launch Now$/i })
      .first()
      .isVisible()
      .catch(() => false)
    if (isLaunchNowVisible) {
      return
    }

    const isFinalizeHeadingVisible = await page
      .getByRole('heading', { name: /Ready to launch!/i })
      .first()
      .isVisible()
      .catch(() => false)
    if (isFinalizeHeadingVisible) {
      return
    }

    const successBanner = page.locator('#successful-contribution-banner')
    const isSuccessBannerVisible = await successBanner.isVisible().catch(() => false)
    if (isSuccessBannerVisible) {
      const continueButton = page.getByRole('button', { name: /^Continue$/i }).first()
      const isContinueVisible = await continueButton.isVisible().catch(() => false)
      if (isContinueVisible) {
        const isContinueEnabled = await continueButton.isEnabled().catch(() => false)
        if (isContinueEnabled) {
          await continueButton.click()
        }
      }

      await expect(page.getByRole('heading', { name: /Ready to launch!/i }).first()).toBeVisible({ timeout: 30000 })
      return
    }

    await page.waitForTimeout(500)
  }

  throw new Error('Timed out waiting for launch-fee payment success state.')
}

const settleLightningLaunchFee = async (page: Page): Promise<boolean> => {
  const lightningButton = page
    .locator('#copy-lightning-invoice-button')
    .or(page.getByRole('button', { name: /Copy Lightning invoice|Copy invoice/i }))
    .first()

  const hasLightningInvoice = await lightningButton
    .waitFor({ state: 'visible', timeout: 10000 })
    .then(() => true)
    .catch(() => false)

  if (!hasLightningInvoice) {
    return false
  }

  const lightningInvoice = await clickCopyLightningInvoice(page)
  await payLightningInvoice(lightningInvoice)
  await mineBlockOrThrow()
  return true
}

const settleOnchainLaunchFee = async (page: Page) => {
  const downloadRefundButton = page.getByRole('button', { name: /Download refund file & continue/i }).first()
  if (await downloadRefundButton.isVisible().catch(() => false)) {
    await downloadRefundButton.click()
  }

  const bip21Uri = await clickCopyOnchainAddress(page)
  const { address, amountSats } = parseBip21(bip21Uri)

  await payOnchain(address, amountSats)
  await mineBlockOrThrow()
}

const selectOnchainFallbackMethod = async (page: Page, accountPassword?: string) => {
  const backButton = page.getByRole('button', { name: /^Back$/i }).first()
  await backButton.waitFor({ state: 'visible', timeout: 15000 })
  await backButton.click()

  await expect(page.getByRole('heading', { name: /Choose payment method/i }).first()).toBeVisible({ timeout: 20000 })

  await page.getByRole('button', { name: /On-chain/i }).first().click()
  await clickContinue(page)

  await maybeCompleteLaunchPaymentPasswordStep(page, accountPassword)
  await expect(page.getByRole('heading', { name: /Launch Payment/i }).first()).toBeVisible({ timeout: 20000 })
}

/** Continue the creation wizard from rewards through launch review. */
export const continueFromRewardsToLaunchReview = async (page: Page, options: ContinueToLaunchReviewOptions = {}) => {
  await clickContinue(page)
  await page.waitForURL(URL_PATTERNS.story, { timeout: 20000 })

  await fillStoryStep(page)
  await clickContinue(page)
  await page.waitForURL(URL_PATTERNS.aboutYou, { timeout: 20000 })

  await fillAboutYouStep(page)
  await clickContinue(page)
  await page.waitForURL(URL_PATTERNS.payment, { timeout: 20000 })

  const POST_PAYMENT_EMAIL_PATTERNS = [
    URL_PATTERNS.paymentTaxId,
    URL_PATTERNS.paymentAccountPassword,
    URL_PATTERNS.paymentSeedWords,
    URL_PATTERNS.paymentFiatContributions,
    URL_PATTERNS.launchFinalize,
  ] as const

  await clickContinue(page)
  // The tax-id sub-step is skipped for accounts that already have tax info on file;
  // accept any downstream step as a valid landing point.
  const afterPaymentEmail = await waitForAnyUrl(page, [...POST_PAYMENT_EMAIL_PATTERNS], 20000)

  let nextPattern: RegExp | null = null

  if (afterPaymentEmail === URL_PATTERNS.paymentTaxId) {
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      await clickContinue(page)

      nextPattern = await waitForAnyUrlOrNull(
        page,
        [URL_PATTERNS.paymentAccountPassword, URL_PATTERNS.paymentSeedWords, URL_PATTERNS.paymentFiatContributions, URL_PATTERNS.launchFinalize],
        20000,
      )

      if (nextPattern) {
        break
      }

      const isStillOnTaxId = URL_PATTERNS.paymentTaxId.test(page.url())
      if (!isStillOnTaxId) {
        nextPattern = await waitForAnyUrl(
          page,
          [URL_PATTERNS.paymentAccountPassword, URL_PATTERNS.paymentSeedWords, URL_PATTERNS.paymentFiatContributions, URL_PATTERNS.launchFinalize],
          12000,
        )
        break
      }

      await maybeSelectTaxEntity(page)
      await page.waitForTimeout(500)
    }

    if (!nextPattern) {
      throw new Error('Unable to continue past wallet tax-id step.')
    }
  } else {
    // Tax-id was skipped; already on the next step
    nextPattern = afterPaymentEmail
  }

  if (nextPattern === URL_PATTERNS.paymentAccountPassword) {
    await completePasswordScreen(page, options.accountPassword)
    nextPattern = await waitForAnyUrl(
      page,
      [URL_PATTERNS.paymentSeedWords, URL_PATTERNS.paymentFiatContributions, URL_PATTERNS.launchFinalize],
      25000,
    )
  }

  if (nextPattern === URL_PATTERNS.paymentSeedWords) {
    await completeSeedWordsScreen(page)
    nextPattern = await waitForAnyUrl(page, [URL_PATTERNS.paymentFiatContributions, URL_PATTERNS.launchFinalize], 25000)
  }

  if (nextPattern === URL_PATTERNS.paymentFiatContributions) {
    await clickContinue(page)
    await page.waitForURL(URL_PATTERNS.launchFinalize, { timeout: 25000 })
  }

  await waitForReviewHeading(page)
}

/** Submit project for review from launch review step. */
export const submitProjectForReviewInUi = async (page: Page) => {
  await waitForReviewHeading(page)

  const submitButton = page.getByRole('button', { name: /^Submit for review$/i }).first()
  await submitButton.waitFor({ state: 'visible', timeout: 15000 })
  await submitButton.click()

  const submitDialog = page.getByRole('dialog')
  await submitDialog.waitFor({ state: 'visible', timeout: 10000 })
  await submitDialog.getByRole('button', { name: /^Submit for review$/i }).first().click()

  await expect(page.getByRole('button', { name: /^Submitted$/i }).first()).toBeVisible({ timeout: 15000 })
}

/** Reload launch review page until accepted status appears and advance to strategy step. */
export const continueFromAcceptedReview = async (page: Page) => {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    await page.reload({ waitUntil: 'networkidle' })

    const continueButton = await getEnabledContinueButton(page)
    if (continueButton) {
      await continueButton.click()
      await expect(page.getByRole('heading', { name: /Choose your Launch Plan/i }).first()).toBeVisible({
        timeout: 15000,
      })
      return
    }

    await page.waitForTimeout(3000)
  }

  throw new Error('Review status did not become accepted after backend submission.')
}

/** Advance launch flow from strategy step to finalize by paying launch fee. */
export const payLaunchFeeAndReachPublishStep = async (
  page: Page,
  options: ContinueToLaunchReviewOptions = {},
): Promise<'lightning' | 'onchain'> => {
  await expect(page.getByRole('heading', { name: /Choose your Launch Plan/i }).first()).toBeVisible({ timeout: 20000 })

  const hasSelectedPlan =
    (await clickVisibleLaunchPlanOption(page, /^Basic$/i)) ||
    (await clickVisibleLaunchPlanOption(page, /^Starter Launch$/i)) ||
    (await clickVisibleLaunchPlanOption(page, /^Growth$/i))

  if (!hasSelectedPlan) {
    const enabledContinueButton = await getEnabledContinueButton(page)
    if (!enabledContinueButton) {
      throw new Error('No selectable launch plan option or enabled continue button was found.')
    }
  }

  await clickContinue(page)

  await expect(page.getByRole('heading', { name: /Choose payment method/i }).first()).toBeVisible({ timeout: 20000 })
  await selectLaunchPaymentMethod(page, 'lightning')
  await clickContinue(page)
  await maybeCompleteLaunchPaymentPasswordStep(page, options.accountPassword)

  await expect(page.getByRole('heading', { name: /Launch Payment/i }).first()).toBeVisible({ timeout: 20000 })

  const paidWithLightning = await settleLightningLaunchFee(page)
  if (!paidWithLightning) {
    const methodSelectionError = await getPaymentMethodErrorMessage(page)
    throw new Error(
      `Lightning launch payment invoice was not available${methodSelectionError ? `: ${methodSelectionError}` : '.'}`,
    )
  }

  await waitForLaunchFeeSuccess(page)
  await expect(page.getByRole('heading', { name: /Ready to launch!/i }).first()).toBeVisible({ timeout: 25000 })
  return 'lightning'
}

/** Publish project from final step and assert live modal + navigation. */
export const publishProjectAndAssertLive = async (page: Page, projectName: string) => {
  void projectName

  const launchNowButton = page.getByRole('button', { name: /^Launch Now$/i })
  await launchNowButton.waitFor({ state: 'visible', timeout: 15000 })
  await launchNowButton.click()

  const successDialog = page.getByRole('dialog').filter({ hasText: /Your project is live/i }).first()
  const hasSuccessDialog = await successDialog
    .waitFor({ state: 'visible', timeout: 90000 })
    .then(() => true)
    .catch(() => false)

  if (hasSuccessDialog) {
    await successDialog.getByRole('button', { name: /Go to project/i }).first().click()
  } else {
    const legacyHeading = page.getByRole('heading', { name: /Your project is live/i }).first()
    await expect(legacyHeading).toBeVisible({ timeout: 30000 })
    await page.getByRole('button', { name: /Go to project/i }).first().click()
  }

  await page.waitForURL(/\/project\/[^/?#]+(?:\/dashboard)?\/?(?:\?.*)?$/, { timeout: 45000 })
  await expect(page).not.toHaveURL(/\/launch\/\d+\/finalize/)
}
