import { ProjectFundingStrategy } from '@/types'

type PrismProject = {
  fundingStrategy?: ProjectFundingStrategy | null
  rskEoa?: string | null
}

export const isPrismEnabled = (project?: PrismProject | null): boolean => {
  return project?.fundingStrategy === ProjectFundingStrategy.TakeItAll && Boolean(project?.rskEoa)
}
