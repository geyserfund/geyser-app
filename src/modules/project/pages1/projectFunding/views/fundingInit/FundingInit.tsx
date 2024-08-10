import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { DonationInput } from './sections/DonationInput'
import { FundingInitRewards } from './sections/FundingInitRewards'
import { FundingInitBottomContent, FundingInitSideContent } from './sections/FundingInitSideContent'

export const FundingInit = () => {
  const { project } = useFundingFormAtom()

  return (
    <FundingLayout
      backPath={getPath('project', project.name)}
      sideContent={<FundingInitSideContent />}
      bottomContent={<FundingInitBottomContent />}
      containerProps={{ spacing: 6 }}
    >
      <CardLayout w="full" spacing={1}>
        <DonationInput />
      </CardLayout>
      <FundingInitRewards />
    </FundingLayout>
  )
}
