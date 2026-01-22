import { Button, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { FaBitcoin, FaRegCreditCard } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { intendedPaymentMethodAtom, PaymentMethods } from '../views/fundingPayment/state/paymentMethodAtom'

type ContinueWithButtonsProps = {
  useFormSubmit?: boolean
}

export const ContinueWithButtons = ({ useFormSubmit = false }: ContinueWithButtonsProps) => {
  const navigate = useNavigate()
  const toast = useNotification()
  const { project } = useFundingFormAtom()
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)

  const handleCreditCardClick = () => {
    setIntendedPaymentMethod(PaymentMethods.lightning)
    toast.info({
      title: t('Credit card payment not available for this project.'),
      description: t('Please use bitcoin payments.'),
    })
    if (!useFormSubmit) {
      navigate(getPath('fundingStart', project.name))
    }
  }

  const handleBitcoinClick = () => {
    setIntendedPaymentMethod(PaymentMethods.lightning)
    if (!useFormSubmit) {
      navigate(getPath('fundingStart', project.name))
    }
  }

  return (
    <VStack w="full" spacing={3}>
      <Button
        id="continue-with-credit-card"
        size="lg"
        w="full"
        variant="solid"
        colorScheme="primary1"
        onClick={handleCreditCardClick}
        type={useFormSubmit ? 'submit' : 'button'}
        leftIcon={<Icon as={FaRegCreditCard} color="blue.500" />}
      >
        {t('Continue with Credit Card')}
      </Button>
      <Button
        id="continue-with-bitcoin"
        size="lg"
        w="full"
        variant="solid"
        colorScheme="primary1"
        onClick={handleBitcoinClick}
        type={useFormSubmit ? 'submit' : 'button'}
        leftIcon={<Icon as={FaBitcoin} color="orange.500" />}
      >
        {t('Continue with Bitcoin')}
      </Button>
    </VStack>
  )
}
