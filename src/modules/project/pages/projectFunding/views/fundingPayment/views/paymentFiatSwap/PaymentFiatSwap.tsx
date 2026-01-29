import { VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { Navigate } from 'react-router'

import { fundingProjectAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { getPath } from '@/shared/constants'
import { isAllOrNothing } from '@/utils'

import { fiatCheckoutMethods, fiatPaymentMethodAtom } from '../../state/paymentMethodAtom.ts'
import { FiatSwapOwnerNotVerified } from './components/FiatSwapOwnerNotVerified.tsx'

export const PaymentFiatSwap = () => {
  const project = useAtomValue(fundingProjectAtom)
  const fiatPaymentMethod = useAtomValue(fiatPaymentMethodAtom)

  const isAon = isAllOrNothing(project)

  if (!isAon) {
    const paymentPath =
      fiatPaymentMethod === fiatCheckoutMethods.applePay
        ? getPath('fundingPaymentApplePay', project.name)
        : getPath('fundingPaymentCreditCard', project.name)

    return <Navigate to={paymentPath} replace />
  }

  return (
    <VStack w="full" spacing={6}>
      <FiatSwapOwnerNotVerified />
    </VStack>
  )
}
