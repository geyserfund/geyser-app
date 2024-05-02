import { Transaction } from 'bitcoinjs-lib'
import { Musig } from 'boltz-core'

import { BOLTZ_DOMAIN } from '../../../../../../../../../../../constants'

const swapServiceEndpoint = `https://${BOLTZ_DOMAIN}/v2`
// const swapServiceEndpoint = `http://localhost:9001/v2`

export type BoltzTransaction = {
  id: string
  hex: string
  timeoutBlockHeight: number
  timeoutEta?: number
}

export const getTransactionFromSwap = async (swapId: string): Promise<BoltzTransaction> => {
  const resp = await fetch(`${swapServiceEndpoint}/swap/submarine/${swapId}/transaction`).then((res) => res.json())
  return resp
}

export const getFeeEstimations = async (): Promise<Record<string, number>> => {
  const resp = await fetch(`${swapServiceEndpoint}/chain/fees`).then((res) => res.json())
  return resp
}

type PartialSignature = {
  pubNonce: Buffer
  signature: Buffer
}

export const getPartialRefundSignature = async (
  id: string,
  pubNonce: Buffer,
  transaction: Transaction,
  index: number,
): Promise<PartialSignature> => {
  const resp = await fetch(`${swapServiceEndpoint}/swap/submarine/${id}/refund`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index,
      pubNonce: pubNonce.toString('hex'),
      transaction: transaction.toHex(),
    }),
  }).then((res) => res.json())

  if (resp.error) {
    throw new Error(resp.error)
  }

  return {
    pubNonce: Musig.parsePubNonce(resp.pubNonce),
    signature: Buffer.from(resp.partialSignature, 'hex'),
  }
}

export const broadcastTransaction = async (txHex: string): Promise<{ id: string }> => {
  const resp = await fetch(`${swapServiceEndpoint}/chain/BTC/transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hex: txHex,
    }),
  }).then((res) => res.json())
  return resp
}
