import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts'
import { derivedDimensions, getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { FundingPaymentBottomContent, FundingPaymentSideContent } from './sections/FundingPaymentSideContent'

export const Funding = () => {
  const { isFundingInputAmountValid, isFundingUserInfoValid, project } = useFundingFormAtom()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isFundingInputAmountValid.valid || !isFundingUserInfoValid.valid) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [isFundingInputAmountValid, isFundingUserInfoValid, navigate, project.name])

  return (
    <FundingLayout
      sideContent={<FundingPaymentSideContent />}
      bottomContent={<FundingPaymentBottomContent />}
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
