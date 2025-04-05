import { Box, HStack, Icon, Spinner, Switch, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { GeyserPromotionsContributionStatsQuery } from '@/types/index.ts'

interface GeyserPromotionSectionProps {
  promotionsEnabled: boolean | undefined
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
            <Tooltip label={t('Only on enabled contributions')} placement="top">
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
        {/* Display Geyser Promotion Stats Banner using correct data */}
        {promotionsEnabled && promotionStatsLoading && <Spinner size="sm" />}
        {!promotionStatsLoading &&
          promotionStatsData?.geyserPromotionsContributionStats?.contributionsSumUsd !== undefined &&
          promotionStatsData?.geyserPromotionsContributionStats?.contributionsSumUsd > 0 && (
            <Box bg="green.50" p={3} borderRadius="md" mb={4}>
              <Body size="sm" bold>
                {formatAmount(
                  promotionStatsData.geyserPromotionsContributionStats.contributionsSumUsd,
                  FormatCurrencyType.Usd,
                )}{' '}
                {t('has been enabled through Geyser promotions on this project.')}
              </Body>
            </Box>
          )}
      </Box>
    </VStack>
  )
}
