import { RefObject, useMemo } from 'react'

import { ProjectFragment } from '../../../../types'

export type ProjectAnchorRefs = {
  header: RefObject<HTMLDivElement>
  entries: RefObject<HTMLDivElement>
  rewards: RefObject<HTMLDivElement>
  milestones: RefObject<HTMLDivElement>
}

export type ProjectDetails = {
  entriesLength: number
  rewardsLength: number
  productsLength: number
  milestonesLength: number
  rewardsEnabled: boolean
}

export const useProjectDetails = (
  project: Pick<
    ProjectFragment,
    'entries' | 'rewards' | 'products' | 'milestones' | 'rewardsEnabled'
  > | null = null,
): ProjectDetails => {
  const entriesLength = useMemo(
    () => (project && project.entries ? project.entries.length : 0),
    [project],
  )
  const rewardsLength = useMemo(
    () => (project && project.rewards ? project.rewards.length : 0),
    [project],
  )
  const productsLength = useMemo(
    () => (project && project.products ? project.products.length : 0),
    [project],
  )
  const milestonesLength = useMemo(
    () => (project && project.milestones ? project.milestones.length : 0),
    [project],
  )
  const rewardsEnabled = useMemo(
    () => (!!(project && project.rewardsEnabled)),
    [project],
  )

  return {
    entriesLength,
    rewardsLength,
    productsLength,
    milestonesLength,
    rewardsEnabled
  }
}
