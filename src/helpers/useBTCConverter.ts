import { useCallback } from 'react'

import { useBtcContext } from '../context/btc'
import { Satoshis, USDCents, USDollars } from '../types/types'

export const useBTCConverter = () => {
  const { btcRate } = useBtcContext()

  const getUSDAmount = useCallback(
    (satoshis: Satoshis): USDollars => {
      return (satoshis * btcRate) as USDollars
    },
    [btcRate],
  )

  const getUSDCentsAmount = useCallback(
    (satoshis: Satoshis): USDCents => {
      return (satoshis * btcRate * 100) as USDCents
    },
    [btcRate],
  )

  const getSatoshisFromUSDCents = useCallback(
    (usdCents: USDCents): Satoshis => {
      return Math.round(usdCents / 100 / btcRate) as Satoshis
    },
    [btcRate],
  )

  return {
    getUSDAmount,
    getUSDCentsAmount,
    getSatoshisFromUSDCents,
  }
}
