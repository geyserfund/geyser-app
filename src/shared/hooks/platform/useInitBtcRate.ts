import { useSetAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useEffect } from 'react'

import { fetchBitcoinRates } from '@/api'
import { BTC_IN_SATOSHI } from '@/shared/constants'
import { btcRateAtom, usdRateAtom } from '@/shared/state/btcRateAtom'
import { getLocalStorageItem, setLocalStorageItem } from '@/shared/utils/browserStorage.ts'

const USD_QUOTE_KEY = 'usdQuote'

const A_MINUTE_IN_MILIS = 1000 * 60
const RETRY_FETCH_BTC_RATE_AFTER_MILIS = 1000 * 5
const MAX_RETRIES = 5

const getRateFromLocalStorage = () => {
  const values = getLocalStorageItem(USD_QUOTE_KEY)?.split('::')
  const usdRate = Number(values?.[0])
  const timeLineMilis = Number(values?.[1])

  let isOld = true

  if (!usdRate || !timeLineMilis) {
    return { usdRate: 0, isOld: false }
  }

  const now = DateTime.local().toMillis()

  if (now - timeLineMilis < A_MINUTE_IN_MILIS) {
    isOld = false
  }

  return { usdRate, isOld }
}

const storeRateToLocalStorage = (usdRate: number) => {
  const newDate = DateTime.local().toMillis()

  setLocalStorageItem(USD_QUOTE_KEY, `${String(usdRate)}::${newDate}`)
}

export const useInitBtcRate = () => {
  const setBtcRate = useSetAtom(btcRateAtom)
  const setUsdRate = useSetAtom(usdRateAtom)

  useEffect(() => {
    let cancelled = false
    let retries = 0
    let succeeded = false

    const applyUsdRate = (usdRate: number) => {
      const satoshirate = usdRate * BTC_IN_SATOSHI
      setBtcRate(satoshirate)
      setUsdRate(usdRate)
    }

    const getBitcoinRates = async () => {
      if (cancelled || succeeded) return

      const usdRate = await fetchBitcoinRates({ currency: 'usd' })
      if (cancelled || succeeded) return

      if (usdRate) {
        succeeded = true
        applyUsdRate(usdRate)
        storeRateToLocalStorage(usdRate)
        clearInterval(intervalId)
        return
      }

      const localValues = getRateFromLocalStorage()
      if (localValues.usdRate) {
        applyUsdRate(localValues.usdRate)
      }

      if (!((localValues.isOld && retries < MAX_RETRIES) || !localValues.usdRate)) {
        clearInterval(intervalId)
      }
    }

    const intervalId = setInterval(() => {
      if (cancelled || succeeded) {
        clearInterval(intervalId)
        return
      }

      retries += 1
      if (retries > MAX_RETRIES) {
        clearInterval(intervalId)
        return
      }

      void getBitcoinRates()
    }, RETRY_FETCH_BTC_RATE_AFTER_MILIS)

    void getBitcoinRates()

    return () => {
      cancelled = true
      clearInterval(intervalId)
    }
  }, [setBtcRate, setUsdRate])
}
