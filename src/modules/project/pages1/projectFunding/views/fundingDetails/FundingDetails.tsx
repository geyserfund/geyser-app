import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { FundingDetailsBottomContent, FundingDetailsSideContent } from './sections/FundingDetailsSideContent'
import { FundingDetailsUserComment } from './sections/FundingDetailsUserComment'
import { FundingDetailsUserEmail } from './sections/FundingDetailsUserEmail'

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
      backPath={getPath('projectFunding', project.name)}
      sideContent={<FundingDetailsSideContent />}
      bottomContent={<FundingDetailsBottomContent />}
      containerProps={{ spacing: 6 }}
    >
      <FundingDetailsUserComment />
      <FundingDetailsUserEmail />
    </FundingLayout>
  )
}
