import { AxiosResponse } from 'axios'
import axios from 'axios'

const quoteSources = [
  {
    name: 'bitstamp',
    url: 'https://www.bitstamp.net/api/v2/ticker/btcusd/',
    lastPrice: (response: AxiosResponse) => Number(response.data.last),
  },
  {
    name: 'bitfinex',
    url: 'https://api-pub.bitfinex.com/v2/ticker/tBTCUSD',
    lastPrice: (response: AxiosResponse) => Number(response.data[6]),
  },
]

const getUsdQuote = async (): Promise<number> => {
  const requests = quoteSources.map(
    ({ url, lastPrice }) =>
      new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((response: AxiosResponse) => resolve(lastPrice(response)))
          .catch((error: Error) => reject(error))
      }),
  )

  const usdQuote = (await Promise.any(requests)) as number

  if (!usdQuote) throw new Error('Could not get bitcoin/usd quote')

  return usdQuote
}

export const fetchBitcoinRates = ({ currency: _ }: { currency: 'usd' }) =>
  getUsdQuote()
