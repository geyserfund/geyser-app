import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthModal } from '../../../pages/auth/hooks'

export const LoginButton = (props: ButtonProps) => {
  const { loginOnOpen } = useAuthModal()
  const { t } = useTranslation()
  return (
    <Button size={{ base: 'md', lg: 'lg' }} variant="outline" colorScheme="primary1" onClick={loginOnOpen} {...props}>
      {t('Login')}
    </Button>
  )
}
