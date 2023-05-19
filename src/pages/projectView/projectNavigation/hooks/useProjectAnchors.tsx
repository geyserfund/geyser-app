import { RefObject, useCallback, useMemo } from 'react'

// import { useOnScreen } from '../../../../hooks/useOnScreen'
import { ProjectFragment } from '../../../../types'

export type ProjectAnchorRefs = {
  header: RefObject<HTMLDivElement>
  entries: RefObject<HTMLDivElement>
  rewards: RefObject<HTMLDivElement>
  milestones: RefObject<HTMLDivElement>
}

export type UseProjectAnchors = {
  // inView: keyof ProjectAnchorRefs
  // refInView: RefObject<HTMLDivElement>
  entriesLength: number
  rewardsLength: number
  milestonesLength: number
  onProjectClick(): void
  onEntriesClick(): void
  onRewardsClick(): void
  onMilestonesClick(): void
}

export const useProjectAnchors = (
  project: Pick<
    ProjectFragment,
    'entries' | 'rewards' | 'milestones'
  > | null = null,
  refs: ProjectAnchorRefs,
): UseProjectAnchors => {
  // const isHeaderView = useOnScreen(refs.header)
  // const isEntriesView = useOnScreen(refs.entries)
  // const isRewardsView = useOnScreen(refs.rewards)
  // const isMilestonesView = useOnScreen(refs.milestones)

  const entriesLength = useMemo(
    () => (project && project.entries ? project.entries.length : 0),
    [project],
  )
  const rewardsLength = useMemo(
    () => (project && project.rewards ? project.rewards.length : 0),
    [project],
  )
  const milestonesLength = useMemo(
    () => (project && project.milestones ? project.milestones.length : 0),
    [project],
  )

  const onProjectClick = useCallback(() => {
    refs.header.current?.scrollIntoView({ behavior: 'smooth' })
  }, [refs.header])

  const onEntriesClick = useCallback(() => {
    refs.entries.current?.scrollIntoView({ behavior: 'smooth' })
  }, [refs.entries])

  const onRewardsClick = useCallback(() => {
    refs.rewards.current?.scrollIntoView({ behavior: 'smooth' })
  }, [refs.rewards])

  const onMilestonesClick = useCallback(() => {
    refs.milestones.current?.scrollIntoView({ behavior: 'smooth' })
  }, [refs.milestones])

  // const [inView, refInView] = useMemo((): [
  //   keyof ProjectAnchorRefs,
  //   RefObject<HTMLDivElement>,
  // ] => {
  //   if (isHeaderView) {
  //     return ['header', refs.header]
  //   }

  //   if (isEntriesView) {
  //     return ['entries', refs.entries]
  //   }

  //   if (isRewardsView) {
  //     return ['rewards', refs.rewards]
  //   }

  //   return ['milestones', refs.milestones]
  // }, [
  //   isEntriesView,
  //   isHeaderView,
  //   isRewardsView,
  //   refs.entries,
  //   refs.header,
  //   refs.milestones,
  //   refs.rewards,
  // ])

  return {
    // inView,
    // refInView,
    entriesLength,
    rewardsLength,
    milestonesLength,
    onProjectClick,
    onEntriesClick,
    onRewardsClick,
    onMilestonesClick,
  }
}
