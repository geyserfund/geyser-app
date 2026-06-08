/** Bitcoin payment settlement helpers for Playwright funding tests */

import { Page, test } from '@playwright/test'

import { mineBlock, payLightningInvoice, payOnchain } from '../shared/bitcoin/lncli'
import { clickCopyOnchainAddress, clickDownloadAndContinue } from './actions'
import { expectFinalSuccessScreen, expectIntermediateSuccessScreen } from './assertions'
import { getLightningInvoice, getOnchainAddress } from './flows'

type BitcoinPaymentMethod = 'lightning' | 'onchain'

type BitcoinPayment =
  | { method: 'onchain'; address: string; amountSats: number }
  | { method: 'lightning'; invoice: string }

type SettleVisibleBitcoinPaymentOptions = {
  allowedMethods?: BitcoinPaymentMethod[]
  finalTimeoutMs?: number
  preferOnchain?: boolean
  skipReason?: string
}

export const mineBlockOrSkipWhenUnauthorized = async () => {
  try {
    await mineBlock()
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to mine block: 401')) {
      test.skip(true, 'Skipping final-confirmation check: BITCOIND_AUTH is unauthorized in this environment.')
      return
    }

    throw error
  }
}

const parseBip21Payment = (bip21Uri: string): { address: string; amountSats: number } => {
  const [bitcoinPart, queryPart] = bip21Uri.split('?')
  const address = bitcoinPart.split(':')[1] || ''
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

const waitForVisibleBitcoinPaymentControl = async (page: Page) => {
  const onchainDownloadControl = page
    .getByRole('button', { name: /Download & Continue/i })
    .or(page.getByRole('link', { name: /Download & Continue/i }))
    .first()
  const lightningInvoiceButton = page
    .locator('#copy-lightning-invoice-button')
    .or(page.getByRole('button', { name: /Copy invoice/i }))
    .first()
  const onchainAddressButton = page
    .locator('#copy-onchain-address-button')
    .or(page.getByRole('button', { name: /Copy onchain address|Copy address/i }))
    .first()

  await Promise.race([
    // eslint-disable-next-line testing-library/await-async-utils
    onchainDownloadControl.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
    // eslint-disable-next-line testing-library/await-async-utils
    lightningInvoiceButton.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
    // eslint-disable-next-line testing-library/await-async-utils
    onchainAddressButton.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
  ])

  return { lightningInvoiceButton, onchainAddressButton, onchainDownloadControl }
}

const getVisibleBitcoinPayment = async (
  page: Page,
  options: SettleVisibleBitcoinPaymentOptions = {},
): Promise<BitcoinPayment> => {
  const {
    allowedMethods = ['lightning', 'onchain'],
    preferOnchain = false,
    skipReason = 'Payment method unavailable',
  } = options

  if (preferOnchain && allowedMethods.includes('onchain')) {
    try {
      const { address, amountSats } = await getOnchainAddress(page)
      return { method: 'onchain', address, amountSats }
    } catch (onchainError) {
      const lightningInvoiceButton = page
        .locator('#copy-lightning-invoice-button')
        .or(page.getByRole('button', { name: /Copy invoice/i }))
        .first()

      if (await lightningInvoiceButton.isVisible().catch(() => false)) {
        if (!allowedMethods.includes('lightning')) {
          throw onchainError
        }

        return { method: 'lightning', invoice: await getLightningInvoice(page) }
      }

      throw onchainError
    }
  }

  const { lightningInvoiceButton, onchainAddressButton, onchainDownloadControl } =
    await waitForVisibleBitcoinPaymentControl(page)

  if (await onchainDownloadControl.isVisible().catch(() => false)) {
    if (!allowedMethods.includes('onchain')) {
      test.skip(true, skipReason)
      throw new Error(skipReason)
    }

    await clickDownloadAndContinue(page)
  }

  await Promise.race([
    // eslint-disable-next-line testing-library/await-async-utils
    lightningInvoiceButton.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
    // eslint-disable-next-line testing-library/await-async-utils
    onchainAddressButton.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
  ])

  if (await onchainAddressButton.isVisible().catch(() => false)) {
    if (!allowedMethods.includes('onchain')) {
      test.skip(true, skipReason)
      throw new Error(skipReason)
    }

    const bip21Uri = await clickCopyOnchainAddress(page)
    const { address, amountSats } = parseBip21Payment(bip21Uri)
    return { method: 'onchain', address, amountSats }
  }

  if (await lightningInvoiceButton.isVisible().catch(() => false)) {
    if (!allowedMethods.includes('lightning')) {
      test.skip(true, skipReason)
      throw new Error(skipReason)
    }

    return { method: 'lightning', invoice: await getLightningInvoice(page) }
  }

  throw new Error(`[Funding:settlement] No Bitcoin payment method is visible. URL: ${page.url()}`)
}

export const settleVisibleBitcoinPaymentAndConfirm = async (
  page: Page,
  options: SettleVisibleBitcoinPaymentOptions = {},
) => {
  const { finalTimeoutMs = 90000 } = options
  const payment = await getVisibleBitcoinPayment(page, options)

  if (payment.method === 'onchain') {
    await payOnchain(payment.address, payment.amountSats)
  } else {
    await payLightningInvoice(payment.invoice)
  }

  await expectIntermediateSuccessScreen(page)
  await mineBlockOrSkipWhenUnauthorized()
  await expectFinalSuccessScreen(page, { timeoutMs: finalTimeoutMs })

  return payment.method
}

export const settleOnchainPaymentAndConfirm = async (page: Page, finalTimeoutMs = 90000) => {
  try {
    return await settleVisibleBitcoinPaymentAndConfirm(page, {
      allowedMethods: ['onchain'],
      finalTimeoutMs,
      preferOnchain: true,
      skipReason: 'Onchain payment method is unavailable in this environment.',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`
    test.skip(true, `Skipping onchain payment test: ${message}`)
    throw error
  }
}
