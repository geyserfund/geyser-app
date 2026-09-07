import { ProjectFundingStrategy } from '@/types'

type LegacyTiaProject = {
  fundingStrategy?: ProjectFundingStrategy | null
  isCircularGrant?: boolean | null
}

/** Ordinary TAKE_IT_ALL projects retained for historical wallet/recovery compatibility. */
export const isLegacyTiaProject = (project?: LegacyTiaProject | null): boolean => {
  return (
    project?.fundingStrategy === ProjectFundingStrategy.TakeItAll &&
    !project.isCircularGrant
  )
}
