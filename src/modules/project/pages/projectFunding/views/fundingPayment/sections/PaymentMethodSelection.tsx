import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { PathName } from '@/shared/constants'

import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  hasFiatPaymentMethodAtom,
  isFiatSwapMethodStartedAtom,
  isOnchainMethodStartedAtom,
  paymentMethodAtom,
  PaymentMethods,
} from '../state/paymentMethodAtom.ts'

export const PaymentMethodSelection = () => {
  const { onChainAmountWarning, fiatSwapAmountWarning } = useFundingFormAtom()

  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)
  const user = fundingInputAfterRequest?.user

  const userLimitReached = !user?.complianceDetails.verifiedDetails.identity?.verified
    ? user?.complianceDetails.contributionLimits.monthly.reached
    : false

  const fiatLimitMessage = user?.complianceDetails.contributionLimits.monthly.reached
    ? t(
        "You've reached your monthly fiat contribution Limit. Please verify your identity to remove all restrictions or wait for 30 days.",
      )
    : ''

  const paymentMethod = useAtomValue(paymentMethodAtom)
  const fiatPaymentMethod = useAtomValue(fiatPaymentMethodAtom)
  const isOnchainMethodStarted = useAtomValue(isOnchainMethodStartedAtom)
  const isFiatSwapMethodStarted = useAtomValue(isFiatSwapMethodStartedAtom)
  const hasFiatPaymentOption = useAtomValue(hasFiatPaymentMethodAtom)
  const isDisabled = isOnchainMethodStarted || isFiatSwapMethodStarted || Boolean(!paymentMethod)

  const items: AnimatedNavBarItem[] = useMemo(() => {
    const navBarItems = [] as AnimatedNavBarItem[]

    if (hasFiatPaymentOption) {
      navBarItems.push({
        name: t('Card'),
        key: PaymentMethods.card,
        path:
          fiatPaymentMethod === fiatCheckoutMethods.applePay
            ? PathName.fundingPaymentApplePay
            : PathName.fundingPaymentCreditCard,
        isDisabled: isDisabled || Boolean(fiatSwapAmountWarning),
        disableClick: isDisabled || userLimitReached || Boolean(fiatSwapAmountWarning),
        tooltipLabel: userLimitReached ? fiatLimitMessage : fiatSwapAmountWarning,
        replacePath: true,
      })
    }

    navBarItems.push({
      name: t('Lightning'),
      key: PaymentMethods.lightning,
      path: PathName.fundingPaymentLightning,
      isDisabled,
      disableClick: isDisabled,
      replacePath: true,
    })

    navBarItems.push({
      name: t('Onchain'),
      key: PaymentMethods.onChain,
      path: isOnchainMethodStarted ? '' : PathName.fundingPaymentOnchain,
      isDisabled: Boolean(onChainAmountWarning) || Boolean(!paymentMethod) || isFiatSwapMethodStarted,
      tooltipLabel: onChainAmountWarning || undefined,
      disableClick: isDisabled,
      replacePath: true,
    })

    return navBarItems
  }, [
    onChainAmountWarning,
    isOnchainMethodStarted,
    hasFiatPaymentOption,
    fiatPaymentMethod,
    paymentMethod,
    fiatLimitMessage,
    fiatSwapAmountWarning,
    userLimitReached,
    isFiatSwapMethodStarted,
    isDisabled,
  ])

  const activeButtonIndex = useMemo(() => {
    const currentItem = items.find((item) => item.key === paymentMethod)

    if (!currentItem) {
      return 0
    }

    return items.indexOf(currentItem)
  }, [paymentMethod, items])

  return <AnimatedNavBar items={items} activeIndex={activeButtonIndex} showLabel />
}
