import { ButtonProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { ButtonComponent } from '../../../components/ui'
import { getPath } from '../../../constants'

export const CreateAProjectButton = (props: ButtonProps) => {
  return (
    <ButtonComponent
      marginTop="20px "
      as={Link}
      to={getPath('privateProjectLaunch')}
      primary
      {...props}
    >
      Create Project
    </ButtonComponent>
  )
}
