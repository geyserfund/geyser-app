import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { hasProjectFundingLimitReachedAtom } from '@/modules/project/state/projectVerificationAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { FundingResourceType } from '@/types'
import { useNotification } from '@/utils/index.ts'

import { FundingLayout } from '../../layouts/FundingLayout'
import { DonationInput } from './sections/DonationInput'
import { FundingInitRewards } from './sections/FundingInitRewards'
import { FundingInitBottomContent, FundingInitSideContent } from './sections/FundingInitSideContent'
import { FundingSubscription } from './sections/FundingSubscription'

/** FundingInit is the first page of funding flow, consisting of donation input and rewards selection or subscription selection */
export const FundingInit = () => {
  const { setResource } = useFundingFormAtom()
  const { loading } = useProjectAtom()
  const hasFundingLimitReached = useAtomValue(hasProjectFundingLimitReachedAtom)
  const toast = useNotification()

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

  useEffect(() => {
    if (hasFundingLimitReached) {
      navigate(-1)
      setTimeout(() => {
        toast.error({
          title: 'This project has reached its Funding limit',
          description: 'Please try again, once the creator has removed the funding limits.',
        })
      }, 1000)
    }
  }, [hasFundingLimitReached, navigate, toast])

  if (loading) {
    return null
  }

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
