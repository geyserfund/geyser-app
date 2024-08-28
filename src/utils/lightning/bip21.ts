import { SATOSHIS_IN_BTC } from '../../shared/constants'

export const getBip21Invoice = (amountInSats: number, onChainAddress?: string | null, lnAddress?: string | null) => {
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

export const getBitcoinAddress = (bip21: string) => {
  // Define the BIP21 URI pattern
  const bip21Pattern = /^bitcoin:([a-zA-Z0-9]{27,34})(\?([a-zA-Z0-9]+=[a-zA-Z0-9]+(&[a-zA-Z0-9]+=[a-zA-Z0-9]+)*)?)?$/

  const match = bip21.match(bip21Pattern)

  if (match) {
    return {
      valid: true,
      address: match[1],
      message: 'Valid BIP21 URI.',
    }
  }

  return {
    valid: false,
    address: null,
    message: 'Invalid BIP21 URI.',
  }
}
