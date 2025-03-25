import { VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess.ts'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { projectOwnerAtom } from '@/modules/project/state/projectAtom.ts'

import { FiatSwapStatus, fiatSwapStatusAtom } from './atom/fiatSwapStatusAtom.ts'
import { FiatSwapAwaitingPayment } from './components/FiatSwapAwaitingPayment.tsx'
import { FiatSwapContributorNotVerified } from './components/FiatSwapContributorNotVerified.tsx'
import { FiatSwapForm } from './components/FiatSwapForm.tsx'
import { FiatSwapOwnerNotVerified } from './components/FiatSwapOwnerNotVerified.tsx'

export const PaymentFiatSwap = () => {
  useListenFundingContributionSuccess()

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
  console.log('checking fiatswap status', fiatSwapStatus)

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
  }

  return (
    <VStack w="full" spacing={6}>
      {renderFiatSwapPayment()}
      {isProjectOwnerVerified && <FiatSwapContributorNotVerified />}
    </VStack>
  )
}
