import { Heading, HStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { launchContributionProjectIdAtom } from '@/modules/project/funding/state/fundingFormAtom'
import { projectAtom } from '@/modules/project/state/projectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { getPath } from '@/shared/constants'

export const GEYSER_GUARDIANS_PROJECT_NAME = 'geyserguardians'

export const ProjectLogo = () => {
  const project = useAtomValue(projectAtom)
  const launchContributionProjectId = useAtomValue(launchContributionProjectIdAtom)

  const linkTo = useMemo(() => {
    if (launchContributionProjectId) {
      return ''
    }

    return project.name === GEYSER_GUARDIANS_PROJECT_NAME ? getPath('guardians') : getPath('project', project.name)
  }, [launchContributionProjectId, project.name])

  return (
    <Link to={linkTo}>
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
    </Link>
  )
}
