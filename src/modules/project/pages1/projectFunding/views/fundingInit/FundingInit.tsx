import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts'
import { FundingResourceType } from '@/types'

import { FundingLayout } from '../../layouts/FundingLayout'
import { DonationInput } from './sections/DonationInput'
import { FundingInitRewards } from './sections/FundingInitRewards'
import { FundingInitBottomContent, FundingInitSideContent } from './sections/FundingInitSideContent'
import { FundingSubscription } from './sections/FundingSubscription'

export const FundingInit = () => {
  const { setResource } = useFundingFormAtom()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isSub = queryParams.get('isSub') === 'true'
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state && location.state.entryId) {
      setResource({ resourceId: location.state.entryId, resourceType: FundingResourceType.Entry })
      navigate({ pathname: location.pathname, search: location.search }, { state: null, replace: true })
    }
  }, [location, setResource, navigate])

  return (
    <FundingLayout
      sideContent={<FundingInitSideContent />}
      bottomContent={<FundingInitBottomContent />}
      containerProps={{ spacing: 6 }}
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
          <FundingInitRewards />
        </>
      )}
    </FundingLayout>
  )
}
