import { Button, Icon, Link } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { SingleValue } from 'chakra-react-select'
import { t } from 'i18next'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { PiInfo, PiMoneyWavy } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import {
  fundingPaymentDetailsAtom,
  fundingPaymentDetailsPartialUpdateAtom,
} from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useFundingFiatSwapPaymentCreateMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { WaitingForPayment } from '../../components/WaitingForPayment.tsx'
import { fiatSwapCurrencies } from './data.ts'
import { FiatSwapStatus, fiatSwapStatusAtom } from './fiatSwapStatus.ts'

export const PaymentFiatSwap = () => {
  const toast = useNotification()
  const navigate = useNavigate()
  const location = useLocation()

  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)
  const userId = fundingInputAfterRequest?.user?.id

  useEffect(() => {
    if (!userId) {
      navigate({ pathname: '../lightning', search: location.search }, { replace: true })
    }
  }, [userId])

  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const updateFundingPaymentDetails = useSetAtom(fundingPaymentDetailsPartialUpdateAtom)

  const [fiatSwapStatus, setFiatSwapStatus] = useAtom(fiatSwapStatusAtom)

  const [selectedCurrency, setSelectedCurrency] = useState<SingleValue<{ label: string; value: string }>>()

  const fundingContribution = useAtomValue(fundingContributionAtom)

  const [createFiatSwapPayment, { loading: isLoading }] = useFundingFiatSwapPaymentCreateMutation()

  const handleCreateFiatSwapPayment = async () => {
    if (!selectedCurrency?.value) {
      toast.error({
        title: t('Please select a currency'),
      })
      return
    }

    const { data } = await createFiatSwapPayment({
      variables: {
        input: {
          contributionId: fundingContribution.id,
          paymentsInput: {
            fiatSwap: {
              create: true,
              banxa: {
                fiatCurrency: selectedCurrency?.value || '',
                returnUrl: `${window.location.origin}/project/${fundingContribution.projectId}/funding/start/payment/fiat-swap?transactionId=${fundingContribution.uuid}`,
              },
            },
          },
        },
      },
    })

    if (data?.contributionPaymentsAdd.payments.fiatSwap?.checkoutUrl) {
      window.open(data.contributionPaymentsAdd.payments.fiatSwap.checkoutUrl, '_blank')
      updateFundingPaymentDetails({
        fiatSwap: data?.contributionPaymentsAdd.payments.fiatSwap,
      })
      setFiatSwapStatus(FiatSwapStatus.pending)
    }
  }

  const renderFiatSwapPayment = () => {
    if (fiatSwapStatus === FiatSwapStatus.initial) {
      return (
        <>
          <FieldContainer title={t('Currency')} subtitle={t('Select a currency supported by our payment provider')}>
            <CustomSelect
              width="100%"
              options={fiatSwapCurrencies}
              value={selectedCurrency}
              onChange={(value) => {
                setSelectedCurrency(value)
              }}
            />
          </FieldContainer>
          <Button
            width="100%"
            maxWidth="350px"
            size="lg"
            variant="solid"
            colorScheme="primary1"
            rightIcon={<Icon as={PiMoneyWavy} />}
            onClick={handleCreateFiatSwapPayment}
            isLoading={isLoading}
          >
            {t('Pay')}
          </Button>
        </>
      )
    }

    if (fiatSwapStatus === FiatSwapStatus.pending) {
      return (
        <VStack w="full" spacing={6} paddingTop={10}>
          <WaitingForPayment title={t('Waiting for payment to be confirmed')} />

          <Feedback
            variant={FeedBackVariant.INFO}
            icon={<Icon as={PiInfo} fontSize="30px" />}
            title={t('Waiting for payment to be confirmed')}
          >
            <VStack w="full" alignItems="start">
              <Body size="lg" bold>
                {t('Redirection Notice')}
              </Body>
              <Body>
                <Trans i18nextKey="You should be redirected to a new tab to complete your payment. If the page hasn't opened automatically, please open it by <1>clicking here.</1>">
                  {
                    "You should be redirected to a new tab to complete your payment. If the page hasn't opened automatically, please open it by"
                  }{' '}
                  <Link isExternal href={fundingPaymentDetails.fiatSwap?.checkoutUrl || ''}>
                    <Body as="span" medium textDecoration={'underline'}>
                      {t('clicking here')}
                    </Body>
                  </Link>
                </Trans>
              </Body>
            </VStack>
          </Feedback>
        </VStack>
      )
    }
  }

  return (
    <VStack w="full" spacing={6}>
      {renderFiatSwapPayment()}
    </VStack>
  )
}
