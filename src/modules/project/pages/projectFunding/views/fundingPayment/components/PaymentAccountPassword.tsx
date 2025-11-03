import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

export const PaymentAccountPassword = ({ onComplete }: { onComplete: () => void }) => {
  const { renderForm, currentForm, titles } = useAccountPasswordForm({
    onComplete,
  })

  return (
    <VStack w="full" alignItems="flex-start" spacing={4}>
      <Body size="lg" bold>
        {titles}
      </Body>
      {renderForm()}
      <Button width="100%" size="lg" variant="solid" colorScheme="primary1" onClick={currentForm.onSubmit}>
        {t('Continue')}
      </Button>
    </VStack>
  )
}
