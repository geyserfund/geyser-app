import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthModal } from '../../../pages/auth/hooks'

export const LoginButton = (props: ButtonProps) => {
  const { loginOnOpen } = useAuthModal()
  const { t } = useTranslation()
  return (
    <Button size="lg" variant="solid" colorScheme="primary1" onClick={loginOnOpen} {...props}>
      {t('Sign Up & Login')}
    </Button>
  )
}
