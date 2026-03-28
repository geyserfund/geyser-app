import { Box, HStack, Icon, Image, Switch, Tooltip, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'

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

type PromotionNetworkSettingsCardProps = {
  promotionsEnabled: boolean
  onToggle: (isEnabled: boolean) => void
  isLoading?: boolean
  contributionSummary?: string | null
}

/** Shared promotion-network settings UI for project creation and dashboard flows. */
export const PromotionNetworkSettingsCard = ({
  promotionsEnabled,
  onToggle,
  isLoading = false,
  contributionSummary,
}: PromotionNetworkSettingsCardProps) => {
  const promotionLogos = useColorModeValue(PROMOTION_LOGOS.light, PROMOTION_LOGOS.dark)

  return (
    <VStack w="full" spacing={4} align="start">
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
            isChecked={promotionsEnabled}
            onChange={(event) => onToggle(event.target.checked)}
            isDisabled={isLoading}
            colorScheme="primary1"
          />
        </HStack>
        <Body size="sm" mb={4}>
          {t(
            "When enabled your project becomes eligible to be shared through Geyser's promotion network and partner digital media companies, bringing more eyes to your project to enable more contributions.",
          )}
        </Body>
        <HStack spacing={4} mb={contributionSummary ? 4 : 0}>
          {promotionLogos.map((logo) => (
            <Image key={logo.alt} src={logo.src} alt={logo.alt} h="20px" objectFit="contain" />
          ))}
        </HStack>
        {contributionSummary ? (
          <Box bg="green.100" p={3} borderRadius="md" w="fit-content">
            <Body size="sm" bold color="green.900">
              {contributionSummary}
            </Body>
          </Box>
        ) : null}
      </Box>
    </VStack>
  )
}
