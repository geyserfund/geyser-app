import { HStack, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../../../../context'
import { useProjectStatsGetOverViewLazyQuery } from '../../../../../../types'
import { useNotification } from '../../../../../../utils'
import { StatsBlock } from '../elements'

type ProjectStatsOverviewType = {
  contributionCount: number
  prevContributionCount: number
  contributorsCount: number
  prevContributorsCount: number
  rewardsPurchased: number
  prevRewardsPurchased: number
}
const defaultProjectStats = {
  contributionCount: 0,
  prevContributionCount: 0,
  contributorsCount: 0,
  prevContributorsCount: 0,
  rewardsPurchased: 0,
  prevRewardsPurchased: 0,
}

export const StatsComponent = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { project } = useProjectContext()

  const [projectStats, setProjectStats] =
    useState<ProjectStatsOverviewType>(defaultProjectStats)

  const [projectStatsGetOverview] = useProjectStatsGetOverViewLazyQuery({
    onCompleted(data) {
      const projectStats = data.projectStatsGet

      const contributionCount =
        projectStats.current?.projectFundingTxs?.amountSum ?? 0
      const contributorsCount = projectStats.current?.projectFunders?.count ?? 0
      const rewardsPurchased =
        projectStats.current?.projectFunderRewards?.quantitySum ?? 0

      const prevContributionCount =
        projectStats.prevTimeRange?.projectFundingTxs?.amountSum ?? 0
      const prevContributorsCount =
        projectStats.prevTimeRange?.projectFunders?.count ?? 0
      const prevRewardsPurchased =
        projectStats.prevTimeRange?.projectFunderRewards?.quantitySum ?? 0

      setProjectStats({
        contributionCount,
        prevContributionCount,
        contributorsCount,
        prevContributorsCount,
        rewardsPurchased,
        prevRewardsPurchased,
      })
    },
    onError() {
      toast({
        title: 'Error fetching project stats',
        description: 'Please refresh the page and try again.',
        status: 'error',
      })
    },
  })

  useEffect(() => {
    if (project?.id) {
      projectStatsGetOverview({
        variables: {
          input: {
            where: {
              projectId: Number(project?.id),
              dateRange: {
                startDateTime: DateTime.now().minus({ week: 1 }).toMillis(),
                endDateTime: DateTime.now().toMillis(),
              },
            },
          },
        },
      })
    }
  }, [project?.id, projectStatsGetOverview])

  return (
    <VStack w="full" alignItems="start" spacing="10px">
      <HStack w="full" spacing="20px" wrap="wrap" alignItems="start">
        <StatsBlock
          title={t('Total received (sats)')}
          prevValue={projectStats.prevContributionCount}
          value={projectStats.contributionCount}
          width={{ base: '100%', lg: 'auto' }}
        />
        <HStack
          flex={2}
          width={{ base: '100%', lg: 'auto' }}
          spacing="20px"
          alignItems="start"
        >
          <StatsBlock
            title={t('Contributors')}
            prevValue={projectStats.prevContributorsCount}
            value={projectStats.contributorsCount}
            flex={1}
          />
          <StatsBlock
            title={t('Rewards purchased')}
            prevValue={projectStats.prevRewardsPurchased}
            value={projectStats.rewardsPurchased}
            flex={1}
          />
        </HStack>
      </HStack>
    </VStack>
  )
}
