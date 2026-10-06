import { type ButtonProps, Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthModal } from '../../../../modules/auth/hooks'

export const LoginButton = (props: ButtonProps) => {
  const { loginOnOpen } = useAuthModal()
  const { t } = useTranslation()
  const textColor = 'utils.text'
  const hoverBg = 'neutral1.3'
  const activeBg = 'neutral1.4'

  return (
    <Button
      size={{ base: 'md', lg: 'lg' }}
      variant="ghost"
      color={textColor}
      backgroundColor="transparent"
      fontWeight={600}
      fontSize={{ lg: 'sm', xl: 'md' }}
      borderWidth={0}
      _hover={{ backgroundColor: hoverBg }}
      _active={{ backgroundColor: activeBg }}
      onClick={() => loginOnOpen()}
      {...props}
    >
      {t('Log in')}
    </Button>
  )
}
