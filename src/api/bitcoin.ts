import { captureException } from '@sentry/react'

const quoteSources = [
  {
    name: 'blockchain.info',
    url: 'https://blockchain.info/ticker',
    lastPrice: (response: any) => Number(response.USD.last),
  },
  {
    name: 'bitstamp',
    url: 'https://www.bitstamp.net/api/v2/ticker/btcusd/',
    lastPrice: (response: any) => Number(response.last),
  },
]

const getUsdQuote = async (): Promise<number> => {
  const requests = quoteSources.map(
    ({ url, lastPrice }) =>
      new Promise((resolve, reject) => {
        fetch(url)
          .then((response: Response) => response.json())
          .then((response: any) => resolve(lastPrice(response)))
          .catch((error: Error) => reject(error))
      }),
  )

  const usdQuote = Number(await Promise.any(requests).catch((error) => captureException(error))) || 0

  return usdQuote
}

export const fetchBitcoinRates = ({ currency: _ }: { currency: 'usd' }) => getUsdQuote()

export const getBlockHeight = async (): Promise<number> => {
  const response = await fetch('https://blockstream.info/api/blocks/tip/height')
  const data = await response.json()

  return data
}
