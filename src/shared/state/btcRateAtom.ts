import { atom } from 'jotai'

import { BitcoinQuote, QuoteCurrency } from '@/types/index.ts'

/** Atom for storing the USD rate for 1 SATOSHI */
export const btcRateAtom = atom(0)

/** Atom for storing USD rate for 1 BTC */
export const usdRateAtom = atom(0)

export const bitcoinQuoteAtom = atom<BitcoinQuote>((get) => {
  const usdRate = get(usdRateAtom)

  return { quote: usdRate, quoteCurrency: QuoteCurrency.Usd }
})
