import { useQuery } from '@apollo/client'
import { Box, HStack, Icon, Image, Switch, Tooltip, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useCallback } from 'react'
import { PiInfo } from 'react-icons/pi'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { QUERY_PROMOTION_NETWORK_CONTRIBUTION_STATS } from '@/modules/project/graphql/queries/affiliateQuery.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { useGeyserPromotionsContributionStatsQuery } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

const PROMOTION_LOGOS = {
  light: [
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/platform/bitcoin-news-light.png',
      alt: 'Bitcoin News logo',
    },
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/platform/lightning-news-light.png',
      alt: 'Lightning News logo',
    },
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/platform/bff-light.png',
      alt: 'BFF logo',
    },
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/platform/bitcoin-bits-light.png',
      alt: 'Bitcoin Bits logo',
    },
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/app/logo-name-dark.svg',
      alt: 'Geyser logo',
    },
  ],
  dark: [
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/platform/bitcoin-news-dark.png',
      alt: 'Bitcoin News logo',
    },
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/platform/lightning-news-dark.png',
      alt: 'Lightning News logo',
    },
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/platform/bff-dark.png',
      alt: 'BFF logo',
    },
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/platform/bitcoin-bits-dark.png',
      alt: 'Bitcoin Bits logo',
    },
    {
      src: 'https://storage.googleapis.com/geyser-projects-media/app/logo-name-light.svg',
      alt: 'Geyser logo',
    },
  ],
}

/** GeyserPromotionSection: Displays the Geyser Promotion toggle and stats */
/** Must be used inside ProjectContextProvider */
export const GeyserPromotionSection = () => {
  const promotionLogos = useColorModeValue(PROMOTION_LOGOS.light, PROMOTION_LOGOS.dark)

  const { formatAmount } = useCurrencyFormatter()

  const toast = useNotification()

  const { project } = useProjectAtom()
  const { updateProject } = useProjectAPI()

  const handlePromotionsToggle = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const isEnabled = event.target.checked
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
  const { data: promotionNetworkStatsData, loading: promotionNetworkStatsLoading } = useQuery<{
    promotionNetworkContributionStats: {
      contributionsCount: number
      contributionsSum: number
      contributionsSumUsd: number
    }
  }>(QUERY_PROMOTION_NETWORK_CONTRIBUTION_STATS, {
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
  const contributionSummaryCopy = hasProjectPromotionContributions
    ? t('has been enabled through Geyser promotions on this project so far.')
    : t('has been enabled through the Promotion Network so far.')

  const { promotionsEnabled } = project

  return (
    <VStack w="full" spacing={4} align="start">
      <HStack display="none" w="full" justifyContent="space-between">
        <Body size="xl" medium>
          {t('Promotions')}
        </Body>
      </HStack>
      <Body size="sm" light>
        {t("Let's spread the word about your project.")}
      </Body>

      <Box w="full" p={4} borderWidth={1} borderRadius="lg" borderColor="neutral1.6">
        <HStack w="full" justifyContent="space-between" alignItems="center">
          <HStack>
            <Body size="lg" medium>
              {t('Geyser Promotion')}
            </Body>
            <Body size="lg" medium color="neutral1.8">
              {t('10% fee')}
            </Body>
            <Tooltip
              label={t('The fee is only applied to contributions enabled through Geyser promotions')}
              placement="top"
            >
              <Box as="span" cursor="pointer">
                <Icon as={PiInfo} color="neutral1.8" />
              </Box>
            </Tooltip>
          </HStack>
          <Switch
            id="geyser-promotions-toggle"
            isChecked={promotionsEnabled ?? false}
            onChange={handlePromotionsToggle}
            isDisabled={updateProject.loading}
            colorScheme="primary1"
          />
        </HStack>
        <Body size="sm" mb={4}>
          {t(
            "When enabled your project becomes eligible to be shared through Geyser's promotion network and partner digital media companies, bringing more eyes to your project to enable more contributions.",
          )}
        </Body>
        <HStack spacing={4} mb={4}>
          {promotionLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              h="20px" // Adjust height as needed
              objectFit="contain"
            />
          ))}
        </HStack>
        {shouldShowContributionSummary && displayedContributionSumUsd !== undefined && (
          <Box bg="green.100" p={3} borderRadius="md" mb={4} w="fit-content">
            <Body size="sm" bold color="green.900">
              {formatAmount(displayedContributionSumUsd, FormatCurrencyType.Usd)} {contributionSummaryCopy}
            </Body>
          </Box>
        )}
      </Box>
    </VStack>
  )
}
