/** Bitcoin and Lightning Network utilities for Playwright tests */

import { request } from '@playwright/test'

import { ENV } from '../constants'

/** Create a request context for LND API calls */
const createLndContext = () => {
  return request.newContext({
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-Macaroon': ENV.LND_MACAROON_HEX,
    },
    ignoreHTTPSErrors: true,
  })
}

/** Create a request context for Bitcoin RPC calls */
const createBitcoinContext = () => {
  return request.newContext({
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${ENV.BITCOIND_AUTH}`,
    },
  })
}

/** Pay an onchain Bitcoin transaction via LND */
export const payOnchain = async (address: string, amount: number) => {
  const context = await createLndContext()

  const response = await context.post(`${ENV.LND_ENDPOINT}/v1/transactions`, {
    data: {
      addr: address,
      amount: amount.toString(),
    },
  })

  if (!response.ok()) {
    throw new Error(`Failed to pay onchain: ${response.status()} ${await response.text()}`)
  }

  const result = await response.json()
  await context.dispose()

  return result
}

/** Pay a Lightning Network invoice via LND */
export const payLightningInvoice = async (paymentRequest: string) => {
  const context = await createLndContext()

  const response = await context.post(`${ENV.LND_ENDPOINT}/v1/channels/transaction-stream`, {
    data: {
      payment_request: paymentRequest,
    },
  })

  if (!response.ok()) {
    throw new Error(`Failed to pay lightning invoice: ${response.status()} ${await response.text()}`)
  }

  const result = await response.json()
  await context.dispose()

  return result
}

/** Mine a block on the Bitcoin regtest network */
export const mineBlock = async () => {
  const context = await createBitcoinContext()

  const response = await context.post(ENV.BITCOIND_ENDPOINT, {
    data: {
      jsonrpc: '2.0',
      id: 'playwright-test',
      method: 'generatetoaddress',
      params: [1, ENV.MINE_BLOCK_ADDRESS],
    },
  })

  if (!response.ok()) {
    throw new Error(`Failed to mine block: ${response.status()} ${await response.text()}`)
  }

  const result = await response.json()
  await context.dispose()

  return result
}

/** Wait for a transaction to be confirmed (helper for tests) */
export const waitForConfirmation = async (delayMs = 2000) => {
  await new Promise((resolve) => {
    setTimeout(resolve, delayMs)
  })
}
