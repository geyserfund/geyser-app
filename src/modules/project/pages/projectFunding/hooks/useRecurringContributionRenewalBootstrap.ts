import { useLazyQuery } from '@apollo/client'
import { useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { recurringContributionRenewalAtom } from '@/modules/project/funding/state/recurringContributionRenewalAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import {
  QUERY_RECURRING_CONTRIBUTION_RENEWAL_CONTEXT,
  RecurringContributionRenewalContextQuery,
  RecurringContributionRenewalContextQueryVariables,
  recurringFundingModes,
  recurringIntervals,
  recurringPaymentMethods,
} from '@/modules/project/recurring/graphql'
import { getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  intendedPaymentMethodAtom,
  PaymentMethods,
} from '../views/fundingPayment/state/paymentMethodAtom.ts'

const getRecurringInterval = (interval: 'MONTHLY' | 'YEARLY') =>
  interval === recurringIntervals.yearly ? recurringIntervals.yearly : recurringIntervals.monthly

const getIntendedPaymentMethod = (paymentMethod: 'BITCOIN' | 'BANXA' | 'STRIPE') =>
  paymentMethod === recurringPaymentMethods.bitcoin ? PaymentMethods.lightning : PaymentMethods.fiatSwap

export const useRecurringContributionRenewalBootstrap = () => {
  const toast = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const { project, loading: projectLoading } = useProjectAtom()
  const { resetForm, setState } = useFundingFormAtom()
  const setRecurringContributionRenewal = useSetAtom(recurringContributionRenewalAtom)
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)
  const setFiatPaymentMethod = useSetAtom(fiatPaymentMethodAtom)
  const [isBootstrapped, setIsBootstrapped] = useState(false)

  const renewalManagementNonce = useMemo(
    () => new URLSearchParams(location.search).get('renewRecurringContribution'),
    [location.search],
  )

  const [queryRecurringContributionRenewalContext, queryRecurringContributionRenewalContextOptions] = useLazyQuery<
    RecurringContributionRenewalContextQuery,
    RecurringContributionRenewalContextQueryVariables
  >(QUERY_RECURRING_CONTRIBUTION_RENEWAL_CONTEXT, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const recurringContribution = data.recurringContributionRenewalContext

      if (recurringContribution.kind === 'SUBSCRIPTION') {
        toast.error({
          title: 'Membership renewals are not available in the app right now',
          description: 'Please return to the project page and try again later.',
        })
        setRecurringContributionRenewal(null)
        navigate(getPath('project', recurringContribution.project?.name || project.name), { replace: true })
        return
      }

      if (recurringContribution.project?.name && recurringContribution.project.name !== project.name) {
        navigate(
          {
            pathname: getPath('fundingStart', recurringContribution.project.name),
            search: `?renewRecurringContribution=${renewalManagementNonce}`,
          },
          { replace: true },
        )
        return
      }

      resetForm()
      setRecurringContributionRenewal({
        managementNonce: renewalManagementNonce || '',
        recurringContributionId: recurringContribution.id,
        kind: recurringContribution.kind,
        paymentMethod: recurringContribution.paymentMethod,
        amount: recurringContribution.amount,
        currency: recurringContribution.currency,
        interval: recurringContribution.interval,
        userId: recurringContribution.userId,
        projectSubscriptionPlan: recurringContribution.projectSubscriptionPlan,
      })
      setState('fundingMode', recurringFundingModes.recurringDonation)
      setState('recurringInterval', getRecurringInterval(recurringContribution.interval))
      setIntendedPaymentMethod(getIntendedPaymentMethod(recurringContribution.paymentMethod))
      setFiatPaymentMethod(fiatCheckoutMethods.creditCard)

      if (recurringContribution.currency === 'USDCENT') {
        setState('donationAmountUsdCent', recurringContribution.amount)
      } else {
        setState('donationAmount', recurringContribution.amount)
      }

      setIsBootstrapped(true)
    },
    onError() {
      toast.error({
        title: 'This renewal link is no longer valid',
        description: 'Please open recurring payments from your account or return to the project page.',
      })
      setRecurringContributionRenewal(null)
      navigate(getPath('project', project.name), { replace: true })
    },
  })

  useEffect(() => {
    if (projectLoading) {
      return
    }

    if (!renewalManagementNonce) {
      setRecurringContributionRenewal(null)
      setIsBootstrapped(true)
      return
    }

    setIsBootstrapped(false)
    queryRecurringContributionRenewalContext({
      variables: { managementNonce: renewalManagementNonce },
    })
  }, [
    navigate,
    project.name,
    projectLoading,
    queryRecurringContributionRenewalContext,
    renewalManagementNonce,
    setRecurringContributionRenewal,
  ])

  return {
    isRenewalBootstrapLoading:
      Boolean(renewalManagementNonce) &&
      (!isBootstrapped || queryRecurringContributionRenewalContextOptions.loading),
  }
}
