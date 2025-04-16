import { commaFormatted } from '@/shared/utils/formatData'
import { BitcoinQuote } from '@/types'

import { SATOSHIS_IN_BTC } from '../../shared/constants'
import { Satoshis } from '../../types/types'
import { toFloat } from './typeConversion'

export function convertToBTC(satoshis: Satoshis): number {
  return satoshis / SATOSHIS_IN_BTC
}

/** Converts sats to usd based on BitcoinQuote of a Contribution */
export const convertSatsToUsd = ({ sats, bitcoinQuote }: { sats: number; bitcoinQuote?: BitcoinQuote | null }) => {
  if (bitcoinQuote && bitcoinQuote.quote) {
    const dollars = convertToBTC(sats as Satoshis) * bitcoinQuote.quote

    return dollars > 0 ? Math.round(dollars) : toFloat(dollars.toFixed(2))
  }

  return 0
}

/** Converts sats to usd based on BitcoinQuote of a Contribution, and comma formats */
export const convertSatsToUsdFormatted = ({
  sats,
  bitcoinQuote,
}: {
  sats: number
  bitcoinQuote?: BitcoinQuote | null
}) => {
  if (bitcoinQuote && bitcoinQuote.quote && sats) {
    const dollars = convertToBTC(sats as Satoshis) * bitcoinQuote.quote

    const value = dollars > 0 ? Math.round(dollars) : toFloat(dollars.toFixed(2))

    const valueToReturn = value > 0.1 ? `$${commaFormatted(value)}` : '< $1'

    return valueToReturn
  }

  return `$0`
}

export const convertUsdCentsToSatsFormatted = ({
  usdCents,
  bitcoinQuote,
}: {
  usdCents: number
  bitcoinQuote?: BitcoinQuote | null
}) => {
  if (bitcoinQuote && bitcoinQuote.quote) {
    const sats = Math.round((usdCents / (100 * bitcoinQuote.quote)) * SATOSHIS_IN_BTC)
    return sats > 0 ? `${sats} sats ` : '0'
  }

  return 0
}

/** Converts sats to usdcents based on BitcoinQuote of a Contribution */
export const convertSatsToCents = ({ sats, bitcoinQuote }: { sats: number; bitcoinQuote?: BitcoinQuote | null }) => {
  if (bitcoinQuote && bitcoinQuote.quote) {
    const dollars = convertToBTC(sats as Satoshis) * bitcoinQuote.quote
    const cents = Math.round(dollars * 100)
    return cents
  }

  return 0
}
