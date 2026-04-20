import { useAtomValue } from 'jotai'
import { Navigate, useLocation } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { getPath } from '@/shared/constants/index.ts'

import { hasStripePaymentMethodAtom } from '../../state/paymentMethodAtom.ts'
import { PaymentCreditCard } from './PaymentCreditCard.tsx'

export const PaymentFiatStripe = () => {
  const { project } = useFundingFormAtom()
  const hasStripePaymentMethod = useAtomValue(hasStripePaymentMethodAtom)
  const location = useLocation()

  if (!hasStripePaymentMethod) {
    return (
      <Navigate to={{ pathname: getPath('fundingPaymentFiatBanxa', project.name), search: location.search }} replace />
    )
  }

  return <PaymentCreditCard provider="stripe" />
}

export const PaymentFiatBanxa = () => {
  const { project } = useFundingFormAtom()
  const hasStripePaymentMethod = useAtomValue(hasStripePaymentMethodAtom)
  const location = useLocation()

  if (hasStripePaymentMethod) {
    return (
      <Navigate to={{ pathname: getPath('fundingPaymentFiatStripe', project.name), search: location.search }} replace />
    )
  }

  return <PaymentCreditCard provider="banxa" banxaCheckoutMode="creditCard" />
}

export const PaymentFiatBanxaApplePay = () => {
  const { project } = useFundingFormAtom()
  const hasStripePaymentMethod = useAtomValue(hasStripePaymentMethodAtom)
  const location = useLocation()

  if (hasStripePaymentMethod) {
    return (
      <Navigate to={{ pathname: getPath('fundingPaymentFiatStripe', project.name), search: location.search }} replace />
    )
  }

  return <PaymentCreditCard provider="banxa" banxaCheckoutMode="applePay" />
}

export const PaymentFiatLegacyCreditCardRedirect = () => {
  const { project } = useFundingFormAtom()
  const location = useLocation()
  const hasStripePaymentMethod = useAtomValue(hasStripePaymentMethodAtom)

  const paymentPath = hasStripePaymentMethod
    ? getPath('fundingPaymentFiatStripe', project.name)
    : getPath('fundingPaymentFiatBanxa', project.name)

  return <Navigate to={{ pathname: paymentPath, search: location.search }} replace />
}

export const PaymentFiatLegacyApplePayRedirect = () => {
  const { project } = useFundingFormAtom()
  const location = useLocation()

  return (
    <Navigate
      to={{
        pathname: getPath('fundingPaymentFiatBanxaApplePay', project.name),
        search: location.search,
      }}
      replace
    />
  )
}

export const PaymentFiatLegacyBanxaRedirect = () => {
  const { project } = useFundingFormAtom()
  const location = useLocation()

  return (
    <Navigate to={{ pathname: getPath('fundingPaymentFiatBanxa', project.name), search: location.search }} replace />
  )
}
