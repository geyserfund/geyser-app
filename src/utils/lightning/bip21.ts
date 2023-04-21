import { SATOSHIS_IN_BTC } from '../../constants'

export const getBip21Invoice = (
  amountInSats: number,
  lnAddress?: string | null,
  onChainAddress?: string | null,
) => {
  if (!onChainAddress) {
    return lnAddress || ''
  }

  if (isFinite(amountInSats)) {
    const btcAmount = Number(amountInSats / SATOSHIS_IN_BTC).toFixed(8)

    if (!lnAddress) {
      return `bitcoin:${onChainAddress}?amount=${btcAmount}`
    }

    return `bitcoin:${onChainAddress}?amount=${btcAmount}&lightning=${lnAddress}`
  }

  return onChainAddress
}
