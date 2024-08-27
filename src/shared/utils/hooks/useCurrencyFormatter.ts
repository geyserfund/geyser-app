import { useCallback } from 'react'

import { useBTCConverter } from '../../../helpers'
import { Satoshis, USDCents } from '../../../types'
import { centsToDollars, commaFormatted } from '../../../utils'

export enum FormatCurrencyType {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT',
  Usd = 'USD',
}

type TCurrency = 'BTCSAT' | 'USDCENT' | 'USD'

export const useCurrencyFormatter = () => {
  const { getUSDCentsAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const formatAmount = useCallback((amount: number, currency: TCurrency) => {
    if (currency === FormatCurrencyType.Btcsat) {
      if (amount === 0) return '0 sats'
      return `${commaFormatted(amount)} sats`
    }

    let usdAmount = amount

    if (currency === FormatCurrencyType.Usdcent) {
      usdAmount = centsToDollars(amount)
    }

    if (amount === 0) return '$0'
    if (usdAmount < 1) return '< $1'
    return `$${commaFormatted(Math.round(usdAmount))}`
  }, [])

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
    [formatAmount, getSatoshisFromUSDCents],
  )

  return {
    formatAmount,
    formatUsdAmount,
    formatSatsAmount,
  }
}
