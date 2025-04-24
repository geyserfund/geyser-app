import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { launchContributionProjectIdAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { derivedDimensions, getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { FundingPaymentBottomContent, FundingPaymentSideContent } from './sections/FundingPaymentSideContent'

export const Funding = () => {
  const { isFundingInputAmountValid, isFundingUserInfoValid, project } = useFundingFormAtom()
  const launchContributionProjectId = useAtomValue(launchContributionProjectIdAtom)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isFundingInputAmountValid.valid || !isFundingUserInfoValid.valid) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [isFundingInputAmountValid, isFundingUserInfoValid, navigate, project.name])

  return (
    <FundingLayout
      sideContent={!launchContributionProjectId ? <FundingPaymentSideContent /> : undefined}
      bottomContent={!launchContributionProjectId ? <FundingPaymentBottomContent /> : undefined}
      containerProps={{
        minHeight: derivedDimensions.heightAfterTopNavBar,
      }}
    >
      <CardLayout mobileDense flex={6} w="full" h="full" justifyContent="space-between">
        <Outlet />
      </CardLayout>
    </FundingLayout>
  )
}
