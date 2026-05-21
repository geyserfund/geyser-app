import { Box, HStack, Icon, IconButton, Switch, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'

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
  return (
    <VStack w="full" spacing={4} align="start">
      <Body size="sm" light>
        {t("Let's spread the word about your project.")}
      </Body>

      <Box w="full" p={4} borderWidth={1} borderRadius="lg" borderColor="neutral1.6">
        <HStack w="full" justifyContent="space-between" alignItems="center">
          <HStack>
            <Body size="lg" medium>
              {t('Ambassador Network Promotion')}
            </Body>
            <Body size="lg" medium color="neutral1.8">
              {t('10% fee')}
            </Body>
            <Tooltip
              label={t('The fee is only applied to contributions enabled through Ambassador Network promotions')}
              placement="top"
            >
              <IconButton
                aria-label={t('Promotion fee information')}
                icon={<Icon as={PiInfo} color="neutral1.8" />}
                variant="ghost"
                size="sm"
              />
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
            "When enabled your project becomes eligible to be shared through Geyser's promotion network — including all Geyser Ambassadors who can earn through referrals — and partner digital media companies, bringing more eyes to your project to enable more contributions.",
          )}
        </Body>
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
