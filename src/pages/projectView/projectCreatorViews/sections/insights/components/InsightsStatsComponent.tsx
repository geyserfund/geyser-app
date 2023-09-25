import { HStack, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { SkeletonLayout } from '../../../../../../components/layouts'
import { useProjectContext } from '../../../../../../context'
import { useProjectStatsGetInsightLazyQuery } from '../../../../../../types'
import { useNotification } from '../../../../../../utils'
import { StatsBlock } from '../../overview/elements'
import { useSelectionAtom, useStatsInsightsAtom } from '../insightsAtom'
import { InsightsOptions } from './InsightsHeader'

export const InsightsStatsComponent = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const [selectionOption] = useSelectionAtom()
  const [projectStats, setProjectStats] = useStatsInsightsAtom()

  console.log('checking selectionOption', selectionOption)

  const [getProjectStatsInsight, { loading }] =
    useProjectStatsGetInsightLazyQuery({
      onCompleted(data) {
        const stats = data.projectStatsGet
        const contributionCount =
          stats.current?.projectFundingTxs?.amountSum || 0
        const contributorsCount = stats.current?.projectFunders?.count || 0
        const rewardsPurchased =
          stats.current?.projectFunderRewards?.quantitySum || 0
        const viewCount = stats.current?.projectViews?.viewCount || 0
        const visitorCount = stats.current?.projectViews?.visitorCount || 0

        const prevContributionCount =
          stats.prevTimeRange?.projectFundingTxs?.amountSum || 0
        const prevContributorsCount =
          stats.prevTimeRange?.projectFunders?.count || 0
        const prevRewardsPurchased =
          stats.prevTimeRange?.projectFunderRewards?.quantitySum || 0
        const prevViewCount = stats.prevTimeRange?.projectViews?.viewCount || 0
        const prevVisitorCount =
          stats.prevTimeRange?.projectViews?.visitorCount || 0

        const countries = stats.current?.projectViews?.countries || []
        const referrers = stats.current?.projectViews?.referrers || []

        setProjectStats({
          contributionCount,
          prevContributionCount,
          contributorsCount,
          prevContributorsCount,
          rewardsPurchased,
          prevRewardsPurchased,
          viewCount,
          prevViewCount,
          visitorCount,
          prevVisitorCount,
          countries,
          referrers,
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
      const currentDate = DateTime.now()
      let startDateTime

      switch (selectionOption) {
        case InsightsOptions.lastWeek:
          startDateTime = currentDate.minus({ week: 1 }).toMillis()
          break
        case InsightsOptions.lastMonth:
          startDateTime = currentDate.minus({ month: 1 }).toMillis()
          break
        case InsightsOptions.lastYear:
          startDateTime = currentDate.minus({ year: 1 }).toMillis()
          break
        default:
          startDateTime = currentDate.minus({ week: 1 }).toMillis()
      }

      getProjectStatsInsight({
        variables: {
          input: {
            where: {
              projectId: project?.id,
              dateRange: {
                startDateTime,
                endDateTime: currentDate.toMillis(),
              },
            },
          },
        },
      })
    }
  }, [project?.id, getProjectStatsInsight, selectionOption])

  const contribVirewRatio = projectStats.viewCount
    ? Math.round(
        (projectStats.contributionCount / projectStats.viewCount) * 100,
      )
    : 0

  const prevContribVirewRatio = projectStats.prevViewCount
    ? Math.round(
        (projectStats.prevContributionCount / projectStats.prevViewCount) * 100,
      )
    : 0

  if (loading) {
    return <InsightsStatsComponentSkeleton />
  }

  return (
    <VStack w="full" alignItems="start" spacing="10px">
      <HStack w="full" spacing="20px" wrap="wrap">
        <StatsBlock
          title={t('Total received (sats)')}
          prevValue={projectStats.prevContributionCount}
          value={projectStats.contributionCount}
          width={{ base: '100%', lg: '33%' }}
          flex={1}
        />
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
        <StatsBlock
          title={t('Contrib/Views')}
          prevValue={prevContribVirewRatio}
          value={contribVirewRatio}
          flex={1}
        />
      </HStack>
    </VStack>
  )
}

export const InsightsStatsComponentSkeleton = () => {
  return (
    <VStack w="full" alignItems="start" spacing="10px">
      <HStack w="full" spacing="20px" wrap="wrap">
        <SkeletonLayout height="90px" minWidth="200px" flex={1} />
        <SkeletonLayout height="90px" minWidth="200px" flex={1} />
        <SkeletonLayout height="90px" minWidth="200px" flex={1} />
        <SkeletonLayout height="90px" minWidth="200px" flex={1} />
      </HStack>
    </VStack>
  )
}
