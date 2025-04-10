import { Box, HStack, Icon, Image, Switch, Tooltip, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { GeyserPromotionsContributionStatsQuery } from '@/types/index.ts'

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

interface GeyserPromotionSectionProps {
  promotionsEnabled: boolean | undefined | null
  promotionStatsData: GeyserPromotionsContributionStatsQuery | undefined
  promotionStatsLoading: boolean
  handlePromotionsToggle: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  isUpdateProjectLoading: boolean
  formatAmount: (amount: number, type: FormatCurrencyType) => string
}

/** GeyserPromotionSection: Displays the Geyser Promotion toggle and stats */
export const GeyserPromotionSection = ({
  promotionsEnabled,
  promotionStatsData,
  promotionStatsLoading,
  handlePromotionsToggle,
  isUpdateProjectLoading,
  formatAmount,
}: GeyserPromotionSectionProps) => {
  const promotionLogos = useColorModeValue(PROMOTION_LOGOS.light, PROMOTION_LOGOS.dark)
  const hasPromotionContributions =
    !promotionStatsLoading &&
    promotionStatsData?.geyserPromotionsContributionStats?.contributionsSumUsd !== undefined &&
    promotionStatsData?.geyserPromotionsContributionStats?.contributionsSumUsd > 0

  return (
    <VStack w="full" spacing={4} align="start">
      <HStack w="full" justifyContent="space-between">
        <Body size="xl" medium>
          {t('Promotions')}
        </Body>
      </HStack>
      <Body size="sm" light>
        {t("Let's spread the word about your project.")}
      </Body>

      <Box w="full" p={4} borderWidth={1} borderRadius="lg" borderColor="primary1.11">
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
            isDisabled={isUpdateProjectLoading}
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
        {hasPromotionContributions && (
          <Box bg="green.100" p={3} borderRadius="md" mb={4} w="fit-content">
            <Body size="sm" bold color="green.900">
              {formatAmount(
                promotionStatsData.geyserPromotionsContributionStats.contributionsSumUsd,
                FormatCurrencyType.Usd,
              )}{' '}
              {t('has been enabled through Geyser promotions on this project so far.')}
            </Body>
          </Box>
        )}
      </Box>
    </VStack>
  )
}
