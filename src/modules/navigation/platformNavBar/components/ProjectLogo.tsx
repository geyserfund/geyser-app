import { Heading, HStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { PROJECT_LAUNCH_PAYMENT_PROJECT_NAME } from '@/modules/project/pages1/projectCreation/views/ProjectCreationStrategy.tsx'
import { projectAtom } from '@/modules/project/state/projectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { getPath } from '@/shared/constants'

export const GEYSER_GUARDIANS_PROJECT_NAME = 'geyserguardians'

export const ProjectLogo = () => {
  const project = useAtomValue(projectAtom)

  const linkTo = useMemo(() => {
    return project.name === GEYSER_GUARDIANS_PROJECT_NAME ? getPath('guardians') : getPath('project', project.name)
  }, [project.name])

  const logo = () => {
    return (
      <HStack>
        <ImageWithReload
          height={{ base: '40px', lg: '48px' }}
          width={{ base: '40px', lg: '48px' }}
          borderRadius={'50%'}
          src={project?.thumbnailImage}
          alt={project?.name}
        />
        <Heading size="md" display={{ base: 'none', lg: 'unset' }}>
          {project?.title}
        </Heading>
      </HStack>
    )
  }

  if (project.name === PROJECT_LAUNCH_PAYMENT_PROJECT_NAME) {
    return logo()
  }

  return <Link to={linkTo}>{logo()}</Link>
}
