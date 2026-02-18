import { ProjectFundingStrategy } from '@/types'
import { FEATURE_FLAGS } from '@/shared/constants/config'

type PrismProject = {
  fundingStrategy?: ProjectFundingStrategy | null
  rskEoa?: string | null
}

export const isPrismEnabled = (project?: PrismProject | null): boolean => {
  if (!FEATURE_FLAGS.TIA_PRISM_PAYMENTS_ENABLED) return false
  return project?.fundingStrategy === ProjectFundingStrategy.TakeItAll && Boolean(project?.rskEoa)
}
