import { atom } from 'jotai'

import { projectAtom } from '@/modules/project/state/projectAtom.ts'
import { ProjectReviewFragment, ProjectReviewPublicFragment, ProjectReviewStatus, ProjectStatus } from '@/types/index.ts'

export const projectReviewsAtom = atom<ProjectReviewFragment[]>([])

export const NOT_SUBMITTED_REVIEW_STATUS = 'NOT_SUBMITTED' as const

export type ProjectReviewStatusWithFallback = ProjectReviewStatus | typeof NOT_SUBMITTED_REVIEW_STATUS

export const latestProjectReviewAtom = atom<ProjectReviewFragment | undefined>((get) => {
  const projectReviews = get(projectReviewsAtom)
  if (projectReviews.length === 0) return undefined
  return [...projectReviews].sort((a, b) => (b.version ?? 0) - (a.version ?? 0))[0] || undefined
})

export const addProjectReviewAtom = atom(null, (get, set, review: ProjectReviewFragment) => {
  const projectReviews = get(projectReviewsAtom)
  set(projectReviewsAtom, [...projectReviews, review])
})

const getLatestReviewStatus = (
  reviews: Array<Pick<ProjectReviewFragment | ProjectReviewPublicFragment, 'status' | 'version'>>,
): ProjectReviewStatusWithFallback => {
  if (reviews.length === 0) {
    return NOT_SUBMITTED_REVIEW_STATUS
  }

  const latestReview = [...reviews].sort((a, b) => (b.version ?? 0) - (a.version ?? 0))[0]
  return latestReview?.status || NOT_SUBMITTED_REVIEW_STATUS
}

export const latestProjectReviewStatusAtom = atom<ProjectReviewStatusWithFallback>((get) => {
  const projectReviews = get(projectReviewsAtom)
  if (projectReviews.length > 0) {
    return getLatestReviewStatus(projectReviews)
  }

  const projectReviewsFromProject = get(projectAtom)?.reviews || []
  return getLatestReviewStatus(projectReviewsFromProject)
})

export const isLatestReviewInReviewAtom = atom((get) => {
  return get(latestProjectReviewStatusAtom) === ProjectReviewStatus.Pending
})

export const isLatestReviewRevisionsRequestedAtom = atom((get) => {
  return get(latestProjectReviewStatusAtom) === ProjectReviewStatus.RevisionsRequested
})

/** Controls whether creation review lock is active for the scoped creation container store. */
export const creationReviewLockEnabledAtom = atom(false)

export const isProjectCreationEditLockedAtom = atom((get) => {
  if (!get(creationReviewLockEnabledAtom)) {
    return false
  }

  if (get(isLatestReviewRevisionsRequestedAtom)) {
    return false
  }

  return get(projectAtom)?.status === ProjectStatus.InReview && get(isLatestReviewInReviewAtom)
})
