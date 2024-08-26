import { BitcoinQuote } from '@/types'

import { SATOSHIS_IN_BTC } from '../../shared/constants'
import { Satoshis } from '../../types/types'

export function convertToBTC(satoshis: Satoshis): number {
  return satoshis / SATOSHIS_IN_BTC
}

/** Converts sats to usd based on BitcoinQuote of a fundingTx */
export const convertSatsToUsd = ({ sats, bitcoinQuote }: { sats: number; bitcoinQuote?: BitcoinQuote | null }) => {
  if (bitcoinQuote && bitcoinQuote.quote) {
    const dollars = convertToBTC(sats as Satoshis) / bitcoinQuote.quote
    return dollars.toFixed(1)
  }

  return 0
}

/** Converts sats to usdcents based on BitcoinQuote of a fundingTx */
export const convertSatsToCents = ({ sats, bitcoinQuote }: { sats: number; bitcoinQuote?: BitcoinQuote | null }) => {
  if (bitcoinQuote && bitcoinQuote.quote) {
    const dollars = convertToBTC(sats as Satoshis) / bitcoinQuote.quote
    const cents = Math.round(dollars * 100)
    return cents
  }

  return 0
}
