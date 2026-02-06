import { Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PiArrowSquareOut } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { useFundingAPI } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess.ts'
import { useResetContribution } from '@/modules/project/funding/hooks/useResetContribution.ts'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { getPath, PathName } from '@/shared/constants/index.ts'
import { useGetUserIpCountryQuery } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { FundingDisclaimer } from '../../components/FundingDisclaimer.tsx'
import { ReachOutForHelpButton } from '../../components/ReachOutForHelpButton.tsx'
import { fiatCheckoutMethods, fiatPaymentMethodAtom, hasFiatPaymentMethodAtom } from '../../state/paymentMethodAtom.ts'
import { fiatSwapStatusAtom } from '../paymentFiatSwap/atom/fiatSwapStatusAtom.ts'
import { BitcoinPurchaseNotice } from '../paymentFiatSwap/components/BitcoinPurchaseNotice.tsx'
import { FiatSwapAwaitingPayment } from '../paymentFiatSwap/components/FiatSwapAwaitingPayment.tsx'
import { FiatSwapFailed } from '../paymentFiatSwap/components/FiatSwapFailed.tsx'
import { FiatSwapProcessing } from '../paymentFiatSwap/components/FiatSwapProcessing.tsx'
import { FiatSwapStatusView } from '../paymentFiatSwap/components/FiatSwapStatusView.tsx'
import { banxaPaymentMethodIds, fiatSwapCurrencies } from '../paymentFiatSwap/data.ts'
import { useCreateFiatSwapPayment } from '../paymentFiatSwap/hooks/useCreateFiatSwapPayment.ts'
import { useFiatSwapPaymentSubscription } from '../paymentFiatSwap/useFiatSwapPaymentSubscription.tsx'

/** PaymentCreditCard: handles credit card and apple pay Banxa flow without the payment method selection UI */
export const PaymentCreditCard = () => {
  useListenFundingContributionSuccess()

  const navigate = useNavigate()
  const location = useLocation()

  const { isFundingInputAmountValid, isFundingUserInfoValid, project } = useFundingFormAtom()

  const { requestFiatOnlyFundingFromContext, requestFundingOptions } = useFundingAPI()
  const resetContribution = useResetContribution()

  const fundingContribution = useAtomValue(fundingContributionAtom)
  const contributionUUID = fundingContribution?.uuid

  const fiatSwapStatus = useAtomValue(fiatSwapStatusAtom)
  const fiatPaymentMethod = useAtomValue(fiatPaymentMethodAtom)
  const setFiatPaymentMethod = useSetAtom(fiatPaymentMethodAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)

  const [selectedCurrency, setSelectedCurrency] = useState('')

  const hasContribution = Boolean(fundingContribution?.id)
  const hasRequestedContribution = useRef(false)

  const isApplePay = fiatPaymentMethod === fiatCheckoutMethods.applePay

  useFiatSwapPaymentSubscription({
    contributionUUID,
  })

  useEffect(() => {
    resetContribution()
    hasRequestedContribution.current = false
    setSelectedCurrency('')
  }, [location.pathname, resetContribution])

  useEffect(() => {
    if (location.pathname.includes(PathName.fundingPaymentApplePay)) {
      setFiatPaymentMethod(fiatCheckoutMethods.applePay)
      return
    }

    if (location.pathname.includes(PathName.fundingPaymentCreditCard)) {
      setFiatPaymentMethod(fiatCheckoutMethods.creditCard)
    }
  }, [location.pathname, setFiatPaymentMethod])

  useEffect(() => {
    if (!hasFiatPaymentMethod) {
      navigate(getPath('fundingStart', project.name), { replace: true })
    }
  }, [hasFiatPaymentMethod, project.name, navigate])

  useEffect(() => {
    if (hasContribution) {
      return
    }

    if (!hasFiatPaymentMethod) {
      return
    }

    if (isFundingInputAmountValid.valid && isFundingUserInfoValid.valid && !hasRequestedContribution.current) {
      hasRequestedContribution.current = true
      requestFiatOnlyFundingFromContext((data) => {
        const contributionId = data.contributionCreate.contribution.uuid

        if (contributionId && data.contributionCreate.contribution.isSubscription) {
          navigate(
            {
              pathname: getPath('fundingSubscription', project.name),
              search: `?transactionId=${contributionId}`,
            },
            { replace: true },
          )
        }
      })
    }
    // NOTE: adding `requestFiatOnlyFundingFromContext` to dependencies causes rerender loops, do not add until resolved
  }, [isFundingInputAmountValid, isFundingUserInfoValid, navigate, project.name, hasContribution, hasFiatPaymentMethod])

  useEffect(() => {
    if (requestFundingOptions.error) {
      navigate(getPath('fundingPaymentFailed', project.name), { replace: true })
    }
  }, [requestFundingOptions.error, project.name, navigate])

  const renderContent = () => {
    if (!hasContribution) {
      return <PaymentCreditCardLoading />
    }

    return (
      <FiatSwapStatusView
        status={fiatSwapStatus}
        renderInitial={() => (
          <FiatPaymentForm
            isApplePay={isApplePay}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
          />
        )}
        renderPending={() => <FiatSwapAwaitingPayment />}
        renderProcessing={() => <FiatSwapProcessing />}
        renderFailed={() => <FiatSwapFailed />}
      />
    )
  }

  return (
    <>
      <VStack flex={1} w="full" alignItems="start">
        <H1 size="2xl" bold>
          {isApplePay ? t('Apple Pay Payment') : t('Credit Card or Bank Transfer')}
        </H1>
        <VStack w="full" spacing={6}>
          {renderContent()}
        </VStack>
      </VStack>

      <VStack w="full" spacing={0}>
        <ReachOutForHelpButton />
        <FundingDisclaimer />
      </VStack>
    </>
  )
}

type FiatPaymentFormProps = {
  isApplePay: boolean
  selectedCurrency: string
  onCurrencyChange: (currency: string) => void
}

/** FiatPaymentForm: renders the currency selector and Banxa redirect action */
const FiatPaymentForm = ({ isApplePay, selectedCurrency, onCurrencyChange }: FiatPaymentFormProps) => {
  const toast = useNotification()
  const { createFiatSwapPayment, loading: isLoading } = useCreateFiatSwapPayment()

  const selectedCurrencyOption = useMemo(
    () => fiatSwapCurrencies.find((currency) => currency.value === selectedCurrency),
    [selectedCurrency],
  )

  const handleCreateFiatSwapPayment = async () => {
    if (!selectedCurrency) {
      toast.error({
        title: t('Please select a currency'),
      })
      return
    }

    await createFiatSwapPayment({
      fiatCurrency: selectedCurrency,
      paymentMethodId: isApplePay ? banxaPaymentMethodIds.applePay : '',
    })
  }

  return (
    <VStack w="full" spacing={6} alignItems="start">
      <CreditCardCurrencySelect selectedCurrencyOption={selectedCurrencyOption} onCurrencyChange={onCurrencyChange} />
      <BitcoinPurchaseNotice />
      <VStack w="full" alignItems="start" spacing={3}>
        <Button
          width="100%"
          maxWidth="350px"
          size="lg"
          variant="solid"
          colorScheme="primary1"
          rightIcon={<Icon as={PiArrowSquareOut} />}
          onClick={handleCreateFiatSwapPayment}
          isLoading={isLoading}
          alignSelf="center"
          mt={2}
        >
          {isLoading ? t('Redirecting you to fiat payment') : t('Continue to payment')}
        </Button>
      </VStack>
    </VStack>
  )
}

type CreditCardCurrencySelectProps = {
  selectedCurrencyOption?: { label: string; value: string }
  onCurrencyChange: (currency: string) => void
}

const euroCountryCodes = new Set([
  'AT',
  'BE',
  'HR',
  'CY',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PT',
  'SK',
  'SI',
  'ES',
])

/** CreditCardCurrencySelect: renders the fiat currency dropdown for card payments */
const CreditCardCurrencySelect = ({ selectedCurrencyOption, onCurrencyChange }: CreditCardCurrencySelectProps) => {
  const hasDefaultCurrency = useRef(false)

  const applyDefaultCurrency = useCallback(
    (currency: string) => {
      if (selectedCurrencyOption?.value || hasDefaultCurrency.current) {
        return
      }

      hasDefaultCurrency.current = true
      onCurrencyChange(currency)
    },
    [onCurrencyChange, selectedCurrencyOption?.value],
  )

  useGetUserIpCountryQuery({
    onCompleted(data) {
      const countryCode = data.userIpCountry?.toUpperCase() || ''

      if (countryCode === 'GB' || countryCode === 'UK') {
        applyDefaultCurrency('GBP')
        return
      }

      if (countryCode && euroCountryCodes.has(countryCode)) {
        applyDefaultCurrency('EUR')
        return
      }

      applyDefaultCurrency('USD')
    },
    onError() {
      applyDefaultCurrency('USD')
    },
  })

  return (
    <HStack w="full" alignItems="start" spacing={3} justifyContent="space-between" paddingTop={4}>
      <VStack w="full" alignItems="start" spacing={0}>
        <Body bold>{t('Currency')}</Body>
        <Body size="sm" light lineHeight="1.2">
          {t('You will be charged in this currency')}
        </Body>
      </VStack>
      <CustomSelect
        width={'100%'}
        options={fiatSwapCurrencies}
        value={selectedCurrencyOption}
        onChange={(value: SingleValue<{ label: string; value: string }>) => {
          onCurrencyChange(value?.value || '')
        }}
      />
    </HStack>
  )
}

/** PaymentCreditCardLoading: skeleton view while contribution is being created */
const PaymentCreditCardLoading = () => {
  return (
    <VStack w="full" spacing={8} alignItems="center">
      <HStack w="full" alignItems="start" spacing={3} justifyContent="space-between" paddingTop={4}>
        <VStack w="full" alignItems="start" spacing={1}>
          <SkeletonLayout height="26px" width="120px" />
          <SkeletonLayout height="16px" width="200px" />
        </VStack>
        <SkeletonLayout height="40px" width="220px" />
      </HStack>
      <SkeletonLayout height="40px" width="420px" />
    </VStack>
  )
}
