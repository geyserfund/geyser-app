import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useEffect, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import {
  isOnchainMethodStartedAtom,
  paymentMethodAtom,
  PaymentMethods,
} from '@/modules/project/pages/projectView/views/projectActivityPanel/screens/qr/states'
import { CardLayout } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { Body, H1 } from '@/shared/components/typography'
import { derivedDimensions, getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { ReachOutForHelpButton } from './components/ReachOutForHelpButton'
import { FundingPaymentBottomContent, FundingPaymentSideContent } from './sections/FundingPaymentSideContent'

export const FundingPayment = () => {
  const { isFundingInputAmountValid, isFundingUserInfoValid, project, onChainAmountWarning } = useFundingFormAtom()

  const paymentMethod = useAtomValue(paymentMethodAtom)
  const isOnchainMethodStarted = useAtomValue(isOnchainMethodStartedAtom)

  const navigate = useNavigate()

  useEffect(() => {
    console.log('checking project funding', isFundingInputAmountValid, isFundingUserInfoValid)
    if (!isFundingInputAmountValid.valid || !isFundingUserInfoValid.valid) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [isFundingInputAmountValid, isFundingUserInfoValid, navigate, project.name])

  const items: AnimatedNavBarItem[] = useMemo(
    () => [
      {
        name: t('Lightning'),
        key: PaymentMethods.lightning,
        path: getPath('fundingPaymentLightning', project.name),
        isDisabled: isOnchainMethodStarted || Boolean(!paymentMethod),
      },
      {
        name: t('Onchain'),
        key: PaymentMethods.onChain,
        path: getPath('fundingPaymentOnchain', project.name),
        isDisabled: Boolean(onChainAmountWarning) || Boolean(!paymentMethod),
        tooltipLabel: onChainAmountWarning || undefined,
      },
    ],
    [onChainAmountWarning, project.name, isOnchainMethodStarted, paymentMethod],
  )

  const activeIndex = paymentMethod === PaymentMethods.onChain ? 1 : 0

  return (
    <FundingLayout
      backPath={getPath('projectFunding', project.name)}
      sideContent={<FundingPaymentSideContent />}
      bottomContent={<FundingPaymentBottomContent />}
      containerProps={{
        minHeight: derivedDimensions.heightAfterTopNavBar,
      }}
    >
      <CardLayout flex={1} h="full" justifyContent="space-between">
        <VStack flex={1} w="full" alignItems="start">
          <H1 size="2xl" bold>
            {t('Invoice')}
          </H1>
          <VStack w="full" spacing={6}>
            <AnimatedNavBar items={items} activeIndex={activeIndex} showLabel />
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
