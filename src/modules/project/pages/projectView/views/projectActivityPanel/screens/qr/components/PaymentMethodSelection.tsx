import { Button, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { PaymentMethods, usePaymentMethodAtom } from '../states/paymentMethodAtom'

export const PaymentMethodSelection = () => {
  const { t } = useTranslation()
  const [paymentMethod, setPaymentMethod] = usePaymentMethodAtom()

  const isLightning = paymentMethod === PaymentMethods.lightning
  return (
    <HStack w="full">
      <Button
        flex={1}
        variant={'secondary'}
        borderColor={isLightning ? 'primary.400' : undefined}
        color={isLightning ? 'primary.400' : undefined}
        onClick={() => setPaymentMethod(PaymentMethods.lightning)}
      >
        {t('Lightning')}
      </Button>
      <Button
        flex={1}
        variant={'secondary'}
        borderColor={!isLightning ? 'primary.400' : undefined}
        color={!isLightning ? 'primary.400' : undefined}
        onClick={() => setPaymentMethod(PaymentMethods.onChain)}
      >
        {t('Onchain')}
      </Button>
    </HStack>
  )
}
