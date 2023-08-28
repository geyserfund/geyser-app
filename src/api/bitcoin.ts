const USD_QUOTE_KEY = 'usdQuote'
const BACKUP_QUOTE = 26088
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

  let usdQuote = Number(await Promise.any(requests))

  if (!usdQuote) {
    usdQuote = Number(localStorage.getItem(USD_QUOTE_KEY)) || 0
  }

  if (!usdQuote) {
    alert('Failed to fetch bitcoin rates')
    usdQuote = BACKUP_QUOTE
  }

  localStorage.setItem(USD_QUOTE_KEY, String(usdQuote))

  return usdQuote
}

export const fetchBitcoinRates = ({ currency: _ }: { currency: 'usd' }) =>
  getUsdQuote()
