import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useFundingAPI } from '@/modules/project/funding/hooks/useFundingAPI'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'

export const PaymentLoading = () => {
  const { requestFundingFromContext, requestFundingOptions } = useFundingAPI()

  const { isFundingInputAmountValid, isFundingUserInfoValid, project } = useFundingFormAtom()

  const navigate = useNavigate()

  useEffect(() => {
    if (isFundingInputAmountValid.valid && isFundingUserInfoValid.valid) {
      requestFundingFromContext(() => {
        navigate(getPath('fundingPaymentLightning', project.name))
      })
    }
  }, [isFundingInputAmountValid, isFundingUserInfoValid, requestFundingFromContext, navigate, project.name])

  useEffect(() => {
    if (requestFundingOptions.error) {
      navigate(getPath('fundingPaymentFailed', project.name))
    }
  }, [requestFundingOptions.error, project.name, navigate])

  return <div>PaymentLoading</div>
}
