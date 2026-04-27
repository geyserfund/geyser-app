import { Stack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectMatchingPreview } from '@/modules/project/funding/hooks/useProjectMatchingPreview.ts'
import { recurringFundingModes } from '@/modules/project/recurring/graphql'
import { Body } from '@/shared/components/typography'
import { darkModeColors, lightModeColors } from '@/shared/styles/colors.ts'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'

type FundingMatchingBannerProps = {
  isSatoshi: boolean
  size?: 'md' | 'lg'
}

export const FundingMatchingBanner = ({ isSatoshi, size = 'lg' }: FundingMatchingBannerProps) => {
  const { formState, project } = useFundingFormAtom()
  const { formatAmount } = useCurrencyFormatter()
  const matchingPreview = useProjectMatchingPreview()
  const isCompactSize = size === 'md'
  const borderColor = useColorModeValue(lightModeColors.primary1[6], darkModeColors.primary1[8])
  const backgroundColor = useColorModeValue(lightModeColors.primary1[2], darkModeColors.primary1[2])
  const headlineColor = useColorModeValue('primary1.11', 'primary1.12')
  const supportingCopyColor = useColorModeValue('primary1.11', 'primary1.12')

  if (!project.activeMatching || !matchingPreview.hasActiveMatching) {
    return null
  }

  const headline = isSatoshi
    ? formatAmount(matchingPreview.totalImpactSats, 'BTCSAT')
    : formatAmount(matchingPreview.totalImpactUsdCents, 'USDCENT')

  const supportingCopy =
    formState.fundingMode === recurringFundingModes.oneTime
      ? t('will 2x your contribution through matching.')
      : t('will 2x your contribution through matching. Recurring contributions are only matched while the matching is active.')

  return (
    <Stack
      w="full"
      direction={{ base: 'column', sm: 'row' }}
      alignItems={{ base: 'flex-start', sm: 'center' }}
      spacing={{ base: 2, sm: 4 }}
      px={5}
      py={4}
      borderRadius="innerCard"
      border="1px solid"
      borderColor={borderColor}
      bg={backgroundColor}
    >
      <Body
        size={isCompactSize ? 'lg' : '4xl'}
        bold
        color={headlineColor}
        flexShrink={0}
        lineHeight="1"
        sx={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {headline}
      </Body>
      <VStack alignItems="start" spacing={0}>
        <Body size="sm" color={supportingCopyColor}>
          <Body as="span" bold size="sm" color="inherit">
            {project.activeMatching.sponsorName}
          </Body>{' '}
          {supportingCopy}
        </Body>
      </VStack>
    </Stack>
  )
}
