import { getShortAmountLabel } from '@/utils/index.ts'

const satsFormatter = new Intl.NumberFormat()
const usdFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

type GetCommittedAmountDisplayArgs<TUsdAmount extends number, TSatoshisFromUSDCentsAmount extends number> = {
  amountCommitted?: number | null
  amountCommittedCurrency?: string | null
  usdRate: number
  getUSDAmount: (value: TUsdAmount) => number
  getSatoshisFromUSDCents: (value: TSatoshisFromUSDCentsAmount) => number
}

type GetSatsAmountDisplayArgs<TUsdAmount extends number> = {
  amountSats?: number | null
  usdRate: number
  getUSDAmount: (value: TUsdAmount) => number
}

export type CommittedAmountDisplay = {
  primary: string
  secondary?: string
} | null

export function getSatsAmountDisplay<TUsdAmount extends number>({
  amountSats,
  usdRate,
  getUSDAmount,
}: GetSatsAmountDisplayArgs<TUsdAmount>): CommittedAmountDisplay {
  if (amountSats === null || amountSats === undefined) {
    return null
  }

  const primary = `${satsFormatter.format(amountSats)} sats`

  if (usdRate <= 0) {
    return { primary }
  }

  return {
    primary,
    secondary: usdFormatter.format(getUSDAmount(amountSats as TUsdAmount)),
  }
}

export const getCommittedAmountDisplay = <TUsdAmount extends number, TSatoshisFromUSDCentsAmount extends number>({
  amountCommitted,
  amountCommittedCurrency,
  usdRate,
  getUSDAmount,
  getSatoshisFromUSDCents,
}: GetCommittedAmountDisplayArgs<TUsdAmount, TSatoshisFromUSDCentsAmount>): CommittedAmountDisplay => {
  if (amountCommitted === null || amountCommitted === undefined) {
    return null
  }

  if (amountCommitted === 0) {
    return null
  }

  if (amountCommittedCurrency === 'USDCENT') {
    const primary = usdFormatter.format(amountCommitted / 100)

    if (usdRate <= 0) {
      return { primary }
    }

    const convertedSats = getSatoshisFromUSDCents(amountCommitted as TSatoshisFromUSDCentsAmount)
    return {
      primary,
      secondary: `${getShortAmountLabel(convertedSats, true)} sats`,
    }
  }

  return getSatsAmountDisplay({
    amountSats: amountCommitted,
    usdRate,
    getUSDAmount,
  })
}
