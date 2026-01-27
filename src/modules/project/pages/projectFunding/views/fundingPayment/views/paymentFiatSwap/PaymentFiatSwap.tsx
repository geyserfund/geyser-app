import { VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'

import { useAuthContext } from '@/context'
import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess.ts'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { fundingProjectAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { projectOwnerAtom } from '@/modules/project/state/projectAtom.ts'
import { isAllOrNothing } from '@/utils'

import { hasFiatPaymentMethodAtom } from '../../state/paymentMethodAtom.ts'
import { FiatSwapStatus, fiatSwapStatusAtom } from './atom/fiatSwapStatusAtom.ts'
import { FiatSwapAwaitingPayment } from './components/FiatSwapAwaitingPayment.tsx'
import { FiatSwapContributorNotVerified } from './components/FiatSwapContributorNotVerified.tsx'
import { FiatSwapFailed } from './components/FiatSwapFailed.tsx'
import { FiatSwapForm } from './components/FiatSwapForm.tsx'
import { FiatSwapLoginRequired } from './components/FiatSwapLoginRequired.tsx'
import { FiatSwapOwnerNotVerified } from './components/FiatSwapOwnerNotVerified.tsx'
import { FiatSwapProcessing } from './components/FiatSwapProcessing.tsx'
import { useFiatSwapPaymentSubscription } from './useFiatSwapPaymentSubscription.tsx'

export const PaymentFiatSwap = () => {
  useListenFundingContributionSuccess()

  const contribution = useAtomValue(fundingContributionAtom)

  const contributionUUID = contribution?.uuid

  useFiatSwapPaymentSubscription({
    contributionUUID,
  })

  const { isLoggedIn } = useAuthContext()

  const projectOwner = useAtomValue(projectOwnerAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)
  const project = useAtomValue(fundingProjectAtom)

  const fiatSwapStatus = useAtomValue(fiatSwapStatusAtom)

  const isAon = isAllOrNothing(project)
  const isProjectOwnerVerified = projectOwner?.user.complianceDetails.verifiedDetails.identity?.verified
  const isFiatAvailable = Boolean(hasFiatPaymentMethod && isProjectOwnerVerified)

  const renderFiatSwapPayment = () => {
    if (isAon) {
      return <FiatSwapOwnerNotVerified />
    }

    if (!isFiatAvailable) {
      return <FiatSwapOwnerNotVerified />
    }

    if (!isLoggedIn) {
      return <FiatSwapLoginRequired />
    }

    if (fiatSwapStatus === FiatSwapStatus.initial) {
      return <FiatSwapForm />
    }

    if (fiatSwapStatus === FiatSwapStatus.pending) {
      return <FiatSwapAwaitingPayment />
    }

    if (fiatSwapStatus === FiatSwapStatus.processing) {
      return <FiatSwapProcessing />
    }

    if (fiatSwapStatus === FiatSwapStatus.failed) {
      return <FiatSwapFailed />
    }
  }

  return (
    <VStack w="full" spacing={6}>
      {renderFiatSwapPayment()}
      {isFiatAvailable && isLoggedIn && <FiatSwapContributorNotVerified />}
    </VStack>
  )
}
