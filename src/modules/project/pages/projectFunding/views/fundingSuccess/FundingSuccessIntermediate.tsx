import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess.ts'

import { FundingSuccessUI } from './views/FundingSuccessUI.tsx'

export const FundingSuccessIntermediate = () => {
  useListenFundingContributionSuccess()

  return <FundingSuccessUI isPending={true} />
}
