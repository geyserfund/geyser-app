import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { derivedDimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'

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
