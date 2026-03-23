import { USDCents } from '@/types/index.ts'

import { ProjectLaunchStrategy } from '../views/LaunchStrategySelection.tsx'

export const LAUNCH_FEE_USD_CENTS: Record<ProjectLaunchStrategy, USDCents> = {
  [ProjectLaunchStrategy.STARTER_LAUNCH]: 2500 as USDCents, // 25 USD
  [ProjectLaunchStrategy.GROWTH_LAUNCH]: 6000 as USDCents, // 60 USD
  [ProjectLaunchStrategy.PRO_LAUNCH]: 9000 as USDCents, // 90 USD
}
