import { ProjectFundingStrategy } from '@/types/index.ts'

type ProjectGoalsVisibilityProject = {
  fundingStrategy?: ProjectFundingStrategy | null
  goalsCount?: number | null
}

/** Returns whether public project goal UI should be visible for a project. */
export const shouldShowProjectGoals = (project?: ProjectGoalsVisibilityProject | null) => {
  return Boolean(project?.goalsCount) && project?.fundingStrategy !== ProjectFundingStrategy.AllOrNothing
}
