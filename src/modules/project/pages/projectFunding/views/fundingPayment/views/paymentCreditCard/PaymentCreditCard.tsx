import { Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PiArrowSquareOut } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { useFundingAPI } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess.ts'
import { useResetContribution } from '@/modules/project/funding/hooks/useResetContribution.ts'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { fundingProjectAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { fundingPaymentDetailsPartialUpdateAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { getPath, PathName } from '@/shared/constants/index.ts'
import { useFundingFiatSwapPaymentCreateMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { FundingDisclaimer } from '../../components/FundingDisclaimer.tsx'
import { ReachOutForHelpButton } from '../../components/ReachOutForHelpButton.tsx'
import { fiatCheckoutMethods, fiatPaymentMethodAtom, hasFiatPaymentMethodAtom } from '../../state/paymentMethodAtom.ts'
import { FiatSwapStatus, fiatSwapStatusAtom } from '../paymentFiatSwap/atom/fiatSwapStatusAtom.ts'
import { BitcoinPurchaseNotice } from '../paymentFiatSwap/components/BitcoinPurchaseNotice.tsx'
import { FiatSwapAwaitingPayment } from '../paymentFiatSwap/components/FiatSwapAwaitingPayment.tsx'
import { FiatSwapContributorNotVerified } from '../paymentFiatSwap/components/FiatSwapContributorNotVerified.tsx'
import { FiatSwapFailed } from '../paymentFiatSwap/components/FiatSwapFailed.tsx'
import { FiatSwapProcessing } from '../paymentFiatSwap/components/FiatSwapProcessing.tsx'
import { FiatSwapStatusView } from '../paymentFiatSwap/components/FiatSwapStatusView.tsx'
import { banxaPaymentMethodIds, fiatSwapCurrencies } from '../paymentFiatSwap/data.ts'
import { useFiatSwapPaymentSubscription } from '../paymentFiatSwap/useFiatSwapPaymentSubscription.tsx'

const applePayCurrencies = ['USD', 'EUR', 'GBP']

/** PaymentCreditCard: handles credit card and apple pay Banxa flow without the payment method selection UI */
export const PaymentCreditCard = () => {
  useListenFundingContributionSuccess()

  const navigate = useNavigate()
  const location = useLocation()

  const { isLoggedIn } = useAuthContext()
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
    if (isApplePay && !selectedCurrency) {
      setSelectedCurrency('USD')
    }
  }, [isApplePay, selectedCurrency])

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
          {hasContribution && isLoggedIn && <FiatSwapContributorNotVerified />}
        </VStack>
      </VStack>

      <VStack w="full" spacing={3}>
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

  const fundingContribution = useAtomValue(fundingContributionAtom)
  const project = useAtomValue(fundingProjectAtom)
  const updateFundingPaymentDetails = useSetAtom(fundingPaymentDetailsPartialUpdateAtom)
  const setFiatSwapStatus = useSetAtom(fiatSwapStatusAtom)

  const [createFiatSwapPayment, { loading: isLoading }] = useFundingFiatSwapPaymentCreateMutation()

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

    const { data } = await createFiatSwapPayment({
      variables: {
        input: {
          contributionId: fundingContribution.id,
          paymentsInput: {
            fiatToLightningSwap: {
              create: true,
              banxa: {
                fiatCurrency: selectedCurrency,
                paymentMethodId: isApplePay ? banxaPaymentMethodIds.applePay : '',
                returnUrl: `${window.location.origin}${getPath('fundingCallback', project.name)}`,
              },
            },
          },
        },
      },
    })

    if (data?.contributionPaymentsAdd.payments.fiatToLightningSwap?.checkoutUrl) {
      window.open(data.contributionPaymentsAdd.payments.fiatToLightningSwap.checkoutUrl, '_blank')
      updateFundingPaymentDetails({
        fiatToLightningSwap: data?.contributionPaymentsAdd.payments.fiatToLightningSwap,
      })
      setFiatSwapStatus(FiatSwapStatus.pending)
    }
  }

  return (
    <VStack w="full" spacing={6} alignItems="start">
      {isApplePay ? (
        <ApplePayCurrencySelect selectedCurrency={selectedCurrency} onCurrencyChange={onCurrencyChange} />
      ) : (
        <CreditCardCurrencySelect selectedCurrencyOption={selectedCurrencyOption} onCurrencyChange={onCurrencyChange} />
      )}
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
          mt={6}
        >
          {isLoading ? t('Redirecting you to fiat payment') : t('Open payment portal')}
        </Button>
        <Body size="sm">{t('You will be re-directed to our third-party payment provider.')}</Body>
        <BitcoinPurchaseNotice />
      </VStack>
    </VStack>
  )
}

type CreditCardCurrencySelectProps = {
  selectedCurrencyOption?: { label: string; value: string }
  onCurrencyChange: (currency: string) => void
}

/** CreditCardCurrencySelect: renders the fiat currency dropdown for card payments */
const CreditCardCurrencySelect = ({ selectedCurrencyOption, onCurrencyChange }: CreditCardCurrencySelectProps) => {
  return (
    <FieldContainer title={t('Currency')} subtitle={t('Your card will be charged in this currency')}>
      <CustomSelect
        width={'100%'}
        options={fiatSwapCurrencies}
        value={selectedCurrencyOption}
        onChange={(value: SingleValue<{ label: string; value: string }>) => {
          onCurrencyChange(value?.value || '')
        }}
      />
    </FieldContainer>
  )
}

type ApplePayCurrencySelectProps = {
  selectedCurrency: string
  onCurrencyChange: (currency: string) => void
}

/** ApplePayCurrencySelect: renders the segmented Apple Pay currency selector */
const ApplePayCurrencySelect = ({ selectedCurrency, onCurrencyChange }: ApplePayCurrencySelectProps) => {
  return (
    <VStack w="full" alignItems="start" spacing={3}>
      <VStack w="full" alignItems="start" spacing={1}>
        <Body bold>{t('Currency')}</Body>
        <Body size="sm" light>
          {t('Your card will be charged in this currency')}
        </Body>
      </VStack>
      <HStack w="full" spacing={3} flexWrap="wrap">
        {applePayCurrencies.map((currency) => {
          const isSelected = selectedCurrency === currency
          return (
            <Button
              key={currency}
              size="lg"
              minWidth="96px"
              variant={isSelected ? 'solid' : 'outline'}
              colorScheme={isSelected ? 'primary1' : 'neutral1'}
              onClick={() => {
                onCurrencyChange(currency)
              }}
            >
              {currency}
            </Button>
          )
        })}
      </HStack>
    </VStack>
  )
}

/** PaymentCreditCardLoading: skeleton view while contribution is being created */
const PaymentCreditCardLoading = () => {
  return (
    <VStack w="full" spacing={4} alignItems="start">
      <SkeletonLayout height="26px" width="120px" />
      <SkeletonLayout height="44px" width="full" />
      <SkeletonLayout height="40px" width="220px" />
    </VStack>
  )
}
