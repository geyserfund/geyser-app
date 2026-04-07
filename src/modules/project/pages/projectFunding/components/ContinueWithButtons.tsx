import { Button, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { AiFillApple } from 'react-icons/ai'
import { FaBitcoin, FaCreditCard } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { recurringContributionRenewalAtom } from '@/modules/project/funding/state/recurringContributionRenewalAtom.ts'
import { getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  hasFiatPaymentMethodAtom,
  hasStripePaymentMethodAtom,
  intendedPaymentMethodAtom,
  PaymentMethods,
} from '../views/fundingPayment/state/paymentMethodAtom.ts'

type ContinueWithButtonsProps = {
  useFormSubmit?: boolean
}

const getIsApplePayVisible = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const { ApplePaySession } = window as Window & {
    ApplePaySession?: {
      canMakePayments: () => boolean
    }
  }

  return Boolean(ApplePaySession?.canMakePayments())
}

export const ContinueWithButtons = ({ useFormSubmit = false }: ContinueWithButtonsProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useMobileMode()
  const { project } = useFundingFormAtom()
  const recurringContributionRenewal = useAtomValue(recurringContributionRenewalAtom)
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)
  const setFiatPaymentMethod = useSetAtom(fiatPaymentMethodAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)
  const hasStripePaymentMethod = useAtomValue(hasStripePaymentMethodAtom)
  const isApplePayVisible = hasFiatPaymentMethod && !hasStripePaymentMethod && getIsApplePayVisible()
  const showOnlyBitcoin = recurringContributionRenewal?.paymentMethod === 'BITCOIN'
  const showOnlyFiat = Boolean(
    recurringContributionRenewal && recurringContributionRenewal.paymentMethod !== 'BITCOIN',
  )
  const applePayButtonBg = useColorModeValue('neutral.1000', 'neutral.1000')
  const applePayButtonText = useColorModeValue('neutral.0', 'neutral.0')
  const creditCardIcon = <Icon as={FaCreditCard} color="currentColor" />
  const bitcoinIcon = <Icon as={FaBitcoin} color="currentColor" />
  const applePayIcon = <Icon as={AiFillApple} />

  const handleCreditCardClick = () => {
    setIntendedPaymentMethod(PaymentMethods.fiatSwap)
    setFiatPaymentMethod(fiatCheckoutMethods.creditCard)
    if (!useFormSubmit) {
      const paymentPath = hasFiatPaymentMethod
        ? hasStripePaymentMethod
          ? getPath('fundingPaymentFiatStripe', project.name)
          : getPath('fundingPaymentFiatBanxa', project.name)
        : getPath('fundingStart', project.name)
      navigate({
        pathname: paymentPath,
        search: location.search,
      })
    }
  }

  const handleApplePayClick = () => {
    setIntendedPaymentMethod(PaymentMethods.fiatSwap)
    setFiatPaymentMethod(fiatCheckoutMethods.applePay)
    if (!useFormSubmit) {
      const paymentPath = hasFiatPaymentMethod
        ? getPath('fundingPaymentFiatBanxaApplePay', project.name)
        : getPath('fundingStart', project.name)
      navigate({
        pathname: paymentPath,
        search: location.search,
      })
    }
  }

  const handleBitcoinClick = () => {
    setIntendedPaymentMethod(PaymentMethods.lightning)
    if (!useFormSubmit) {
      navigate({
        pathname: getPath('fundingStart', project.name),
        search: location.search,
      })
    }
  }

  const disableApplePay = false

  return (
    <VStack flexDirection={{ base: 'row', lg: 'column' }} w="full" spacing={3}>
      {!showOnlyBitcoin && !showOnlyFiat && isApplePayVisible && !disableApplePay && (
        <Button
          id="continue-with-apple-pay"
          size="lg"
          w="full"
          variant="solid"
          bg={applePayButtonBg}
          color={applePayButtonText}
          _hover={{ bg: applePayButtonBg, opacity: 0.9 }}
          onClick={handleApplePayClick}
          type={useFormSubmit ? 'submit' : 'button'}
          data-payment-method={PaymentMethods.fiatSwap}
          data-fiat-checkout-method={fiatCheckoutMethods.applePay}
          rightIcon={isMobile ? undefined : applePayIcon}
          aria-label={t('Continue with Apple Pay')}
        >
          {isMobile ? applePayIcon : t('Continue with Apple Pay')}
        </Button>
      )}
      {!showOnlyBitcoin && hasFiatPaymentMethod && (
        <Button
          id="continue-with-credit-card"
          size="lg"
          w="full"
          variant="solid"
          colorScheme="primary1"
          onClick={handleCreditCardClick}
          type={useFormSubmit ? 'submit' : 'button'}
          data-payment-method={PaymentMethods.fiatSwap}
          data-fiat-checkout-method={fiatCheckoutMethods.creditCard}
          rightIcon={isMobile ? undefined : creditCardIcon}
          aria-label={t('Continue with Card or Bank Transfer')}
        >
          {isMobile ? creditCardIcon : t('Continue with Card or Bank Transfer')}
        </Button>
      )}
      {!showOnlyFiat && (
        <Button
          id="continue-with-bitcoin"
          size="lg"
          w="full"
          variant="solid"
          colorScheme="primary1"
          onClick={handleBitcoinClick}
          type={useFormSubmit ? 'submit' : 'button'}
          data-payment-method={PaymentMethods.lightning}
          rightIcon={isMobile ? undefined : bitcoinIcon}
          aria-label={t('Continue with Bitcoin')}
        >
          {isMobile ? bitcoinIcon : t('Continue with Bitcoin')}
        </Button>
      )}
    </VStack>
  )
}
