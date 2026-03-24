export const GEYSER_PLATFORM_FEE_RATE = 0.05
export const GEYSER_PROMOTION_FEE_RATE = 0.1

const percentFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
})

export const getEffectiveAffiliatePayoutRate = (payoutRate: number, feeRate: number) => payoutRate * feeRate

export const formatEffectiveAffiliatePayoutRate = (payoutRate: number, feeRate: number) =>
  `${percentFormatter.format(getEffectiveAffiliatePayoutRate(payoutRate, feeRate) * 100)}%`
