import { Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Trans } from 'react-i18next'
import { PiWarning } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const FiatSwapContributorNotVerified = () => {
  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)
  const { totalUsdCent } = useFundingFormAtom()

  const isUserOverLimit = fundingInputAfterRequest?.user?.complianceDetails.contributionLimits.monthly.reached

  const remainingLimit = fundingInputAfterRequest?.user?.complianceDetails.contributionLimits.monthly.remaining || 500

  if (isUserOverLimit || totalUsdCent > remainingLimit * 100) {
    return (
      <Feedback variant={FeedBackVariant.WARNING} icon={<Icon as={PiWarning} fontSize="26px" />}>
        <VStack w="full" alignItems="start">
          <Body medium>{t('Identity verification required')}</Body>
          <Body size="sm">
            <Trans i18nextKey="You will be required to verify your identity by our third-party payment provider. This verification is only required for fiat payments above $500 a month.">
              {
                'You will be required to verify your identity by our third-party payment provider. This verification is only required for fiat payments above $500 a month.'
              }
            </Trans>
          </Body>
        </VStack>
      </Feedback>
    )
  }

  return null
}
