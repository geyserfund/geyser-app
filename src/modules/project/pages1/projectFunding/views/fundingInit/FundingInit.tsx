import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { DonationInput } from './sections/DonationInput'
import { FundingInitRewards } from './sections/FundingInitRewards'
import { FundingInitBottomContent, FundingInitSideContent } from './sections/FundingInitSideContent'

export const FundingInit = () => {
  const { project } = useProjectAtom()

  return (
    <FundingLayout
      backPath={getPath('project', project.name)}
      sideContent={<FundingInitSideContent />}
      bottomContent={<FundingInitBottomContent />}
      containerProps={{ spacing: 6 }}
    >
      <DonationInput />
      <FundingInitRewards />
    </FundingLayout>
  )
}
