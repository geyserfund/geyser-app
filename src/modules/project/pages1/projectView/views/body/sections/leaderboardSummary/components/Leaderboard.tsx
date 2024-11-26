import { Button, HStack, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useUserContributorToCurrentProject } from '@/modules/project/pages1/projectView/hooks/useUserContributorToCurrentProject'
import { contributorsAtom } from '@/modules/project/state/contributionsAtom'
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

  const [contributors, setContributors] = useAtom(contributorsAtom)

  const { loading } = useProjectLeaderboardContributorsGetQuery({
    skip: !project.id,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        period: ProjectLeaderboardPeriod.AllTime,
        projectId: project.id,
        top: 10,
      },
    },
    onCompleted(data) {
      setContributors(data?.projectLeaderboardContributorsGet || [])
    },
  })

  const { userContributor, userAllTimeRank } = useUserContributorToCurrentProject({ contributors })

  if (projectLoading || loading) {
    return <LeaderboardSkeleton />
  }

  if (!contributors || contributors.length === 0) {
    return <NoContribution />
  }

  return (
    <VStack spacing={0} w="full" flex={1} justifyContent={'space-between'} overflow={'hidden'}>
      <VStack spacing={0} w="full" flex={1} overflowY={'auto'}>
        {contributors.map((contributor, index) => {
          return <LeaderboardItem funder={contributor} rank={index + 1} key={contributor.funderId} hideLabel />
        })}
      </VStack>
      {userContributor && <LeaderboardItem funder={userContributor} rank={userAllTimeRank || 0} hideLabel />}

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
