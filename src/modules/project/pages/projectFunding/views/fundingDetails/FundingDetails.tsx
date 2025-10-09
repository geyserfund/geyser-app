import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { useShippingAddressForm } from './hooks/useShippingAddressForm.tsx'
import { FundingDetailsPrivateCommentPrompt } from './sections/FundingDetailsPrivateCommentPrompt'
import { FundingDetailsShippingAddress } from './sections/FundingDetailsShippingAddress.tsx'
import { FundingDetailsBottomContent, FundingDetailsSideContent } from './sections/FundingDetailsSideContent'
import { FundingDetailsUserComment } from './sections/FundingDetailsUserComment'
import { FundingDetailsUserEmailAndUpdates } from './sections/FundingDetailsUserEmail'

/** FundingDetails is the second page of funding flow, consisting of extra input from contributor like user email, comment, and private comment prompt */
export const FundingDetails = () => {
  const { project, isFundingInputAmountValid } = useFundingFormAtom()

  const navigate = useNavigate()

  const { form, handleSubmitWrapper } = useShippingAddressForm()

  useEffect(() => {
    if (!isFundingInputAmountValid.valid) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [isFundingInputAmountValid, project.name, navigate])

  return (
    <FundingLayout
      sideContent={<FundingDetailsSideContent addressForm={form} handleSubmit={handleSubmitWrapper} />}
      bottomContent={<FundingDetailsBottomContent addressForm={form} handleSubmit={handleSubmitWrapper} />}
      containerProps={{ spacing: 6 }}
    >
      <FundingDetailsShippingAddress form={form} />
      <FundingDetailsUserEmailAndUpdates />
      <FundingDetailsUserComment />
      <FundingDetailsPrivateCommentPrompt />
    </FundingLayout>
  )
}
