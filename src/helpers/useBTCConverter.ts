import { useAtomValue } from 'jotai'
import { useCallback } from 'react'

import { btcRateAtom } from '@/shared/state/btcRateAtom'

import type { Satoshis, USDCents, USDollars } from '../types/types'

const toSatoshisNumber = (satoshis: number | bigint): number => {
  return typeof satoshis === 'bigint' ? Number(satoshis) : satoshis
}

export const useBTCConverter = () => {
  const btcRate = useAtomValue(btcRateAtom)

  const getUSDAmount = useCallback(
    (satoshis: number | bigint): USDollars => {
      const satoshisNumber = toSatoshisNumber(satoshis)

      return satoshisNumber * btcRate > 0
        ? (Math.round(satoshisNumber * btcRate) as USDollars)
        : ((satoshisNumber * btcRate) as USDollars)
    },
    [btcRate],
  )

  const getUSDCentsAmount = useCallback(
    (satoshis: number | bigint): USDCents => {
      const satoshisNumber = toSatoshisNumber(satoshis)

      return (satoshisNumber * btcRate * 100) as USDCents
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
    /** Convert given amount from sats to USD */
    getUSDAmount,
    /** Convert given amount from sats to USDCents */
    getUSDCentsAmount,
    /** Convert given amount from USDCents to sats */
    getSatoshisFromUSDCents,
  }
}
