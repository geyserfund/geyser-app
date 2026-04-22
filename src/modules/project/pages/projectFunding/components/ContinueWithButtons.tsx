import { Button, Icon, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { AiFillApple } from 'react-icons/ai'
import { FaBitcoin, FaCreditCard } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { recurringContributionRenewalAtom } from '@/modules/project/funding/state/recurringContributionRenewalAtom.ts'
import { isStripeConnectSupportedForProject } from '@/modules/project/utils/stripeConnect.ts'
import { getPath } from '@/shared/constants'
import { useProjectStripeInterestNotifyMutation } from '@/types/index.ts'
import { useMobileMode, useNotification } from '@/utils'

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
  const toast = useNotification()
  const { project } = useFundingFormAtom()
  const recurringContributionRenewal = useAtomValue(recurringContributionRenewalAtom)
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)
  const setFiatPaymentMethod = useSetAtom(fiatPaymentMethodAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)
  const hasStripePaymentMethod = useAtomValue(hasStripePaymentMethodAtom)
  const [notifyStripeInterest, notifyStripeInterestOptions] = useProjectStripeInterestNotifyMutation()
  const [isStripeUnavailableDisabled, setIsStripeUnavailableDisabled] = useState(false)
  const shouldShowStripeButton = hasFiatPaymentMethod && isStripeConnectSupportedForProject(project)
  const isApplePayVisible = hasFiatPaymentMethod && !hasStripePaymentMethod && getIsApplePayVisible()
  const showOnlyBitcoin = recurringContributionRenewal?.paymentMethod === 'BITCOIN'
  const showOnlyFiat = Boolean(recurringContributionRenewal && recurringContributionRenewal.paymentMethod !== 'BITCOIN')
  const applePayButtonBg = useColorModeValue('neutral.1000', 'neutral.1000')
  const applePayButtonText = useColorModeValue('neutral.0', 'neutral.0')
  const stripeButtonBg = '#635BFF'
  const stripeButtonText = 'white'
  const creditCardIcon = <Icon as={FaCreditCard} color="currentColor" />
  const bitcoinIcon = <Icon as={FaBitcoin} color="currentColor" />
  const applePayIcon = <Icon as={AiFillApple} />
  const stripeIcon = (
    <Image src="/icons/stripe-s-logo.webp" alt={t('Stripe')} h="15px" objectFit="contain" />
  )

  const handleCreditCardClick = () => {
    setIntendedPaymentMethod(PaymentMethods.fiatSwap)
    setFiatPaymentMethod(fiatCheckoutMethods.creditCard)
    if (!useFormSubmit) {
      const paymentPath = hasFiatPaymentMethod
        ? getPath('fundingPaymentFiatBanxa', project.name)
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

  const handleStripeClick = async () => {
    if (!hasFiatPaymentMethod) {
      return
    }

    if (hasStripePaymentMethod) {
      setIntendedPaymentMethod(PaymentMethods.fiatSwap)
      setFiatPaymentMethod(fiatCheckoutMethods.stripe)

      if (!useFormSubmit) {
        navigate({
          pathname: getPath('fundingPaymentFiatStripe', project.name),
          search: location.search,
        })
      }

      return
    }

    if (!project.id || isStripeUnavailableDisabled || notifyStripeInterestOptions.loading) {
      return
    }

    try {
      const { data } = await notifyStripeInterest({
        variables: { projectId: project.id },
      })

      if (!data?.projectStripeInterestNotify?.success) {
        throw new Error('Stripe interest notification did not succeed')
      }

      setIsStripeUnavailableDisabled(true)
      toast.success({
        title: t('the project creator has not configured Stripe on their project yet, they have been notified'),
      })
    } catch {
      toast.error({
        title: t('Failed to notify the project creator about Stripe interest'),
        description: t('Please try again later'),
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

  const payButtonPressStyles = {
    transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s, opacity 0.2s',
    '&:active:not(:disabled)': { transform: 'scale(0.98)' },
  }

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
          sx={payButtonPressStyles}
        >
          {isMobile ? applePayIcon : t('Continue with Apple Pay')}
        </Button>
      )}
      {!showOnlyBitcoin && shouldShowStripeButton && (
        <Button
          id="continue-with-stripe"
          size="lg"
          w="full"
          variant="solid"
          bg={stripeButtonBg}
          color={stripeButtonText}
          _hover={{ bg: stripeButtonBg, opacity: 0.92 }}
          onClick={handleStripeClick}
          type={useFormSubmit && hasStripePaymentMethod ? 'submit' : 'button'}
          isDisabled={!hasStripePaymentMethod && isStripeUnavailableDisabled}
          isLoading={!hasStripePaymentMethod && notifyStripeInterestOptions.loading}
          data-payment-method={PaymentMethods.fiatSwap}
          data-fiat-checkout-method={fiatCheckoutMethods.stripe}
          rightIcon={isMobile ? undefined : stripeIcon}
          aria-label={t('Continue with Stripe')}
          sx={payButtonPressStyles}
        >
          {isMobile ? stripeIcon : t('Continue with Stripe')}
        </Button>
      )}
      {!showOnlyBitcoin && hasFiatPaymentMethod && !hasStripePaymentMethod && (
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
          sx={payButtonPressStyles}
        >
          {isMobile ? creditCardIcon : t('Continue with Card or Bank Transfer')}
        </Button>
      )}
      {showOnlyFiat && !hasFiatPaymentMethod && (
        <Button size="lg" w="full" variant="solid" colorScheme="primary1" type="button" isDisabled>
          {t('Fiat renewal unavailable')}
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
          sx={payButtonPressStyles}
        >
          {isMobile ? bitcoinIcon : t('Continue with Bitcoin')}
        </Button>
      )}
    </VStack>
  )
}
