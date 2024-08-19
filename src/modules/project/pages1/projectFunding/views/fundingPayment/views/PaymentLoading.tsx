import { useBreakpointValue, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useFundingAPI } from '@/modules/project/funding/hooks/useFundingAPI'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { SkeletonLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'

import { QRCodeSizeMap } from '../components/QRCodeComponent'

export const PaymentLoading = () => {
  const { requestFundingFromContext, requestFundingOptions } = useFundingAPI()

  const { isFundingInputAmountValid, isFundingUserInfoValid, project } = useFundingFormAtom()

  const qrSize = useBreakpointValue(QRCodeSizeMap)

  const navigate = useNavigate()

  useEffect(() => {
    if (isFundingInputAmountValid.valid && isFundingUserInfoValid.valid) {
      requestFundingFromContext(() => {
        navigate(getPath('fundingPaymentLightning', project.name))
      })
    }
  }, [isFundingInputAmountValid, isFundingUserInfoValid, navigate, project.name])

  useEffect(() => {
    if (requestFundingOptions.error) {
      navigate(getPath('fundingPaymentFailed', project.name))
    }
  }, [requestFundingOptions.error, project.name, navigate])

  return (
    <VStack w="full">
      <SkeletonLayout height={qrSize} width={qrSize} />
      <SkeletonLayout height="26px" width="200px" />
      <VStack w="full" spacing={6} pt={4}>
        <SkeletonLayout height="26px" width="230px" />
        <SkeletonLayout height="40px" width="310px" />
      </VStack>
    </VStack>
  )
}
