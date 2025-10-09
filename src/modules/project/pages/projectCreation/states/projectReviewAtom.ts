import { atom } from 'jotai'

import { ProjectReviewFragment } from '@/types/index.ts'

export const projectReviewsAtom = atom<ProjectReviewFragment[]>([])

export const latestProjectReviewAtom = atom<ProjectReviewFragment | undefined>((get) => {
  const projectReviews = get(projectReviewsAtom)
  if (projectReviews.length === 0) return undefined
  return [...projectReviews].sort((a, b) => (b.version ?? 0) - (a.version ?? 0))[0] || undefined
})

export const addProjectReviewAtom = atom(null, (get, set, review: ProjectReviewFragment) => {
  const projectReviews = get(projectReviewsAtom)
  set(projectReviewsAtom, [...projectReviews, review])
})
