import { Button, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { FaBitcoin, FaCreditCard } from 'react-icons/fa'
import { PiAppleLogoFill } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  hasFiatPaymentMethodAtom,
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
  const isApplePayVisible = hasFiatPaymentMethod && getIsApplePayVisible()
  const applePayButtonBg = useColorModeValue('neutral.1000', 'neutral.1000')
  const applePayButtonText = useColorModeValue('neutral.0', 'neutral.0')
  const creditCardIcon = <Icon as={FaCreditCard} color="blue.700" />
  const bitcoinIcon = <Icon as={FaBitcoin} color="orange.500" />
  const applePayIcon = <Icon as={PiAppleLogoFill} />

  const handleCreditCardClick = () => {
    setIntendedPaymentMethod(PaymentMethods.fiatSwap)
    setFiatPaymentMethod(fiatCheckoutMethods.creditCard)
    if (!useFormSubmit) {
      const paymentPath = hasFiatPaymentMethod
        ? getPath('fundingPaymentCreditCard', project.name)
        : getPath('fundingStart', project.name)
      navigate(paymentPath)
    }
  }

  const handleApplePayClick = () => {
    setIntendedPaymentMethod(PaymentMethods.fiatSwap)
    setFiatPaymentMethod(fiatCheckoutMethods.applePay)
    if (!useFormSubmit) {
      const paymentPath = hasFiatPaymentMethod
        ? getPath('fundingPaymentApplePay', project.name)
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

  return (
    <VStack flexDirection={{ base: 'row', lg: 'column' }} w="full" spacing={3}>
      {isApplePayVisible && (
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
        aria-label={t('Continue with Credit Card')}
      >
        {isMobile ? creditCardIcon : t('Continue with Credit Card')}
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
