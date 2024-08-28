import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getPath } from '../../../../../shared/constants'

export const CreateAProjectButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  return (
    <Button
      variant="solid"
      colorScheme="primary1"
      marginTop="20px"
      px="10px"
      as={Link}
      to={getPath('launchStart')}
      {...props}
      leftIcon={<AddIcon fontSize={'12px'} />}
    >
      {t('Create a project')}
    </Button>
  )
}
