import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts'
import { FundingResourceType } from '@/types'

import { FundingLayout } from '../../layouts/FundingLayout'
import { DonationInput } from './sections/DonationInput'
import { FundingInitRewards } from './sections/FundingInitRewards'
import { FundingInitBottomContent, FundingInitSideContent } from './sections/FundingInitSideContent'

export const FundingInit = () => {
  const { setResource } = useFundingFormAtom()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state && location.state.entryId) {
      setResource({ resourceId: location.state.entryId, resourceType: FundingResourceType.Entry })
      navigate(location.pathname, { state: null })
    }
  }, [location, setResource, navigate])

  return (
    <FundingLayout
      backPath={'-1'}
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
