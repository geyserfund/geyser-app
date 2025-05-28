import { VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess.ts'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { projectOwnerAtom } from '@/modules/project/state/projectAtom.ts'

import { FiatSwapStatus, fiatSwapStatusAtom } from './atom/fiatSwapStatusAtom.ts'
import { FiatSwapAwaitingPayment } from './components/FiatSwapAwaitingPayment.tsx'
import { FiatSwapContributorNotVerified } from './components/FiatSwapContributorNotVerified.tsx'
import { FiatSwapFailed } from './components/FiatSwapFailed.tsx'
import { FiatSwapForm } from './components/FiatSwapForm.tsx'
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

  const navigate = useNavigate()
  const location = useLocation()

  const projectOwner = useAtomValue(projectOwnerAtom)

  const fiatSwapStatus = useAtomValue(fiatSwapStatusAtom)

  const isProjectOwnerVerified = projectOwner?.user.complianceDetails.verifiedDetails.identity?.verified
  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)

  const userId = fundingInputAfterRequest?.user?.id

  useEffect(() => {
    if (!userId) {
      navigate({ pathname: '../lightning', search: location.search }, { replace: true })
    }
  }, [userId])

  const renderFiatSwapPayment = () => {
    if (!isProjectOwnerVerified) {
      return <FiatSwapOwnerNotVerified />
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
      {isProjectOwnerVerified && <FiatSwapContributorNotVerified />}
    </VStack>
  )
}
