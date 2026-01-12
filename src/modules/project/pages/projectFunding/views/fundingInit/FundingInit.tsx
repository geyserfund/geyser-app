// import { useAtomValue } from 'jotai'

import { useLocation, useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
// import { hasProjectFundingLimitReachedAtom } from '@/modules/project/state/projectVerificationAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { getPath } from '@/shared/constants/index.ts'

// import { useNotification } from '@/utils/index.ts'
import { FundingLayout } from '../../layouts/FundingLayout'
import { DonationInput } from './sections/DonationInput'
import { FundingInitRewards } from './sections/FundingInitRewards'
import { FundingInitBottomContent, FundingInitSideContent } from './sections/FundingInitSideContent'
import { FundingSubscription } from './sections/FundingSubscription'
import { GeyserTipInput } from './sections/GeyserTipInput.tsx'

/** FundingInit is the first page of funding flow, consisting of donation input and rewards selection or subscription selection */
export const FundingInit = () => {
  const { loading, project } = useProjectAtom()
  const navigate = useNavigate()

  // const hasFundingLimitReached = useAtomValue(hasProjectFundingLimitReachedAtom)
  // const toast = useNotification()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isSub = queryParams.get('isSub') === 'true'

  // useEffect(() => {
  //   if (hasFundingLimitReached) {
  //     navigate(-1)
  //     setTimeout(() => {
  //       toast.error({
  //         title: 'This project has reached its Funding limit',
  //         description: 'Please try again, once the creator has removed the funding limits.',
  //       })
  //     }, 1000)
  //   }
  // }, [hasFundingLimitReached, navigate, toast])

  if (loading) {
    return null
  }

  return (
    <FundingLayout
      sideContent={<FundingInitSideContent />}
      bottomContent={<FundingInitBottomContent />}
      containerProps={{ spacing: 6 }}
      backButtonProps={{
        onClick: () => navigate(getPath('project', project.name)),
      }}
    >
      {isSub ? (
        <>
          <FundingSubscription />
        </>
      ) : (
        <>
          <CardLayout w="full" spacing={1}>
            <DonationInput />
          </CardLayout>
          <GeyserTipInput />
          <FundingInitRewards />
        </>
      )}
    </FundingLayout>
  )
}
