import { useCallback } from 'react'

import { useBTCConverter } from '../../../../../helpers'
import { ProjectGoalCurrency, Satoshis, USDCents } from '../../../../../types'
import { centsToDollars, commaFormatted } from '../../../../../utils'

export const useCurrencyFormatter = () => {
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const formatAmount = useCallback((amount: number, currency: ProjectGoalCurrency) => {
    if (currency === ProjectGoalCurrency.Btcsat) {
      return commaFormatted(amount)
    }

    return commaFormatted(centsToDollars(amount))
  }, [])

  const formatUsdAmount = useCallback(
    (amount: number) => {
      const usdAmount = getUSDAmount(amount as Satoshis)
      if (usdAmount < 1) return '$0'
      return `$${commaFormatted(Math.round(usdAmount))}`
    },
    [getUSDAmount],
  )

  const formatSatsAmount = useCallback(
    (amount: number) => {
      const satsAmount = getSatoshisFromUSDCents(amount as USDCents)
      if (satsAmount < 1) return '0 sats'
      return `${commaFormatted(Math.round(satsAmount))} sats`
    },
    [getSatoshisFromUSDCents],
  )

  return {
    formatAmount,
    formatUsdAmount,
    formatSatsAmount,
  }
}
