import { Heading, HStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { Link } from 'react-router'

import { projectAtom } from '@/modules/project/state/projectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { getPath } from '@/shared/constants'
import { GUARDIANS_PROJECT_NAME } from '@/shared/constants/platform/projectNames.ts'

export const ProjectLogo = () => {
  const project = useAtomValue(projectAtom)

  const linkTo = useMemo(() => {
    return project.name === GUARDIANS_PROJECT_NAME ? getPath('guardians') : getPath('project', project.name)
  }, [project.name])

  const logo = () => {
    return (
      <HStack>
        <ImageWithReload
          height={{ base: '40px', lg: '48px' }}
          width={{ base: '40px', lg: '48px' }}
          borderRadius={'50%'}
          src={project?.thumbnailImage}
          alt={`${project?.title} project thumbnail image`}
        />
        <Heading size="md" display={{ base: 'none', lg: 'unset' }}>
          {project?.title}
        </Heading>
      </HStack>
    )
  }

  return <Link to={linkTo}>{logo()}</Link>
}
