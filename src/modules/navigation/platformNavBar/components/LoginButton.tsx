import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthModal } from '../../../../modules/auth/hooks'

export const LoginButton = (props: ButtonProps) => {
  const { loginOnOpen } = useAuthModal()
  const { t } = useTranslation()
  return (
    <Button
      size={{ base: 'md', lg: 'lg' }}
      variant="ghost"
      color="black"
      backgroundColor="transparent"
      fontWeight={600}
      fontSize={{ lg: 'sm', xl: 'md' }}
      borderWidth={0}
      _hover={{ backgroundColor: 'blackAlpha.50' }}
      _active={{ backgroundColor: 'blackAlpha.100' }}
      onClick={() => loginOnOpen()}
      {...props}
    >
      {t('Sign in')}
    </Button>
  )
}
