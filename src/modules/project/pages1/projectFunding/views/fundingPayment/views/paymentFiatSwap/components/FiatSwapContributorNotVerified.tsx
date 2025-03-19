import { Icon, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Trans } from 'react-i18next'
import { PiWarning } from 'react-icons/pi'

import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const FiatSwapContributorNotVerified = () => {
  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)

  if (fundingInputAfterRequest?.user?.complianceDetails.verifiedDetails.identity?.verified) {
    return null
  }

  return (
    <Feedback variant={FeedBackVariant.WARNING} icon={<Icon as={PiWarning} fontSize="26px" />}>
      <VStack w="full" alignItems="start">
        <Body medium>{t('Identity verification required')}</Body>
        <Body size="sm">
          <Trans i18nextKey="You will be required to verify your identity by our third-party payment provider. This verification is only required for fiat payments above $10,000 dollars. Learn more about why we’re required to do this verification <1>here.</1>">
            {
              'You will be required to verify your identity by our third-party payment provider. This verification is only required for fiat payments above $10,000 dollars. Learn more about why we’re required to do this verification'
            }{' '}
            <Link
              isExternal
              href={t('https://help.joinslash.com/en/articles/6000191697')}
              as="span"
              textDecoration={'underline'}
            >
              {'here.'}
            </Link>
          </Trans>
        </Body>
      </VStack>
    </Feedback>
  )
}
