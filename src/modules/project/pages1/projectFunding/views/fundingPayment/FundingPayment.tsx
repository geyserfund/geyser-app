import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts'
import { Body, H1 } from '@/shared/components/typography'
import { derivedDimensions, getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { ReachOutForHelpButton } from './components/ReachOutForHelpButton'
import { FundingPaymentBottomContent, FundingPaymentSideContent } from './sections/FundingPaymentSideContent'
import { PaymentMethodSelection } from './sections/PaymentMethodSelection'

export const FundingPayment = () => {
  const { isFundingInputAmountValid, isFundingUserInfoValid, project } = useFundingFormAtom()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isFundingInputAmountValid.valid || !isFundingUserInfoValid.valid) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [isFundingInputAmountValid, isFundingUserInfoValid, navigate, project.name])

  return (
    <FundingLayout
      backPath={'..'}
      sideContent={<FundingPaymentSideContent />}
      bottomContent={<FundingPaymentBottomContent />}
      containerProps={{
        minHeight: derivedDimensions.heightAfterTopNavBar,
      }}
    >
      <CardLayout flex={6} h="full" justifyContent="space-between">
        <VStack flex={1} w="full" alignItems="start">
          <H1 size="2xl" bold>
            {t('Invoice')}
          </H1>
          <VStack w="full" spacing={6}>
            <PaymentMethodSelection />
            <Outlet />
          </VStack>
        </VStack>

        <VStack w="full" spacing={3}>
          <ReachOutForHelpButton />
          <Body light size="xs">
            {t(
              'Geyser is not a store. It’s a way to bring creative projects to life using Bitcoin. Your donation will support a creative project that has yet to be developed. There’s a risk that, despite a creator’s best efforts, your reward will not be fulfilled, and we urge you to consider this risk prior to backing it. Geyser is not responsible for project claims or reward fulfillment.',
            )}
          </Body>
        </VStack>
      </CardLayout>
    </FundingLayout>
  )
}
