import { useAtomValue } from 'jotai'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { recurringContributionRenewalAtom } from '@/modules/project/funding/state/recurringContributionRenewalAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { recurringFundingModes, recurringIntervals } from '@/modules/project/recurring/graphql.ts'
// import { hasProjectFundingLimitReachedAtom } from '@/modules/project/state/projectVerificationAtom.ts'
import { getPath } from '@/shared/constants/index.ts'

// import { useNotification } from '@/utils/index.ts'
import { FundingLayout } from '../../layouts/FundingLayout'
import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  intendedPaymentMethodAtom,
} from '../fundingPayment/state/paymentMethodAtom.ts'
import { DonationInput } from './sections/DonationInput'
import { FundingInitRewards } from './sections/FundingInitRewards'
import { FundingInitBottomContent, FundingInitSideContent } from './sections/FundingInitSideContent'
import { GeyserTipInput } from './sections/GeyserTipInput.tsx'

/** FundingInit is the first page of funding flow, consisting of donation input and rewards selection or subscription selection */
export const FundingInit = () => {
  const { loading, project } = useProjectAtom()
  const { fundingMode, setState, updateSubscription } = useFundingFormAtom()
  const recurringContributionRenewal = useAtomValue(recurringContributionRenewalAtom)
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)
  const setFiatPaymentMethod = useSetAtom(fiatPaymentMethodAtom)
  const navigate = useNavigate()

  // const hasFundingLimitReached = useAtomValue(hasProjectFundingLimitReachedAtom)
  // const toast = useNotification()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const mode = queryParams.get('mode')
  const planId = queryParams.get('planId')

  useEffect(() => {
    if (recurringContributionRenewal) {
      return
    }

    if (mode === 'recurring') {
      setState('fundingMode', recurringFundingModes.recurringDonation)
      setState('recurringInterval', recurringIntervals.monthly)
      return
    }

    if (mode === 'membership') {
      setState('fundingMode', recurringFundingModes.membership)
      setIntendedPaymentMethod(undefined)
      setFiatPaymentMethod(fiatCheckoutMethods.creditCard)

      const parsedPlanId = Number(planId)
      if (Number.isInteger(parsedPlanId) && parsedPlanId > 0) {
        updateSubscription({ id: parsedPlanId })
      }

      return
    }

    setState('fundingMode', recurringFundingModes.oneTime)
    setIntendedPaymentMethod(undefined)
    setFiatPaymentMethod(fiatCheckoutMethods.creditCard)
  }, [
    mode,
    planId,
    recurringContributionRenewal,
    setFiatPaymentMethod,
    setIntendedPaymentMethod,
    setState,
    updateSubscription,
  ])

  // useEffect(() => {
  //   if (hasFundingLimitReached) {
  //     navigate(-1)
  //     setTimeout(() => {
  //       toast.error({
  //         title: 'This project has reached its Funding limit',
  //         description: 'Please try again, once the creator has removed the funding limits.',
  //       })
  //     }, 1000)
  //   }
  // }, [hasFundingLimitReached, navigate, toast])

  if (loading) {
    return null
  }

  return (
    <FundingLayout
      sideContent={<FundingInitSideContent />}
      bottomContent={<FundingInitBottomContent />}
      containerProps={{ spacing: 6 }}
      backButtonProps={{
        onClick: () => navigate(getPath('project', project.name)),
      }}
    >
      <>
        <DonationInput />

        {!recurringContributionRenewal && <GeyserTipInput />}

        {fundingMode === recurringFundingModes.oneTime && (
          <>
            <FundingInitRewards />
          </>
        )}
      </>
    </FundingLayout>
  )
}
