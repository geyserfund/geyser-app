import { HStack, Input, InputGroup, InputLeftElement, Switch, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Link } from 'react-router'

import { useFollowedProjectsValue } from '@/modules/auth/state'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useFollowProject } from '@/shared/hooks/graphqlState'
import { Project } from '@/types'

export const FollowedProjectsList = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  const followedProjects = useFollowedProjectsValue()
  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) return followedProjects

    return followedProjects.filter((project) => project.name.toLowerCase().includes(normalizedSearch))
  }, [followedProjects, search])

  if (followedProjects.length === 0) {
    return null
  }

  return (
    <VStack w="full" alignItems="flex-start">
      <Body size="lg" bold>
        {t('Projects I follow')}
      </Body>
      <VStack w="full" alignItems="flex-start" spacing={4}>
        <Body size="sm" color="neutralAlpha.11">
          {t('Manage subscriptions for updates from the projects you follow.')}
        </Body>
        <InputGroup maxW={{ base: 'full', md: '420px' }}>
          <InputLeftElement pointerEvents="none">
            <PiMagnifyingGlass />
          </InputLeftElement>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('Search projects...')}
          />
        </InputGroup>
        <VStack w="full" alignItems="flex-start" spacing={0}>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <FollowedProjectItem project={project as Project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </VStack>
      </VStack>
    </VStack>
  )
}

const FollowedProjectItem = ({ project }: { project: Project }) => {
  const { t } = useTranslation()
  const { handleUnFollow, unfollowLoading } = useFollowProject(project)

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center" pt={2} pb={2}>
      <HStack justifyContent="flex-start" alignItems="center" as={Link} to={getPath('project', project.name)}>
        <ImageWithReload
          src={project.thumbnailImage}
          alt={`${project.name} project thumbnail image`}
          w="40px"
          h="40px"
          borderRadius="md"
        />
        <Body size="md" medium>
          {project.name}
        </Body>
      </HStack>
      <Switch
        colorScheme="primary1"
        isChecked
        isDisabled={unfollowLoading}
        aria-label={t('Unfollow {{projectName}}', { projectName: project.name })}
        onChange={(event) => {
          if (!event.target.checked) {
            handleUnFollow()
          }
        }}
      />
    </HStack>
  )
}
