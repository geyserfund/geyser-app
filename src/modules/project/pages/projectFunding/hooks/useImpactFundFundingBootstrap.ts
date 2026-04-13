import { useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { recurringFundingModes, recurringIntervals } from '@/modules/project/recurring/graphql.ts'
import { IMPACT_FUND_DONATION_AMOUNT_SEARCH_PARAM } from '@/shared/constants/impactFundDonationFlow.ts'

import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  intendedPaymentMethodAtom,
} from '../views/fundingPayment/state/paymentMethodAtom.ts'

/** Bootstraps the recurring funding flow when a user starts from the impact fund donation modal. */
export const useImpactFundFundingBootstrap = () => {
  const location = useLocation()
  const { resetForm, setState } = useFundingFormAtom()
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)
  const setFiatPaymentMethod = useSetAtom(fiatPaymentMethodAtom)
  const [isBootstrapped, setIsBootstrapped] = useState(false)

  const presetMonthlyAmountUsdCent = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    const mode = searchParams.get('mode')
    const rawAmount = Number(searchParams.get(IMPACT_FUND_DONATION_AMOUNT_SEARCH_PARAM))

    if (mode !== 'recurring' || !Number.isFinite(rawAmount) || rawAmount <= 0) {
      return null
    }

    return Math.round(rawAmount)
  }, [location.search])

  useEffect(() => {
    if (!presetMonthlyAmountUsdCent) {
      setIsBootstrapped(true)
      return
    }

    setIsBootstrapped(false)
    resetForm()
    setState('fundingMode', recurringFundingModes.recurringDonation)
    setState('recurringInterval', recurringIntervals.monthly)
    setState('donationAmountUsdCent', presetMonthlyAmountUsdCent)
    setState('geyserTipPercent', 0)
    setIntendedPaymentMethod(undefined)
    setFiatPaymentMethod(fiatCheckoutMethods.creditCard)
    setIsBootstrapped(true)
  }, [presetMonthlyAmountUsdCent, resetForm, setFiatPaymentMethod, setIntendedPaymentMethod, setState])

  return {
    isImpactFundFundingBootstrapLoading: Boolean(presetMonthlyAmountUsdCent) && !isBootstrapped,
  }
}
