import { BitcoinQuote } from '@/types'

import { SATOSHIS_IN_BTC } from '../../shared/constants'
import { Satoshis } from '../../types/types'

export function convertToBTC(satoshis: Satoshis): number {
  return satoshis / SATOSHIS_IN_BTC
}

/** Converts usd to sats based on BitcoinQuote of a fundingTx */
export const convertSatsToUsd = ({ sats, bitcoinQuote }: { sats: number; bitcoinQuote?: BitcoinQuote | null }) => {
  if (bitcoinQuote && bitcoinQuote.quote) {
    const dollars = sats / bitcoinQuote.quote
    return `($${dollars.toFixed(1)})`
  }

  return ''
}
