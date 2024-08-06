import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { FundingDetailsBottomContent, FundingDetailsSideContent } from './sections/FundingDetailsSideContent'
import { FundingDetailsUserComment } from './sections/FundingDetailsUserComment'
import { FundingDetailsUserEmail } from './sections/FundingDetailsUserEmail'

export const FundingDetails = () => {
  const { project } = useProjectAtom()

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
