import { Heading, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { projectAtom } from '@/modules/project/state/projectAtom'
import { getPath } from '@/shared/constants'

export const ProjectLogo = () => {
  const project = useAtomValue(projectAtom)

  return (
    <Link to={getPath('project', project.name)}>
      <HStack
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition="ease-in 0.2s"
      >
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
