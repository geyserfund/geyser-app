import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback } from 'react'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { PromotionNetworkSettingsCard } from '@/modules/project/components/PromotionNetworkSettingsCard.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { useGeyserPromotionsContributionStatsQuery, usePromotionNetworkContributionStatsQuery } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

/** GeyserPromotionSection: Displays the Geyser Promotion toggle and stats */
/** Must be used inside ProjectContextProvider */
export const GeyserPromotionSection = () => {
  const { formatAmount } = useCurrencyFormatter()

  const toast = useNotification()

  const { project } = useProjectAtom()
  const { updateProject } = useProjectAPI()

  const handlePromotionsToggle = useCallback(
    async (isEnabled: boolean) => {
      try {
        await updateProject.execute({
          variables: {
            input: {
              projectId: project.id,
              promotionsEnabled: isEnabled,
            },
          },
        })
        toast.success({
          title: t('Promotion settings updated.'),
        })
      } catch (error) {
        console.error('Error updating promotions status:', error)
        toast.error({
          title: t('Failed to update promotion settings.'),
          description: (error as Error)?.message || t('Please try again.'),
        })
      }
    },
    [project.id, updateProject, toast],
  )

  // Fetch Geyser Promotion Contribution Stats using the generated hook
  const { data: promotionStatsData, loading: promotionStatsLoading } = useGeyserPromotionsContributionStatsQuery({
    variables: {
      input: {
        where: { projectId: project.id },
      },
    },
    skip: !project.id || !project.promotionsEnabled,
    fetchPolicy: 'cache-and-network',
  })
  const { data: promotionNetworkStatsData, loading: promotionNetworkStatsLoading } =
    usePromotionNetworkContributionStatsQuery({
    fetchPolicy: 'cache-and-network',
    })

  const projectPromotionContributionSumUsd = promotionStatsData?.geyserPromotionsContributionStats?.contributionsSumUsd
  const hasProjectPromotionContributions =
    !promotionStatsLoading &&
    projectPromotionContributionSumUsd !== undefined &&
    projectPromotionContributionSumUsd > 0
  const promotionNetworkContributionSumUsd = promotionNetworkStatsData?.promotionNetworkContributionStats?.contributionsSumUsd
  const hasPromotionNetworkContributions =
    !promotionNetworkStatsLoading &&
    promotionNetworkContributionSumUsd !== undefined &&
    promotionNetworkContributionSumUsd > 0
  const shouldShowContributionSummary = hasProjectPromotionContributions || hasPromotionNetworkContributions
  const displayedContributionSumUsd = hasProjectPromotionContributions
    ? projectPromotionContributionSumUsd
    : promotionNetworkContributionSumUsd
  const contributionSummary =
    displayedContributionSumUsd !== undefined
      ? `${formatAmount(displayedContributionSumUsd, FormatCurrencyType.Usd)} ${
          hasProjectPromotionContributions
            ? t('has been enabled through Geyser promotions on this project so far.')
            : t('has been enabled through the Promotion Network so far.')
        }`
      : null

  const { promotionsEnabled } = project

  return (
    <VStack w="full" spacing={4} align="start">
      <PromotionNetworkSettingsCard
        promotionsEnabled={promotionsEnabled ?? false}
        onToggle={handlePromotionsToggle}
        isLoading={updateProject.loading}
        contributionSummary={shouldShowContributionSummary ? contributionSummary : null}
      />
    </VStack>
  )
}
