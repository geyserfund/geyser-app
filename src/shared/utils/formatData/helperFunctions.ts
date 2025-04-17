import { Maybe } from 'yup'

import { Satoshis, USDCents, USDollars } from '@/types'

export const commaFormatted = (amount?: Maybe<number | USDollars | Satoshis | USDCents>) => {
  if (amount === 0) {
    return '0'
  }

  if (!amount) {
    return ''
  }

  let [wholePart, decimalPart] = amount.toString().split('.')

  // Add commas to the whole part
  wholePart = wholePart ? wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''

  // Combine the whole part with the decimal part (if it exists)
  return decimalPart ? `${wholePart}.${decimalPart}` : wholePart
}

export const getBitcoinAmount = (amount: number, decimal?: boolean) => {
  const divisor = 100000000
  const rest = amount % divisor
  const result = Math.floor(amount / divisor)

  const restValueInFirstDigitBTC = Math.round((rest / divisor) * 10)

  const restDigit = restValueInFirstDigitBTC.toString().charAt(0)

  if (decimal && Number(restDigit)) {
    return `${result}.${restDigit}`
  }

  return `${result}`
}

export const getShortAmountLabel = (amount: number, decimal?: boolean, lowerCase?: boolean) => {
  let result = 0
  let divisor = 1
  let symbol = ''
  let rest = 0

  if (amount < 1000) {
    result = amount
  }

  if (amount >= 1000 && amount < 1000000) {
    divisor = 1000
    symbol = lowerCase ? 'k' : 'K'
    rest = ((amount % divisor) / divisor) * 10
    result = Math.floor(amount / divisor)
  }

  if (amount >= 1000000 && amount < 1000000000) {
    divisor = 1000000
    symbol = lowerCase ? 'm' : 'M'
    rest = ((amount % divisor) / divisor) * 10
    result = Math.floor(amount / divisor)
  }

  if (amount >= 1000000000 && amount < 1000000000000) {
    divisor = 1000000000
    symbol = lowerCase ? 'b' : 'B'
    rest = ((amount % divisor) / divisor) * 10
    result = Math.floor(amount / divisor)
  }

  if (amount >= 1000000000000) {
    divisor = 1000000000000
    symbol = lowerCase ? 't' : 'T'
    rest = ((amount % divisor) / divisor) * 10
    result = Math.floor(amount / divisor)
  }

  const restDigit = rest.toString().charAt(0)

  if (decimal && Number(restDigit)) {
    return `${result}.${restDigit}${symbol}`
  }

  return `${result}${symbol}`
}

export const validateFundingAmount = (amount: number, btcRate: number) => {
  if (amount * btcRate > 10000) {
    return 'Payment above $10000 is not allowed at the moment. Please update the amount, or contact us for donating a higher amount'
  }

  if (amount < 1) {
    return 'Payment below 1 sats is not allowed at the moment. Please update the amount'
  }
}

export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

/** Used for amount calculation, precision needed */
export const dollarsToCents = (dollars: number): number => {
  return dollars * 100
}

/** Used for amount calculation, precision needed */
export const centsToDollars = (cents: number): number => {
  return cents / 100
}
