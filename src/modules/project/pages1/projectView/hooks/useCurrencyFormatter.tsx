import { useCallback } from 'react'

import { useBTCConverter } from '../../../../../helpers'
import { Satoshis, USDCents } from '../../../../../types'
import { centsToDollars, commaFormatted } from '../../../../../utils'

export const useCurrencyFormatter = () => {
  const { getUSDCentsAmount, getSatoshisFromUSDCents } = useBTCConverter()

  type TCurrency = 'BTCSAT' | 'USDCENT'
  const Currency = {
    Btcsat: 'BTCSAT' as TCurrency,
    Usdcent: 'USDCENT' as TCurrency,
  }

  const formatAmount = useCallback(
    (amount: number, currency: TCurrency) => {
      if (currency === Currency.Btcsat) {
        if (amount === 0) return '0 sats'
        return `${commaFormatted(amount)} sats`
      }

      const usdAmount = centsToDollars(amount)
      if (amount === 0) return '$0'
      if (usdAmount < 1) return '< $1'
      return `$${commaFormatted(Math.round(usdAmount))}`
    },
    [Currency.Btcsat],
  )

  const formatUsdAmount = useCallback(
    (amount: number) => {
      const usdCentsAmount = getUSDCentsAmount(amount as Satoshis)
      return formatAmount(usdCentsAmount, Currency.Usdcent)
    },
    [Currency.Usdcent, formatAmount, getUSDCentsAmount],
  )

  const formatSatsAmount = useCallback(
    (amount: number) => {
      const satsAmount = getSatoshisFromUSDCents(amount as USDCents)
      return formatAmount(satsAmount, Currency.Btcsat)
    },
    [Currency.Btcsat, formatAmount, getSatoshisFromUSDCents],
  )

  return {
    formatAmount,
    formatUsdAmount,
    formatSatsAmount,
  }
}
