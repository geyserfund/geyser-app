import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthModal } from '../../../../pages/auth/hooks'

export const LoginButton = (props: ButtonProps) => {
  const { loginOnOpen } = useAuthModal()
  const { t } = useTranslation()
  return (
    <Button
      size={{ base: 'md', lg: 'lg' }}
      variant="outline"
      colorScheme="neutral1"
      backgroundColor="utils.pbg"
      onClick={() => loginOnOpen()}
      {...props}
    >
      {t('Sign in')}
    </Button>
  )
}
