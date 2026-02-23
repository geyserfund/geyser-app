import { getShortAmountLabel } from '@/utils'

const satsFormatter = new Intl.NumberFormat()
const usdFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

type GetUSDAmountFn = (value: any) => number
type GetSatoshisFromUSDCentsFn = (value: any) => number

type GetCommittedAmountDisplayArgs<
  TGetUSDAmount extends GetUSDAmountFn,
  TGetSatoshisFromUSDCents extends GetSatoshisFromUSDCentsFn,
> = {
  amountCommitted?: number | null
  amountCommittedCurrency?: string | null
  usdRate: number
  getUSDAmount: TGetUSDAmount
  getSatoshisFromUSDCents: TGetSatoshisFromUSDCents
}

type GetSatsAmountDisplayArgs<TGetUSDAmount extends GetUSDAmountFn> = {
  amountSats?: number | null
  usdRate: number
  getUSDAmount: TGetUSDAmount
}

export type CommittedAmountDisplay = {
  primary: string
  secondary?: string
} | null

export function getSatsAmountDisplay<TGetUSDAmount extends GetUSDAmountFn>({
  amountSats,
  usdRate,
  getUSDAmount,
}: GetSatsAmountDisplayArgs<TGetUSDAmount>): CommittedAmountDisplay {
  if (amountSats === null || amountSats === undefined) {
    return null
  }

  const primary = `${satsFormatter.format(amountSats)} sats`

  if (usdRate <= 0) {
    return { primary }
  }

  return {
    primary,
    secondary: usdFormatter.format(getUSDAmount(amountSats as Parameters<TGetUSDAmount>[0])),
  }
}

export function getCommittedAmountDisplay<
  TGetUSDAmount extends GetUSDAmountFn,
  TGetSatoshisFromUSDCents extends GetSatoshisFromUSDCentsFn,
>({
  amountCommitted,
  amountCommittedCurrency,
  usdRate,
  getUSDAmount,
  getSatoshisFromUSDCents,
}: GetCommittedAmountDisplayArgs<TGetUSDAmount, TGetSatoshisFromUSDCents>): CommittedAmountDisplay {
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

    const convertedSats = getSatoshisFromUSDCents(amountCommitted as Parameters<TGetSatoshisFromUSDCents>[0])
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
