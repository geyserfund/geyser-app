import { useAtomValue } from 'jotai'

import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { FundingContributionSummary } from '@/modules/project/pages/projectFunding/components/FundingContributionSummary.tsx'
import { ProjectFundingSummary } from '@/modules/project/pages/projectFunding/components/ProjectFundingSummary.tsx'

import { paymentMethodAtom } from '../state/paymentMethodAtom.ts'
import { getActiveFundingPaymentDetails } from './FundingPaymentSummary.utils.ts'

/** FundingPaymentSummary selects the created payment details for the backend-backed funding summary. */
export const FundingPaymentSummary = () => {
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const paymentMethod = useAtomValue(paymentMethodAtom)

  const activePaymentDetails = getActiveFundingPaymentDetails(paymentMethod, fundingPaymentDetails)

  if (!activePaymentDetails?.amountDue) {
    return <ProjectFundingSummary />
  }

  return (
    <FundingContributionSummary amountDueSats={activePaymentDetails.amountDue} paymentDetails={activePaymentDetails} />
  )
}
