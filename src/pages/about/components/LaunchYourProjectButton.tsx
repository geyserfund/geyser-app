import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getPath } from '../../../constants'
import { useAuthContext } from '../../../context'

export const LaunchYourProjectButton = (props: ButtonProps) => {
  const { t } = useTranslation()

  const { isLoggedIn } = useAuthContext()
  return (
    <Button
      as={Link}
      to={
        isLoggedIn
          ? getPath('privateProjectLaunch')
          : getPath('publicProjectLaunch')
      }
      {...props}
    >
      {t('Launch your project')}
    </Button>
  )
}
