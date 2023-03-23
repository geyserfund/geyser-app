import { HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../components/layouts'
import { H2 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { getPath, ProjectLaunch3DUrl } from '../../../constants'

export const CreateProject = () => {
  return (
    <CardLayout padding="20px" maxWidth="400px" height="auto">
      <H2>Launch your project</H2>
      <HStack justifyContent="center">
        <Image
          width="80%"
          alt="project-launch-3d-image"
          src={ProjectLaunch3DUrl}
        />
      </HStack>
      <ButtonComponent as={Link} to={getPath('privateProjectLaunch')} primary>
        Create Project
      </ButtonComponent>
    </CardLayout>
  )
}
