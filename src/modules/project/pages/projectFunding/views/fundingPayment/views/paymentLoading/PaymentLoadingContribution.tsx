import { useBreakpointValue, VStack } from '@chakra-ui/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

import { useFundingAPI } from '@/modules/project/funding/hooks/useFundingAPI'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { projectOwnerAtom } from '@/modules/project/state/projectAtom.ts'
import { SkeletonLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'

import { hasFiatPaymentMethodAtom, intendedPaymentMethodAtom, PaymentMethods } from '../../state/paymentMethodAtom'
import { QRCodeSizeMap } from '../../components/QRCodeComponent'

export const PaymentLoadingContribution = ({ onComplete }: { onComplete?: (_: string) => void }) => {
  const { requestFundingFromContext, requestFundingOptions } = useFundingAPI()

  const { isFundingInputAmountValid, isFundingUserInfoValid, project } = useFundingFormAtom()

  const qrSize = useBreakpointValue(QRCodeSizeMap)

  const navigate = useNavigate()

  const intendedPaymentMethod = useAtomValue(intendedPaymentMethodAtom)
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)
  const projectOwner = useAtomValue(projectOwnerAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)

  const isProjectOwnerVerified = projectOwner?.user.complianceDetails.verifiedDetails.identity?.verified
  const isFiatAvailable = hasFiatPaymentMethod && isProjectOwnerVerified

  const data = useRef(false)

  useEffect(() => {
    if (isFundingInputAmountValid.valid && isFundingUserInfoValid.valid && !data.current) {
      data.current = true
      requestFundingFromContext((data) => {
        const contributionId = data.contributionCreate.contribution.uuid

        if (contributionId && data.contributionCreate.contribution.isSubscription) {
          navigate(
            {
              pathname: getPath('fundingSubscription', project.name),
              search: `?transactionId=${contributionId}`,
            },
            { replace: true },
          )
        } else if (contributionId) {
          if (onComplete) {
            onComplete(contributionId)
          } else {
            let paymentPath = getPath('fundingPaymentLightning', project.name)

            if (intendedPaymentMethod === PaymentMethods.fiatSwap && isFiatAvailable) {
              paymentPath = getPath('fundingPaymentFiatSwap', project.name)
            }

            setIntendedPaymentMethod(undefined)

            navigate(
              {
                pathname: paymentPath,
                search: `?transactionId=${contributionId}`,
              },
              { replace: true },
            )
          }
        }
      })
    }
    // NOTE: adding `requestFundingFromContext` to dependencies causes rerender loops, do not add until resolved
  }, [isFundingInputAmountValid, isFundingUserInfoValid, navigate, project.name])

  useEffect(() => {
    if (requestFundingOptions.error) {
      navigate(getPath('fundingPaymentFailed', project.name), { replace: true })
    }
  }, [requestFundingOptions.error, project.name, navigate])

  return (
    <VStack w="full" spacing={4}>
      <VStack w="full" alignItems="start">
        <SkeletonLayout height="26px" width="120px" />
        <SkeletonLayout height="44px" width="full" />
      </VStack>

      <SkeletonLayout height={qrSize} width={qrSize} />
      <SkeletonLayout height="26px" width="200px" />
      <VStack w="full" spacing={6} pt={4}>
        <SkeletonLayout height="26px" width="230px" />
        <SkeletonLayout height="40px" width="310px" />
      </VStack>
    </VStack>
  )
}
