import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { DonationInput } from './sections/DonationInput'
import { FundingInitRewards } from './sections/FundingInitRewards'
import { FundingInitBottomContent, FundingInitSideContent } from './sections/FundingInitSideContent'

export const FundingInit = () => {
  const { project } = useProjectAtom()

  const { setState } = useFundingFormAtom()

  return (
    <FundingLayout
      backPath={getPath('project', project.name)}
      sideContent={<FundingInitSideContent />}
      bottomContent={<FundingInitBottomContent />}
      containerProps={{ spacing: 6 }}
    >
      <CardLayout w="full" spacing={1}>
        <DonationInput name="donationAmount" onChange={setState} />
      </CardLayout>
      <FundingInitRewards />
    </FundingLayout>
  )
}
