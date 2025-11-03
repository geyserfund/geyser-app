import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { FundingGuardiansBadgeSelection } from './sections/FundingGuardiansBadgeSelection.tsx'
import { FundingGuardiansBottomContent, FundingGuardiansSideContent } from './sections/FundingGuardiansSideContent.tsx'

/** FundingDetails is the second page of funding flow, consisting of extra input from contributor like user email, comment, and private comment prompt */
export const FundingGuardians = () => {
  const { project, isFundingInputAmountValid } = useFundingFormAtom()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isFundingInputAmountValid.valid) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [isFundingInputAmountValid, project.name, navigate])

  return (
    <FundingLayout
      sideContent={<FundingGuardiansSideContent />}
      bottomContent={<FundingGuardiansBottomContent />}
      containerProps={{ spacing: 6 }}
    >
      <FundingGuardiansBadgeSelection />
    </FundingLayout>
  )
}
