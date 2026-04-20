import { useAtomValue } from 'jotai'
import { Navigate } from 'react-router'

import { fundingProjectAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { getPath } from '@/shared/constants'

import { fiatCheckoutMethods, fiatPaymentMethodAtom } from '../../state/paymentMethodAtom.ts'

export const PaymentFiatSwap = () => {
  const project = useAtomValue(fundingProjectAtom)
  const fiatPaymentMethod = useAtomValue(fiatPaymentMethodAtom)

  const paymentPath =
    fiatPaymentMethod === fiatCheckoutMethods.applePay
      ? getPath('fundingPaymentApplePay', project.name)
      : getPath('fundingPaymentCreditCard', project.name)

  return <Navigate to={paymentPath} replace />
}
