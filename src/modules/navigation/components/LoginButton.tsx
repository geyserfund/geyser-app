import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthModal } from '../../../pages/auth/hooks'

export const LoginButton = (props: ButtonProps) => {
  const { loginOnOpen } = useAuthModal()
  const { t } = useTranslation()
  return (
    <Button size="lg" variant="outline" colorScheme="neutral" onClick={loginOnOpen} {...props}>
      {t('Login & Sign Up')}
    </Button>
  )
}
