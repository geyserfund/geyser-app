import { useBreakpointValue, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

import { useFundingAPI } from '@/modules/project/funding/hooks/useFundingAPI'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { SkeletonLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'

import { QRCodeSizeMap } from '../../components/QRCodeComponent'
import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  hasFiatPaymentMethodAtom,
  intendedPaymentMethodAtom,
  PaymentMethods,
} from '../../state/paymentMethodAtom.ts'

export const PaymentLoadingContribution = ({
  onComplete,
}: {
  onComplete?: (_: string, forceCardRoute?: boolean) => void
}) => {
  const { requestFundingFromContext, requestFundingOptions } = useFundingAPI()

  const { isFundingInputAmountValid, isFundingUserInfoValid, project } = useFundingFormAtom()

  const qrSize = useBreakpointValue(QRCodeSizeMap)

  const navigate = useNavigate()

  const intendedPaymentMethod = useAtomValue(intendedPaymentMethodAtom)
  const fiatPaymentMethod = useAtomValue(fiatPaymentMethodAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)

  const data = useRef(false)

  useEffect(() => {
    if (isFundingInputAmountValid.valid && isFundingUserInfoValid.valid && !data.current) {
      data.current = true
      requestFundingFromContext((data) => {
        const {
          contributionCreate: {
            contribution: { uuid: contributionId, isSubscription },
            payments,
          },
        } = data

        if (contributionId && isSubscription) {
          navigate(
            {
              pathname: getPath('fundingSubscription', project.name),
              search: `?transactionId=${contributionId}`,
            },
            { replace: true },
          )
        } else if (contributionId) {
          if (onComplete) {
            onComplete(contributionId, Boolean(payments.fiat?.stripeClientSecret))
          } else {
            let paymentPath = getPath('fundingPaymentLightning', project.name)

            if (payments.fiat?.stripeClientSecret) {
              paymentPath = getPath('fundingPaymentFiatStripe', project.name)
            } else if (intendedPaymentMethod === PaymentMethods.fiatSwap) {
              if (hasFiatPaymentMethod) {
                paymentPath =
                  fiatPaymentMethod === fiatCheckoutMethods.applePay
                    ? getPath('fundingPaymentFiatBanxaApplePay', project.name)
                    : getPath('fundingPaymentFiatBanxa', project.name)
              } else {
                paymentPath = getPath('fundingStart', project.name)
              }
            }

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
