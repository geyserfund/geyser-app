import { Button, HStack, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useUserContributorToCurrentProject } from '@/modules/project/pages1/projectView/hooks/useUserContributorToCurrentProject'
import { SkeletonLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'
import { ProjectLeaderboardPeriod, useProjectLeaderboardContributorsGetQuery } from '@/types'

import {
  LeaderboardItem,
  LeaderboardItemSkeleton,
} from '../../../../leaderboard/views/leaderboard/components/LeaderboardItem'
import { NoContribution } from './NoContribution'

export const Leaderboard = () => {
  const { t } = useTranslation()

  const { project, loading: projectLoading } = useProjectAtom()

  const { data, loading } = useProjectLeaderboardContributorsGetQuery({
    skip: !project.id,
    variables: {
      input: {
        period: ProjectLeaderboardPeriod.AllTime,
        projectId: project.id,
        top: 10,
      },
    },
  })
  const funders = useMemo(
    () => data?.projectLeaderboardContributorsGet || [],
    [data?.projectLeaderboardContributorsGet],
  )

  const { userContributor, userAllTimeRank } = useUserContributorToCurrentProject({ funders })

  if (projectLoading || loading) {
    return <LeaderboardSkeleton />
  }

  if (!funders || funders.length === 0) {
    return <NoContribution />
  }

  return (
    <VStack spacing={0} w="full" flex={1} justifyContent={'space-between'} overflow={'hidden'}>
      <VStack spacing={0} w="full" flex={1} overflowY={'auto'}>
        {funders.map((funder, index) => {
          return <LeaderboardItem funder={funder} rank={index + 1} key={funder.funderId} />
        })}
      </VStack>
      {userContributor && <LeaderboardItem funder={userContributor} rank={userAllTimeRank || 0} />}

      <HStack w="full" justifyContent={'center'} spacing={1} paddingX={6} paddingTop={2}>
        <Button
          as={Link}
          to={getPath('projectLeaderboard', project.name)}
          variant="soft"
          size="sm"
          minW={20}
          colorScheme="neutral1"
        >
          {t('See all')}
        </Button>
      </HStack>
    </VStack>
  )
}

const LeaderboardSkeleton = () => {
  return (
    <VStack spacing={0} w="full" flex={1} justifyContent={'space-between'}>
      <VStack spacing={0} w="full">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
          return <LeaderboardItemSkeleton key={index} />
        })}
      </VStack>

      <HStack w="full" justifyContent={'center'} spacing={1} paddingX={6} paddingY={2}>
        <SkeletonLayout height="24px" width={24} />
      </HStack>
    </VStack>
  )
}
