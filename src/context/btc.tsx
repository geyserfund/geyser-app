import { DateTime } from 'luxon'
import { createContext, useContext, useEffect, useState } from 'react'

import { fetchBitcoinRates } from '../api'
import { BTC_IN_SATOSHI } from '../shared/constants'

const USD_QUOTE_KEY = 'usdQuote'

const defaultContext = {
  btcRate: 0,
  usdRate: 0,
}

interface IBtcContext {
  /**
   * TODO: We should be more clear about how this "rate" is denominated.
   * And it should be the inverse of a "satoshi rate". (Currently, it's being
   * set to match the "satoshi rate")
   *
   * (See: https://github.com/geyserfund/geyser-app/pull/361#discussion_r999694992)
   */
  btcRate: number
  /** value of 1 bitcoin in USD */
  usdRate: number
}

const A_MINUTE_IN_MILIS = 1000 * 60
const RETRY_FETCH_BTC_RATE_AFTER_MILIS = 1000 * 5

const BtcContext = createContext<IBtcContext>(defaultContext)

export const BtcProvider = ({ children }: { children: React.ReactNode }) => {
  const [btcRate, setBtcRate] = useState(0)
  const [usdRate, setUsdRate] = useState(0)

  const getRateFromLocalStorage = () => {
    const values = localStorage.getItem(USD_QUOTE_KEY)?.split('::')
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

    localStorage.setItem(USD_QUOTE_KEY, `${String(usdRate)}::${newDate}`)
  }

  useEffect(() => {
    let retries = 0
    const maxRetires = 5

    const getBitcoinRates = async () => {
      const usdRate = await fetchBitcoinRates({ currency: 'usd' })
      if (!usdRate) {
        const localValues = getRateFromLocalStorage()

        if (localValues.usdRate) {
          const satoshirate = localValues.usdRate * BTC_IN_SATOSHI
          setBtcRate(satoshirate)
          setUsdRate(localValues.usdRate)
        }

        if ((localValues.isOld && retries < maxRetires) || !localValues.usdRate) {
          setTimeout(() => {
            retries += 1
            getBitcoinRates()
          }, RETRY_FETCH_BTC_RATE_AFTER_MILIS)
        }
      } else {
        const satoshirate = usdRate * BTC_IN_SATOSHI
        setBtcRate(satoshirate)
        setUsdRate(usdRate)
        storeRateToLocalStorage(usdRate)
      }
    }

    getBitcoinRates()
  }, [])

  return <BtcContext.Provider value={{ btcRate, usdRate }}>{children}</BtcContext.Provider>
}

export const useBtcContext = () => useContext(BtcContext)
