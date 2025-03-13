import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'

const MAX_LEVEL_1 = 1000000 // 10K $ in cents
const MAX_LEVEL_2 = 10000000 // 100K $ in cents

/** Hook that returns percentage and color to be used for funding limits and verification progress bar */
export const useWalletLimitProgressData = () => {
  const { project } = useProjectAtom()

  const percentageInitial = (project.balanceUsdCent / MAX_LEVEL_2) * 100

  const isLevel1 = project.balanceUsdCent <= MAX_LEVEL_1
  const isLevel3 = project.balanceUsdCent >= MAX_LEVEL_2

  const percentage = isLevel3
    ? percentageInitial
    : isLevel1
    ? percentageInitial * 3
    : 30 + ((project.balanceUsdCent - MAX_LEVEL_1) / (MAX_LEVEL_2 - MAX_LEVEL_1)) * 70

  const level1Color = percentage >= 29 ? 'error.9' : percentage > 25 ? 'warning.9' : 'primary1.9'
  const level2Color = percentage >= 99 ? 'error.9' : percentage > 90 ? 'warning.9' : 'primary1.9'

  const barColor = isLevel3 ? 'primary1.9' : isLevel1 ? level1Color : level2Color

  return {
    percentage,
    isLevel1,
    isLevel3,
    barColor,
  }
}
