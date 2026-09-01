import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { FundingDetailsPrivateCommentPrompt } from './sections/FundingDetailsPrivateCommentPrompt'
import { FundingDetailsBottomContent, FundingDetailsSideContent } from './sections/FundingDetailsSideContent'
import { FundingDetailsUserComment } from './sections/FundingDetailsUserComment'
import { FundingDetailsUserEmailAndUpdates } from './sections/FundingDetailsUserEmail'

/** FundingDetails is the second page of funding flow, consisting of extra input from contributor like user email, comment, and private comment prompt */
export const FundingDetails = () => {
  const { project, isFundingInputAmountValid } = useFundingFormAtom()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isFundingInputAmountValid.valid) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [isFundingInputAmountValid, project.name, navigate])

  return (
    <FundingLayout
      sideContent={<FundingDetailsSideContent />}
      bottomContent={<FundingDetailsBottomContent />}
      containerProps={{ spacing: 6 }}
    >
      <FundingDetailsUserEmailAndUpdates />
      <FundingDetailsUserComment />
      <FundingDetailsPrivateCommentPrompt />
    </FundingLayout>
  )
}
