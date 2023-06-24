import { ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ButtonComponent } from '../../../components/ui'
import { getPath } from '../../../constants'

export const CreateAProjectButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  return (
    <ButtonComponent
      marginTop="20px "
      as={Link}
      to={getPath('publicProjectLaunch')}
      primary
      {...props}
    >
      {t('Create a project')}
    </ButtonComponent>
  )
}
