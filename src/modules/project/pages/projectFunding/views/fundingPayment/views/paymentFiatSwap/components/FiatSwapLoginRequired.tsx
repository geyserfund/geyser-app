import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useAuthModal } from '@/modules/auth/hooks/useAuthModal.ts'
import { Body } from '@/shared/components/typography/Body.tsx'

/** Login prompt for contributors who need to authenticate before fiat payment. */
export const FiatSwapLoginRequired = () => {
  const { loginOnOpen } = useAuthModal()

  return (
    <VStack w="full" spacing={6}>
      <VStack spacing={2} w="full" maxWidth="500px">
        <Body medium>{t('Login required to pay with fiat')}</Body>
        <Body size="sm" textAlign="center">
          {t('Please login to continue with fiat payments')}
        </Body>
      </VStack>
      <Button w="250px" variant="solid" colorScheme="primary1" size="lg" onClick={() => loginOnOpen()}>
        {t('Login')}
      </Button>
    </VStack>
  )
}
