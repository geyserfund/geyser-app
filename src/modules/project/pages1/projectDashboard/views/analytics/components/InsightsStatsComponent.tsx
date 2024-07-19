import { HStack, Stack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { SkeletonLayout } from '@/shared/components/layouts'
import { useProjectStatsGetInsightLazyQuery } from '@/types'
import { useNotification } from '@/utils'

import { StatsBlock } from '../elements'
import { getDateParams } from '../helpers'
import { useSelectionAtom, useStatsInsightsAtom } from '../insightsAtom'

export const InsightsStatsComponent = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { toast } = useNotification()

  const [selectionOption] = useSelectionAtom()
  const [projectStats, setProjectStats] = useStatsInsightsAtom()

  const [getProjectStatsInsight, { loading }] = useProjectStatsGetInsightLazyQuery({
    onCompleted(data) {
      const stats = data.projectStatsGet
      const contributionSum = stats.current?.projectFundingTxs?.amountSum ?? 0
      const contributorsCount = stats.current?.projectFunders?.count ?? 0
      const contributionCount = stats.current?.projectFundingTxs?.count ?? 0
      const rewardsPurchased = stats.current?.projectFunderRewards?.quantitySum ?? 0
      const viewCount = stats.current?.projectViews?.viewCount ?? 0
      const visitorCount = stats.current?.projectViews?.visitorCount ?? 0

      const prevContributionSum = stats.prevTimeRange?.projectFundingTxs?.amountSum ?? 0
      const prevContributionCount = stats.prevTimeRange?.projectFundingTxs?.count ?? 0
      const prevContributorsCount = stats.prevTimeRange?.projectFunders?.count ?? 0
      const prevRewardsPurchased = stats.prevTimeRange?.projectFunderRewards?.quantitySum ?? 0
      const prevViewCount = stats.prevTimeRange?.projectViews?.viewCount ?? 0
      const prevVisitorCount = stats.prevTimeRange?.projectViews?.visitorCount ?? 0

      const regions = stats.current?.projectViews?.regions ?? []
      const referrers = stats.current?.projectViews?.referrers ?? []

      setProjectStats({
        contributionSum,
        prevContributionSum,
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
        regions,
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
      const { startDateTime, endDateTime } = getDateParams(selectionOption)

      getProjectStatsInsight({
        variables: {
          input: {
            where: {
              projectId: project?.id,
              dateRange: {
                startDateTime,
                endDateTime,
              },
            },
          },
        },
      })
    }
  }, [project?.id, getProjectStatsInsight, selectionOption])

  const contribViewRatio =
    projectStats.viewCount && projectStats.contributionCount
      ? Math.round(projectStats.contributionCount / projectStats.viewCount) * 100
      : 0

  const prevContribViewRatio =
    projectStats.prevViewCount && projectStats.prevContributionCount
      ? Math.round(projectStats.prevContributionCount / projectStats.prevViewCount) * 100
      : 0

  if (loading) {
    return <InsightsStatsComponentSkeleton />
  }

  return (
    <VStack w="full" alignItems="start" spacing="10px">
      <Stack direction={{ base: 'column', lg: 'row' }} w="full" spacing={3} wrap="wrap" alignItems="start">
        <StatsBlock
          title={t('Funds received (sats)')}
          prevValue={projectStats.prevContributionSum}
          value={projectStats.contributionSum}
          width={{ base: 'full', lg: 'auto' }}
          flex={1}
        />
        <StatsBlock
          title={t('Contributors')}
          prevValue={projectStats.prevContributorsCount}
          value={projectStats.contributorsCount}
          width={{ base: 'full', lg: 'auto' }}
          flex={1}
        />
      </Stack>
      <Stack direction={{ base: 'column', lg: 'row' }} w="full" spacing={3} wrap="wrap" alignItems="start">
        <StatsBlock
          title={t('Rewards sold')}
          prevValue={projectStats.prevRewardsPurchased}
          value={projectStats.rewardsPurchased}
          width={{ base: 'full', lg: 'auto' }}
          flex={1}
        />
        <StatsBlock
          title={t('Contributions per visit')}
          prevValue={prevContribViewRatio}
          value={contribViewRatio}
          isPercent
          width={{ base: 'full', lg: 'auto' }}
          flex={1}
        />
      </Stack>
    </VStack>
  )
}

export const InsightsStatsComponentSkeleton = () => {
  return (
    <VStack w="full" alignItems="start" spacing="10px">
      <Stack direction={{ base: 'column', lg: 'row' }} w="full" spacing={3} alignItems="start">
        <SkeletonLayout height="80px" minWidth="150px" width={{ base: 'full', lg: '48%' }} />
        <SkeletonLayout height="80px" minWidth="150px" width={{ base: 'full', lg: '48%' }} />
      </Stack>
      <Stack direction={{ base: 'column', lg: 'row' }} w="full" spacing={3} alignItems="start">
        <SkeletonLayout height="80px" minWidth="150px" width={{ base: 'full', lg: '48%' }} />
        <SkeletonLayout height="80px" minWidth="150px" width={{ base: 'full', lg: '48%' }} />
      </Stack>
    </VStack>
  )
}
