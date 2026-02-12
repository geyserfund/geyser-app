import { Button, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { AiFillApple } from 'react-icons/ai'
import { FaBitcoin, FaCreditCard } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
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
  if (typeof navigator === 'undefined') {
    return false
  }

  const platform = navigator.platform || ''
  const userAgent = navigator.userAgent || ''
  const vendor = navigator.vendor || ''

  const isSafari = vendor.includes('Apple') || (/Safari/.test(userAgent) && !/Chrome|Chromium|CriOS/.test(userAgent))

  if (!isSafari) {
    return false
  }

  if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return true
  }

  return /Mac|iPhone|iPad|iPod/.test(platform) || /Macintosh|iPhone|iPad|iPod/.test(userAgent)
}

export const ContinueWithButtons = ({ useFormSubmit = false }: ContinueWithButtonsProps) => {
  const navigate = useNavigate()
  const isMobile = useMobileMode()
  const { project } = useFundingFormAtom()
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)
  const setFiatPaymentMethod = useSetAtom(fiatPaymentMethodAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)
  const hasStripePaymentMethod = useAtomValue(hasStripePaymentMethodAtom)
  const isApplePayVisible = hasFiatPaymentMethod && !hasStripePaymentMethod && getIsApplePayVisible()
  const applePayButtonBg = useColorModeValue('neutral.1000', 'neutral.1000')
  const applePayButtonText = useColorModeValue('neutral.0', 'neutral.0')
  const creditCardIcon = <Icon as={FaCreditCard} color="utils.text" />
  const bitcoinIcon = <Icon as={FaBitcoin} color="utils.text" />
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
      navigate(paymentPath)
    }
  }

  const handleApplePayClick = () => {
    setIntendedPaymentMethod(PaymentMethods.fiatSwap)
    setFiatPaymentMethod(fiatCheckoutMethods.applePay)
    if (!useFormSubmit) {
      const paymentPath = hasFiatPaymentMethod
        ? getPath('fundingPaymentFiatBanxaApplePay', project.name)
        : getPath('fundingStart', project.name)
      navigate(paymentPath)
    }
  }

  const handleBitcoinClick = () => {
    setIntendedPaymentMethod(PaymentMethods.lightning)
    if (!useFormSubmit) {
      navigate(getPath('fundingStart', project.name))
    }
  }

  const disableApplePay = false

  return (
    <VStack flexDirection={{ base: 'row', lg: 'column' }} w="full" spacing={3}>
      {isApplePayVisible && !disableApplePay && (
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
          rightIcon={isMobile ? undefined : applePayIcon}
          aria-label={t('Continue with Apple Pay')}
        >
          {isMobile ? applePayIcon : t('Continue with Apple Pay')}
        </Button>
      )}
      <Button
        id="continue-with-credit-card"
        size="lg"
        w="full"
        variant="solid"
        colorScheme="primary1"
        onClick={handleCreditCardClick}
        type={useFormSubmit ? 'submit' : 'button'}
        rightIcon={isMobile ? undefined : creditCardIcon}
        aria-label={t('Continue with Card or Bank Transfer')}
      >
        {isMobile ? creditCardIcon : t('Continue with Card or Bank Transfer')}
      </Button>
      <Button
        id="continue-with-bitcoin"
        size="lg"
        w="full"
        variant="solid"
        colorScheme="primary1"
        onClick={handleBitcoinClick}
        type={useFormSubmit ? 'submit' : 'button'}
        rightIcon={isMobile ? undefined : bitcoinIcon}
        aria-label={t('Continue with Bitcoin')}
      >
        {isMobile ? bitcoinIcon : t('Continue with Bitcoin')}
      </Button>
    </VStack>
  )
}
