import { HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../components/layouts'
import { H2 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { getPath, ProjectLaunch3DUrl } from '../../../constants'

export const CreateProject = () => {
  return (
    <CardLayout padding="20px">
      <H2>Launch your project</H2>
      <HStack width="100%" justifyContent="center">
        <Image
          maxWidth="300px"
          alt="project-launch-3d-image"
          src={ProjectLaunch3DUrl}
        />
      </HStack>
      <ButtonComponent
        marginTop="20px "
        as={Link}
        to={getPath('privateProjectLaunch')}
        primary
      >
        Create Project
      </ButtonComponent>
    </CardLayout>
  )
}
