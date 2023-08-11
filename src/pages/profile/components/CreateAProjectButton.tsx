import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getPath } from '../../../constants'

export const CreateAProjectButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  return (
    <Button
      variant="primary"
      marginTop="20px"
      px="10px"
      as={Link}
      to={getPath('publicProjectLaunch')}
      {...props}
      leftIcon={<AddIcon fontSize={'12px'} />}
    >
      {t('Create a project')}
    </Button>
  )
}
