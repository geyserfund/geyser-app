import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { PathName } from '@/shared/constants'

import { isOnchainMethodStartedAtom, paymentMethodAtom, PaymentMethods } from '../state/paymentMethodAtom.ts'

export const PaymentMethodSelection = () => {
  const { onChainAmountWarning } = useFundingFormAtom()

  const paymentMethod = useAtomValue(paymentMethodAtom)
  const isOnchainMethodStarted = useAtomValue(isOnchainMethodStartedAtom)
  const isDisabled = isOnchainMethodStarted || Boolean(!paymentMethod)

  const items: AnimatedNavBarItem[] = useMemo(() => {
    const navBarItems = [
      {
        name: t('Lightning'),
        key: PaymentMethods.lightning,
        path: PathName.fundingPaymentLightning,
        isDisabled,
        disableClick: isDisabled,
        replacePath: true,
      },
      {
        name: t('Onchain'),
        key: PaymentMethods.onChain,
        path: isOnchainMethodStarted ? '' : PathName.fundingPaymentOnchain,
        isDisabled: Boolean(onChainAmountWarning) || Boolean(!paymentMethod),
        tooltipLabel: onChainAmountWarning || undefined,
        disableClick: isDisabled,
        replacePath: true,
      },
    ] as AnimatedNavBarItem[]

    return navBarItems
  }, [onChainAmountWarning, isOnchainMethodStarted, paymentMethod, isDisabled])

  const activeButtonIndex = useMemo(() => {
    const currentItem = items.find((item) => item.key === paymentMethod)

    if (!currentItem) {
      return 0
    }

    return items.indexOf(currentItem)
  }, [paymentMethod, items])

  return <AnimatedNavBar items={items} activeIndex={activeButtonIndex} showLabel />
}
