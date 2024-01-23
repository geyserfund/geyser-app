export const getUSD = (sats: number, bitcoinQuote?: number) => {
  if (!bitcoinQuote) return 'NAN'
  if (!sats) return '0'
  const total = sats / bitcoinQuote
  if (total > 1) {
    return `$${total.toFixed(2)}`
  }

  return '< $1'
}
