import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { PathName } from '@/shared/constants'
import type { FundingContributionPaymentDetailsFragment, ProjectPaymentMethodsFragment } from '@/types/index.ts'

import { isOnchainMethodStartedAtom, paymentMethodAtom, PaymentMethods } from '../state/paymentMethodAtom.ts'

const getManagedRailAvailability = (
  paymentDetails: FundingContributionPaymentDetailsFragment,
  managedRails: ProjectPaymentMethodsFragment['managedRecoverableGrant'],
) => {
  const hasPayment = Boolean(
    paymentDetails.strikeLightning?.paymentId ||
      paymentDetails.strikeOnChain?.paymentId ||
      paymentDetails.strike?.paymentId,
  )
  const hasLightning = Boolean(paymentDetails.strikeLightning?.paymentRequest || paymentDetails.strike?.paymentRequest)
  const hasOnChain = Boolean(paymentDetails.strikeOnChain?.address || paymentDetails.strike?.address)

  return {
    lightningUnavailable: !managedRails.strikeLightning || (hasPayment && !hasLightning),
    onChainUnavailable: !managedRails.strikeOnChain || (hasPayment && !hasOnChain),
  }
}

export const PaymentMethodSelection = () => {
  const { onChainAmountWarning } = useFundingFormAtom()
  const { project } = useProjectAtom()
  const isManaged = isManagedRecoverableGrantProject(project)
  const managedRails = project.paymentMethods?.managedRecoverableGrant

  const paymentMethod = useAtomValue(paymentMethodAtom)
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const isOnchainMethodStarted = useAtomValue(isOnchainMethodStartedAtom)
  const isDisabled = isOnchainMethodStarted || Boolean(!paymentMethod)
  const managedAvailability = getManagedRailAvailability(fundingPaymentDetails, managedRails)
  const managedLightningUnavailable = isManaged && managedAvailability.lightningUnavailable
  const managedOnchainUnavailable = isManaged && managedAvailability.onChainUnavailable
  const lightningDisabled = isDisabled || managedLightningUnavailable
  const onchainDisabled =
    (Boolean(onChainAmountWarning) && !isManaged) || Boolean(!paymentMethod) || managedOnchainUnavailable

  const items: AnimatedNavBarItem[] = [
    {
      name: t('Lightning'),
      key: PaymentMethods.lightning,
      path: PathName.fundingPaymentLightning,
      isDisabled: lightningDisabled,
      disableClick: lightningDisabled,
      replacePath: true,
    },
    {
      name: t('Onchain'),
      key: PaymentMethods.onChain,
      path: isOnchainMethodStarted ? '' : PathName.fundingPaymentOnchain,
      isDisabled: onchainDisabled,
      tooltipLabel: isManaged ? undefined : onChainAmountWarning || undefined,
      disableClick: isDisabled || managedOnchainUnavailable,
      replacePath: true,
    },
  ]

  const activeButtonIndex = Math.max(
    0,
    items.findIndex((item) => item.key === paymentMethod),
  )

  return <AnimatedNavBar items={items} activeIndex={activeButtonIndex} showLabel />
}
