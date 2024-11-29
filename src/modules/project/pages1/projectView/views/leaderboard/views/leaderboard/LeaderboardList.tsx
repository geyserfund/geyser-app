import { StackProps, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useEffect } from 'react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ContributorsListFamily } from '@/modules/project/state/contributionsAtom'
import { ProjectLeaderboardPeriod, useProjectLeaderboardContributorsGetQuery } from '@/types'

import { NoContribution } from '../../../body/sections/leaderboardSummary/components/NoContribution'
import { LeaderboardItem, LeaderboardItemSkeleton } from './components/LeaderboardItem'

export const MAXIMUM_LEADERBOARD_ITEMS = 100

type LeaderboardListProps = {
  period: ProjectLeaderboardPeriod
  dateTime: DateTime
} & StackProps

export const LeaderboardList = ({ period, dateTime, ...props }: LeaderboardListProps) => {
  const { project } = useProjectAtom()

  const [contributors, setContributors] = useAtom(ContributorsListFamily({ period }))

  const { loading } = useProjectLeaderboardContributorsGetQuery({
    skip: !project.id,
    variables: {
      input: {
        period,
        projectId: project.id,
        top: MAXIMUM_LEADERBOARD_ITEMS,
      },
    },
    onCompleted(data) {
      setContributors(data?.projectLeaderboardContributorsGet || [])
    },
  })

  const id = 'leaderboard-scroll-container'
  const firstElementId = 'first-element-id'

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById(id)
      element?.scrollTo(0, 0)
      window.scrollTo(0, 0)
    }, 50)
  }, [period])

  if (loading) {
    return <LeaderboardListSkeleton />
  }

  if (!contributors || contributors?.length === 0) {
    return <NoContribution />
  }

  return (
    <VStack w="full" h="full" id={id} overflowY={{ base: undefined, lg: 'auto' }} {...props}>
      {contributors.map((contributor, index) => {
        return (
          <LeaderboardItem
            id={index === 0 ? firstElementId : undefined}
            key={contributor.funderId}
            funder={contributor}
            rank={index + 1}
            paddingX={{ base: 0, lg: 6 }}
          />
        )
      })}
    </VStack>
  )
}

const LeaderboardListSkeleton = () => {
  return (
    <VStack w="full" h="full" overflowY={{ base: undefined, lg: 'auto' }}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return <LeaderboardItemSkeleton key={item} />
      })}
    </VStack>
  )
}
