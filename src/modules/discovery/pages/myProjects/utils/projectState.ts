import type { ProjectForMyProjectsFragment } from '@/types/index.ts'
import { ProjectStatus } from '@/types/index.ts'

type ProjectLaunchStateInput = Pick<ProjectForMyProjectsFragment, 'launchedAt' | 'status'>

/** Returns whether the project has already been launched. */
export const isProjectLaunched = (project: ProjectLaunchStateInput): boolean => {
  return Boolean(project.launchedAt)
}

/** Returns whether the project is still in the pre-launch review flow. */
export const isProjectInPreLaunchReview = (project: ProjectLaunchStateInput): boolean => {
  return project.status === ProjectStatus.InReview && !isProjectLaunched(project)
}

/** Returns whether the project re-entered review after launch. */
export const isProjectInPostLaunchReview = (project: ProjectLaunchStateInput): boolean => {
  return project.status === ProjectStatus.InReview && isProjectLaunched(project)
}

/** Returns whether the project should still route creators back through launch finalization. */
export const isProjectPendingLaunch = (project: ProjectLaunchStateInput): boolean => {
  return (
    project.status === ProjectStatus.Draft ||
    project.status === ProjectStatus.Accepted ||
    isProjectInPreLaunchReview(project)
  )
}
