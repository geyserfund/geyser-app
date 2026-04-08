import { useBreakpointValue, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useFundingAPI } from '@/modules/project/funding/hooks/useFundingAPI'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import {
  ProjectSubscriptionStartMutation,
  RecurringContributionRenewalCreateMutation,
  RecurringDonationCreateMutation,
} from '@/modules/project/recurring/graphql'
import { SkeletonLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'
import { ContributionCreateMutation } from '@/types'

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

  const location = useLocation()
  const navigate = useNavigate()

  const intendedPaymentMethod = useAtomValue(intendedPaymentMethodAtom)
  const fiatPaymentMethod = useAtomValue(fiatPaymentMethodAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)

  const data = useRef(false)

  const getCheckoutPayload = (
    response:
      | ContributionCreateMutation
      | RecurringDonationCreateMutation
      | ProjectSubscriptionStartMutation
      | RecurringContributionRenewalCreateMutation,
  ) => {
    if ('contributionCreate' in response) {
      return response.contributionCreate
    }

    if ('recurringDonationCreate' in response) {
      return response.recurringDonationCreate
    }

    if ('recurringContributionRenewalCreate' in response) {
      return response.recurringContributionRenewalCreate
    }

    return response.projectSubscriptionStart
  }

  useEffect(() => {
    if (isFundingInputAmountValid.valid && isFundingUserInfoValid.valid && !data.current) {
      data.current = true
      requestFundingFromContext((data) => {
        const {
          contribution: { uuid: contributionId },
          payments,
        } = getCheckoutPayload(data)

        if (contributionId) {
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

            const searchParams = new URLSearchParams(location.search)
            searchParams.set('transactionId', contributionId)

            navigate(
              {
                pathname: paymentPath,
                search: `?${searchParams.toString()}`,
              },
              { replace: true },
            )
          }
        }
      })
    }
    // NOTE: adding `requestFundingFromContext` to dependencies causes rerender loops, do not add until resolved
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
