import { USDCents } from '@/types/index.ts'

export enum ProjectLaunchStrategy {
  STARTER_LAUNCH = 'STARTER_LAUNCH',
  GROWTH_LAUNCH = 'GROWTH_LAUNCH',
  PRO_LAUNCH = 'PRO_LAUNCH',
}

export const LAUNCH_FEE_USD_CENTS = {
  [ProjectLaunchStrategy.STARTER_LAUNCH]: 2500 as USDCents, // 25 USD
  [ProjectLaunchStrategy.GROWTH_LAUNCH]: 6000 as USDCents, // 60 USD
  [ProjectLaunchStrategy.PRO_LAUNCH]: 9000 as USDCents, // 90 USD
}

export const STARTER_LAUNCH_DISCOUNT_USD_CENTS = 1800 as USDCents // 18 USD

// Update or remove after the one-week Starter Launch discount ends.
export const STARTER_LAUNCH_DISCOUNT_END_AT = new Date('2026-02-04T23:59:59Z')

export const isStarterLaunchDiscountActive = (now: Date = new Date()) =>
  now.getTime() <= STARTER_LAUNCH_DISCOUNT_END_AT.getTime()

export const getLaunchFeeUsdCents = (strategy: ProjectLaunchStrategy, now: Date = new Date()) => {
  if (strategy === ProjectLaunchStrategy.STARTER_LAUNCH && isStarterLaunchDiscountActive(now)) {
    return STARTER_LAUNCH_DISCOUNT_USD_CENTS
  }

  return LAUNCH_FEE_USD_CENTS[strategy]
}
