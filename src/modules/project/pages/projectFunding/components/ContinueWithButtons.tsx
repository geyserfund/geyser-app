import { Button, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { FaBitcoin, FaRegCreditCard } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'
import { useMobileMode, useNotification } from '@/utils'

import {
  creditCardButtonClickedAtom,
  intendedPaymentMethodAtom,
  PaymentMethods,
} from '../views/fundingPayment/state/paymentMethodAtom'

type ContinueWithButtonsProps = {
  useFormSubmit?: boolean
}

export const ContinueWithButtons = ({ useFormSubmit = false }: ContinueWithButtonsProps) => {
  const navigate = useNavigate()
  const isMobile = useMobileMode()
  const toast = useNotification()
  const { project } = useFundingFormAtom()
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)
  const setCreditCardClicked = useSetAtom(creditCardButtonClickedAtom)

  const handleCreditCardClick = () => {
    setIntendedPaymentMethod(PaymentMethods.lightning)
    setCreditCardClicked(true)
    // Only show toast if NOT using form submission (direct navigation)
    if (!useFormSubmit) {
      toast.info({
        title: t('Credit card payment not available for this project.'),
        description: t('Please use bitcoin payments.'),
      })
      navigate(getPath('fundingStart', project.name))
    }
    // If useFormSubmit is true, toast will be shown after successful validation
    // in FundingDetailsSideContent's handleCheckoutButtonPressed
  }

  const handleBitcoinClick = () => {
    setIntendedPaymentMethod(PaymentMethods.lightning)
    setCreditCardClicked(false)
    if (!useFormSubmit) {
      navigate(getPath('fundingStart', project.name))
    }
  }

  return (
    <VStack flexDirection={{ base: 'row', lg: 'column' }} w="full" spacing={3}>
      <Button
        id="continue-with-credit-card"
        size="lg"
        w="full"
        variant="solid"
        colorScheme="primary1"
        onClick={handleCreditCardClick}
        type={useFormSubmit ? 'submit' : 'button'}
        rightIcon={<Icon as={FaRegCreditCard} color="blue.500" />}
      >
        {isMobile ? 'Continue with' : t('Continue with Credit Card')}
      </Button>
      <Button
        id="continue-with-bitcoin"
        size="lg"
        w="full"
        variant="solid"
        colorScheme="primary1"
        onClick={handleBitcoinClick}
        type={useFormSubmit ? 'submit' : 'button'}
        rightIcon={<Icon as={FaBitcoin} color="orange.500" />}
      >
        {isMobile ? 'Continue with' : t('Continue with Bitcoin')}
      </Button>
    </VStack>
  )
}
