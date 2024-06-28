import { Maybe } from 'yup'

import { Satoshis, USDCents, USDollars } from '../../types'

export const commaFormatted = (amount?: Maybe<number | USDollars | Satoshis | USDCents>) =>
  amount ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''

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

export const getShortAmountLabel = (amount: number, decimal?: boolean) => {
  let result = 0
  let divisor = 1
  let symbol = ''
  let rest = 0

  if (amount < 1000) {
    result = amount
  }

  if (amount >= 1000 && amount < 1000000) {
    divisor = 1000
    symbol = 'K'
    rest = ((amount % divisor) / divisor) * 10
    result = Math.floor(amount / divisor)
  }

  if (amount >= 1000000 && amount < 1000000000) {
    divisor = 1000000
    symbol = 'M'
    rest = ((amount % divisor) / divisor) * 10
    result = Math.floor(amount / divisor)
  }

  if (amount >= 1000000000 && amount < 1000000000000) {
    divisor = 1000000000
    symbol = 'B'
    rest = ((amount % divisor) / divisor) * 10
    result = Math.floor(amount / divisor)
  }

  if (amount >= 1000000000000) {
    divisor = 1000000000000
    symbol = 'T'
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

export const dollarsToCents = (dollars: number): number => {
  return Math.round(dollars * 100)
}

export const centsToDollars = (cents: number): number => {
  return Math.round(cents / 100)
}
