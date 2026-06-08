/** Creator payout helpers for Playwright funding tests */
/* eslint-disable no-await-in-loop */

import { expect, Page } from '@playwright/test'

import { mineBlockOrSkipWhenUnauthorized } from './settlement'

type CompleteAonOnchainPayoutOptions = {
  accountPassword: string
  bitcoinAddress: string
}

const getAonClaimSection = (page: Page) =>
  page.getByText(/^Claim funds$/i).locator('xpath=ancestor::*[.//button[normalize-space()="Claim"]][1]')

const getAonClaimButton = (page: Page) => getAonClaimSection(page).getByRole('button', { name: /^Claim$/i }).first()

const getAonClaimDiagnostics = async (page: Page, projectName: string): Promise<string> => {
  const claimSection = getAonClaimSection(page)
  const claimButton = getAonClaimButton(page)
  const genericClaimButtons = await page.getByRole('button', { name: /^Claim$/i }).count().catch(() => 0)
  const claimSectionText = await claimSection
    .innerText({ timeout: 1000 })
    .then((text) => text.replace(/\s+/g, ' ').trim())
    .catch(() => '')
  const isClaimButtonVisible = await claimButton.isVisible().catch(() => false)
  const isClaimButtonEnabled = isClaimButtonVisible && (await claimButton.isEnabled().catch(() => false))
  const claimButtonState = !isClaimButtonVisible ? 'not visible' : isClaimButtonEnabled ? 'enabled' : 'disabled'
  const statusText = await page
    .getByText(/successful|claimed|campaign|goal|claim funds/i)
    .allInnerTexts()
    .then((items) => items.map((item) => item.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 8))
    .catch(() => [])

  return [
    `[AONClaim] Project: ${projectName}`,
    `URL: ${page.url()}`,
    `Scoped claim button: ${claimButtonState}`,
    `Generic Claim buttons: ${genericClaimButtons}`,
    claimSectionText ? `Claim section: ${claimSectionText}` : null,
    statusText.length ? `Status text: ${statusText.join(' | ')}` : null,
  ]
    .filter(Boolean)
    .join(' ')
}

const getVisiblePayoutDiagnostics = async (page: Page): Promise<string> => {
  const dialog = page.getByRole('dialog').first()
  const modalText = await dialog
    .innerText({ timeout: 1000 })
    .then((text) => text.replace(/\s+/g, ' ').trim())
    .catch(() => '')
  const visibleAlerts = await page
    .getByRole('alert')
    .allInnerTexts()
    .then((items) => items.map((item) => item.replace(/\s+/g, ' ').trim()).filter(Boolean))
    .catch(() => [])
  const submitButton = page
    .getByRole('button', { name: /Confirm payout method|Claim my funds|Resume my payout|Try again/i })
    .first()
  const submitButtonState = await submitButton
    .isVisible()
    .then(async (isVisible) => {
      if (!isVisible) {
        return 'not visible'
      }

      return (await submitButton.isEnabled().catch(() => false)) ? 'enabled' : 'disabled'
    })
    .catch(() => 'not found')

  return [
    `[Payout] URL: ${page.url()}`,
    `Submit button: ${submitButtonState}`,
    modalText ? `Modal: ${modalText}` : null,
    visibleAlerts.length ? `Alerts: ${visibleAlerts.join(' | ')}` : null,
  ]
    .filter(Boolean)
    .join(' ')
}

const withPayoutDiagnostics = async <T>(page: Page, step: string, action: () => Promise<T>): Promise<T> => {
  try {
    return await action()
  } catch (error) {
    const diagnostics = await getVisiblePayoutDiagnostics(page)
    const message = error instanceof Error ? error.message : `${error}`
    throw new Error(`[Payout:${step}] ${message} ${diagnostics}`)
  }
}

const selectOnchainPayoutMethod = async (page: Page) => {
  const dialog = page.getByRole('dialog').first()
  const onchainOption = dialog.getByRole('button', { name: /Bitcoin On-Chain/i }).first()
  const bitcoinAddressInput = dialog.locator('input[name="bitcoinAddress"]').first()

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    await onchainOption.waitFor({ state: 'visible', timeout: 15000 })
    await onchainOption.scrollIntoViewIfNeeded()
    await onchainOption.click()

    const hasBitcoinAddressInput = await bitcoinAddressInput
      .waitFor({ state: 'visible', timeout: 3000 })
      .then(() => true)
      .catch(() => false)

    if (hasBitcoinAddressInput) {
      return
    }

    await onchainOption.evaluate((element) => {
      if (element instanceof HTMLElement) {
        element.click()
      }
    })

    const switchedAfterProgrammaticClick = await bitcoinAddressInput
      .waitFor({ state: 'visible', timeout: 3000 })
      .then(() => true)
      .catch(() => false)

    if (switchedAfterProgrammaticClick) {
      return
    }

    await onchainOption.focus()
    await page.keyboard.press('Enter')

    const switchedAfterKeyboard = await bitcoinAddressInput
      .waitFor({ state: 'visible', timeout: 3000 })
      .then(() => true)
      .catch(() => false)

    if (switchedAfterKeyboard) {
      return
    }
  }

  throw new Error('Unable to select Bitcoin On-Chain payout method.')
}

export const waitForAonClaimReady = async (page: Page, projectName: string, timeoutMs = 300000) => {
  const startedAt = Date.now()
  const claimButton = getAonClaimButton(page)

  while (Date.now() - startedAt < timeoutMs) {
    await page.goto(`/project/${projectName}`, { waitUntil: 'domcontentloaded' })
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => undefined)

    const isClaimReady = await claimButton
      .waitFor({ state: 'visible', timeout: 10000 })
      .then(async () => await claimButton.isEnabled())
      .catch(() => false)

    if (isClaimReady) {
      return
    }

    await page.waitForTimeout(2000)
  }

  if ((await claimButton.isVisible().catch(() => false)) && (await claimButton.isEnabled().catch(() => false))) {
    return
  }

  throw new Error(`Timed out waiting for AON claim controls. ${await getAonClaimDiagnostics(page, projectName)}`)
}

export const openAonClaimModal = async (page: Page) => {
  await withPayoutDiagnostics(page, 'open-claim-modal', async () => {
    await expect(page.getByText(/Claim funds/i).first()).toBeVisible({ timeout: 30000 })
    const claimButton = getAonClaimButton(page)
    await claimButton.waitFor({ state: 'visible', timeout: 15000 })
    await expect(claimButton).toBeEnabled({ timeout: 15000 })
    await claimButton.click()
    await expect(
      page
        .getByRole('dialog')
        .filter({ hasText: /Choose a payout method/i })
        .first(),
    ).toBeVisible({
      timeout: 30000,
    })
  })
}

export const completeAonOnchainPayout = async (page: Page, options: CompleteAonOnchainPayoutOptions) => {
  await withPayoutDiagnostics(page, 'complete-onchain-payout', async () => {
    const dialog = page.getByRole('dialog').first()
    await selectOnchainPayoutMethod(page)

    const bitcoinAddressInput = dialog.locator('input[name="bitcoinAddress"]').first()
    await bitcoinAddressInput.waitFor({ state: 'visible', timeout: 15000 })
    await bitcoinAddressInput.fill(options.bitcoinAddress)
    await bitcoinAddressInput.press('Tab')

    const passwordInput = dialog.locator('input[name="accountPassword"]').first()
    await passwordInput.waitFor({ state: 'visible', timeout: 15000 })
    await passwordInput.fill(options.accountPassword)
    await passwordInput.press('Tab')

    const confirmButton = dialog.getByRole('button', { name: /Confirm payout method/i }).first()
    await expect(confirmButton).toBeEnabled({ timeout: 15000 })
    await confirmButton.click()

    await expect(
      page.getByRole('dialog').filter({ hasText: /Please wait for swap confirmation|Claim payout/i }),
    ).toBeVisible({
      timeout: 90000,
    })

    const claimButton = page.getByRole('button', { name: /Claim my funds/i }).first()
    for (let attempt = 1; attempt <= 10; attempt += 1) {
      if ((await claimButton.isVisible().catch(() => false)) && (await claimButton.isEnabled().catch(() => false))) {
        break
      }

      await mineBlockOrSkipWhenUnauthorized()
      await page.waitForTimeout(10000)
    }

    await expect(claimButton).toBeEnabled({ timeout: 120000 })
    await claimButton.click()

    await expect(
      page
        .getByRole('dialog')
        .filter({ hasText: /Payout Processed \(On-Chain\)|Go back to my project/i })
        .first(),
    ).toBeVisible({ timeout: 120000 })
  })
}
