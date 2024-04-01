import { WebLNProvider } from 'webln'

import { FundingTxFragment } from '../../types'
import { sha256 } from '../../utils'

export const WEBLN_ENABLE_ERROR = 'Failed to enable webln'

export const { webln }: { webln: WebLNProvider } = window as any

export const requestWebLNPayment = async (fundingTx: FundingTxFragment) => {
  if (!webln) {
    throw new Error('no provider')
  }

  try {
    await webln.enable()
  } catch (e) {
    throw new Error(WEBLN_ENABLE_ERROR)
  }

  if (!fundingTx.paymentRequest) {
    throw new Error('payment request not found')
  }

  let preimage = ''

  try {
    const res = await webln.sendPayment(fundingTx.paymentRequest)
    preimage = res.preimage
  } catch (e) {
    throw new Error(WEBLN_ENABLE_ERROR)
  }

  return sha256(preimage)
}
