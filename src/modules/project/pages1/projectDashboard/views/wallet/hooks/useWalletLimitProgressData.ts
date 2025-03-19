import { useAtomValue } from 'jotai'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import {
  hasProjectFundingLimitAlmostReachedAtom,
  hasProjectFundingLimitReachedAtom,
} from '@/modules/project/state/projectVerificationAtom.ts'

const MAX_LEVEL_1 = 1000000 // 10K $ in cents
const MAX_LEVEL_2 = 10000000 // 100K $ in cents

/** Hook that returns percentage and color to be used for funding limits and verification progress bar */
export const useWalletLimitProgressData = () => {
  const { project } = useProjectAtom()

  const hasFundingLimitReached = useAtomValue(hasProjectFundingLimitReachedAtom)
  const hasFundingLimitAlmostReached = useAtomValue(hasProjectFundingLimitAlmostReachedAtom)

  const percentageInitial = (project.balanceUsdCent / MAX_LEVEL_2) * 100

  const isLevel1 = project.balanceUsdCent <= MAX_LEVEL_1
  const isLevel3 = project.balanceUsdCent >= MAX_LEVEL_2

  const percentage = isLevel3
    ? percentageInitial
    : isLevel1
    ? percentageInitial * 3
    : 30 + ((project.balanceUsdCent - MAX_LEVEL_1) / (MAX_LEVEL_2 - MAX_LEVEL_1)) * 70

  const barColor = hasFundingLimitReached ? 'orange.9' : hasFundingLimitAlmostReached ? 'warning.9' : 'primary1.9'

  return {
    percentage,
    isLevel1,
    isLevel3,
    barColor,
  }
}
