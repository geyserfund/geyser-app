import { SATOSHIS_IN_BTC } from '../../constants'

export const getBip21Invoice = (
  amountInSats: number,
  onChainAddress?: string | null,
  lnAddress?: string | null,
) => {
  if (!onChainAddress) {
    return lnAddress || ''
  }

  const btcAmount = Number(amountInSats / SATOSHIS_IN_BTC).toFixed(8)
  const btcAddress = `bitcoin:${onChainAddress}?amount=${btcAmount}`

  if (isFinite(amountInSats)) {
    if (!lnAddress) {
      return btcAddress
    }

    return `${btcAddress}&lightning=${lnAddress}`
  }

  return btcAddress
}
