import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { PathName } from '@/shared/constants'

import {
  hasStripePaymentMethodAtom,
  isOnchainMethodAtom,
  isOnchainMethodStartedAtom,
  paymentMethodAtom,
  PaymentMethods,
} from '../state/paymentMethodAtom'

export const PaymentMethodSelection = () => {
  const { onChainAmountWarning } = useFundingFormAtom()

  const isOnChainMethod = useAtomValue(isOnchainMethodAtom)

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
      })
    }

    navBarItems.push({
      name: t('Lightning'),
      key: PaymentMethods.lightning,
      path: PathName.fundingPaymentLightning,
      isDisabled: isOnchainMethodStarted || Boolean(!paymentMethod),
      disableClick: isOnchainMethodStarted,
    })

    navBarItems.push({
      name: t('Onchain'),
      key: PaymentMethods.onChain,
      path: isOnchainMethodStarted ? '' : PathName.fundingPaymentOnchain,
      isDisabled: Boolean(onChainAmountWarning) || Boolean(!paymentMethod),
      tooltipLabel: onChainAmountWarning || undefined,
      disableClick: isOnchainMethodStarted,
    })

    return navBarItems
  }, [onChainAmountWarning, isOnchainMethodStarted, hasStripePaymentOption, paymentMethod])

  const activeButtonIndex = useMemo(() => {
    const currentItem = items.find((item) =>
      isOnChainMethod ? item.key === PaymentMethods.onChain : item.key === PaymentMethods.lightning,
    )

    if (!currentItem) {
      return 0
    }

    return items.indexOf(currentItem)
  }, [isOnChainMethod, items])

  return <AnimatedNavBar items={items} activeIndex={activeButtonIndex} showLabel />
}
