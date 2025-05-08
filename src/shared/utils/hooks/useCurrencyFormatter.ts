import { useCallback } from 'react'

import { useBTCConverter } from '../../../helpers'
import { Satoshis, USDCents } from '../../../types'
import { centsToDollars, commaFormatted, getShortAmountLabel } from '../../../utils'

export enum FormatCurrencyType {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT',
  Usd = 'USD',
}

type TCurrency = 'BTCSAT' | 'USDCENT' | 'USD'

/**
 * Format given amount with given currency type
 * @description Uses current BTC rates to show the converted amount
 * @param shortAmount - Whether to use short amount labels
 * @returns - Formatted amount
 */
export const useCurrencyFormatter = (shortAmount?: boolean) => {
  const { getUSDCentsAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const formatAmount = useCallback(
    (amount: number, currency: TCurrency) => {
      if (currency === FormatCurrencyType.Btcsat) {
        if (amount === 0) return '0 sats'

        if (shortAmount) {
          const shortSatsAmount = getShortAmountLabel(amount)
          return `${shortSatsAmount} sats`
        }

        return `${commaFormatted(amount)} sats`
      }

      let usdAmount = amount

      if (currency === FormatCurrencyType.Usdcent) {
        usdAmount = centsToDollars(amount)
      }

      if (amount === 0) return '$0'
      if (usdAmount < 1) return '<$1'
      if (shortAmount) {
        const roundedUsdAmount = Math.round(usdAmount)
        const shortUsdAmount = getShortAmountLabel(roundedUsdAmount)
        return `$${shortUsdAmount}`
      }

      return `$${commaFormatted(Math.round(usdAmount))}`
    },
    [shortAmount],
  )

  const formatUsdAmount = useCallback(
    (amount: number) => {
      const usdCentsAmount = getUSDCentsAmount(amount as Satoshis)
      return formatAmount(usdCentsAmount, FormatCurrencyType.Usdcent)
    },
    [formatAmount, getUSDCentsAmount],
  )

  const formatSatsAmount = useCallback(
    (amount: number) => {
      const satsAmount = getSatoshisFromUSDCents(amount as USDCents)
      return formatAmount(satsAmount, FormatCurrencyType.Btcsat)
    },
    [formatAmount, getSatoshisFromUSDCents, shortAmount],
  )

  return {
    /** Format given amount with given currency type */
    formatAmount,
    /** Convert given amount from sats to USD and format it */
    formatUsdAmount,
    /** Convert given amount from USDCents to sats and format it */
    formatSatsAmount,
  }
}
