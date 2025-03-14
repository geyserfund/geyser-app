import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { PathName } from '@/shared/constants'

import {
  hasStripePaymentMethodAtom,
  isOnchainMethodStartedAtom,
  paymentMethodAtom,
  PaymentMethods,
} from '../state/paymentMethodAtom'

export const PaymentMethodSelection = () => {
  const { onChainAmountWarning } = useFundingFormAtom()

  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)
  const userId = fundingInputAfterRequest?.user?.id

  const paymentMethod = useAtomValue(paymentMethodAtom)
  const isOnchainMethodStarted = useAtomValue(isOnchainMethodStartedAtom)
  const hasStripePaymentOption = useAtomValue(hasStripePaymentMethodAtom)

  const items: AnimatedNavBarItem[] = useMemo(() => {
    const navBarItems = [] as AnimatedNavBarItem[]

    if (hasStripePaymentOption) {
      navBarItems.push({
        name: t('Card'),
        key: PaymentMethods.card,
        path: PathName.fundingPaymentCard,
        isDisabled: isOnchainMethodStarted || Boolean(!paymentMethod),
        disableClick: isOnchainMethodStarted,
        replacePath: true,
      })
    }

    navBarItems.push({
      name: t('Fiat*'),
      key: PaymentMethods.fiatSwap,
      path: PathName.fundingPaymentFiatSwap,
      isDisabled: isOnchainMethodStarted || Boolean(!paymentMethod) || !userId,
      disableClick: isOnchainMethodStarted,
      tooltipLabel: !userId
        ? t('Please login to use fiat payment')
        : t(
            'First time using fiat on Geyser? A quick one-time identity verification is required to comply with regulations.',
          ),
      replacePath: true,
    })

    navBarItems.push({
      name: t('Lightning'),
      key: PaymentMethods.lightning,
      path: PathName.fundingPaymentLightning,
      isDisabled: isOnchainMethodStarted || Boolean(!paymentMethod),
      disableClick: isOnchainMethodStarted,
      replacePath: true,
    })

    navBarItems.push({
      name: t('Onchain'),
      key: PaymentMethods.onChain,
      path: isOnchainMethodStarted ? '' : PathName.fundingPaymentOnchain,
      isDisabled: Boolean(onChainAmountWarning) || Boolean(!paymentMethod),
      tooltipLabel: onChainAmountWarning || undefined,
      disableClick: isOnchainMethodStarted,
      replacePath: true,
    })

    return navBarItems
  }, [onChainAmountWarning, isOnchainMethodStarted, hasStripePaymentOption, paymentMethod, userId])

  const activeButtonIndex = useMemo(() => {
    const currentItem = items.find((item) => item.key === paymentMethod)

    if (!currentItem) {
      return 0
    }

    return items.indexOf(currentItem)
  }, [paymentMethod, items])

  return <AnimatedNavBar items={items} activeIndex={activeButtonIndex} showLabel />
}
