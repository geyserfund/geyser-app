import type { BitcoinQuote } from '../../../../../../../src/types/generated/graphql.ts'
import { convertAmount } from '../../../../../../../src/utils'

export const calculateExpectedTotalUsdCent = (totalSats: number, bitcoinQuote: BitcoinQuote) => {
  return convertAmount.satsToUsdCents({ sats: totalSats, bitcoinQuote })
}
