import { Button, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { FaBitcoin, FaRegCreditCard } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { intendedPaymentMethodAtom, PaymentMethods } from '../views/fundingPayment/state/paymentMethodAtom.ts'

type ContinueWithButtonsProps = {
  useFormSubmit?: boolean
}

export const ContinueWithButtons = ({ useFormSubmit = false }: ContinueWithButtonsProps) => {
  const navigate = useNavigate()
  const isMobile = useMobileMode()
  const { project } = useFundingFormAtom()
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)

  const handleCreditCardClick = () => {
    setIntendedPaymentMethod(PaymentMethods.fiatSwap)
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
