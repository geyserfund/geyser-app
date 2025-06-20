import { Button, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Portal, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { isRouteForProjectCreationAtom } from '@/config/routes/state/privateRoutesAtom.ts'
import { useAuthContext } from '@/context'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { ProjectForOwnerFragment, ProjectStatus } from '@/types'
import { toInt } from '@/utils'

import { CreateProjectButton } from './CreateProjectButton'

export const ProjectSelectMenu = () => {
  const { t } = useTranslation()
  const isRouteForProjectCreation = useAtomValue(isRouteForProjectCreationAtom)

  const { user, isUserAProjectCreator } = useAuthContext()

  if (isRouteForProjectCreation) {
    return null
  }

  if (!isUserAProjectCreator) {
    return <CreateProjectButton />
  }

  const projectListByOrder = user.ownerOf
    .map((owner) => owner.project)
    .sort((a, b) => toInt(b?.createdAt) - toInt(a?.createdAt))

  const activeProjects = projectListByOrder.filter((project) => project?.status === ProjectStatus.Active) || []
  const preLaunchProjects = projectListByOrder.filter((project) => project?.status === ProjectStatus.PreLaunch) || []
  const inActiveProjects =
    projectListByOrder.filter(
      (project) => project?.status !== ProjectStatus.Active && project?.status !== ProjectStatus.PreLaunch,
    ) || []

  return (
    <Menu size={'lg'} closeOnSelect placement="bottom-end">
      <MenuButton
        as={Button}
        size={{ base: 'md', lg: 'lg' }}
        variant="outline"
        colorScheme="neutral1"
        minWidth={'135px !important'}
      >
        {t('Select project')}
      </MenuButton>
      <Portal>
        <MenuList width="324px" maxHeight="500px" overflowY="auto">
          <VStack w="full" spacing={2}>
            {activeProjects.map((project) => {
              if (!project) return null
              return <ProjectSelectMenuItem key={project.id} project={project} />
            })}

            {preLaunchProjects.length > 0 && activeProjects.length > 0 && <Divider />}
            {preLaunchProjects.length > 0 && (
              <>
                <Body w="full" textAlign={'start'} px={2} py={1}>
                  {t('Launchpad projects')}
                </Body>

                {preLaunchProjects.map((project) => {
                  if (!project) return null
                  return <ProjectSelectMenuItem key={project.id} project={project} />
                })}
              </>
            )}

            {inActiveProjects.length > 0 && activeProjects.length > 0 && <Divider />}
            {inActiveProjects.length > 0 && (
              <>
                <Body w="full" textAlign={'start'} px={2} py={1}>
                  {t('Inactive projects')}
                </Body>

                {inActiveProjects.map((project) => {
                  if (!project) return null
                  return <ProjectSelectMenuItem key={project.id} project={project} isInactive />
                })}
              </>
            )}

            <MenuItem
              as={Link}
              to={getPath('launchStart')}
              border="1px solid"
              borderColor="primary1.8"
              color="primary1.11"
              paddingY={2}
              marginTop={2}
            >
              <HStack spacing={3} w="full" justifyContent={'center'}>
                <PiRocketLaunch fontSize={'20px'} />

                <Body medium>{t('Create project')}</Body>
              </HStack>
            </MenuItem>
          </VStack>
        </MenuList>
      </Portal>
    </Menu>
  )
}

const ProjectSelectMenuItem = ({ project, isInactive }: { project: ProjectForOwnerFragment; isInactive?: boolean }) => {
  return (
    <MenuItem
      as={Link}
      to={getPath('project', project.name)}
      overflow={'hidden'}
      key={project.id}
      paddingX={2}
      paddingY={1}
      icon={
        <ImageWithReload
          src={project.thumbnailImage}
          alt={`${project.title} project thumbnail image`}
          height="32px"
          width="32px"
          borderRadius={'6px'}
        />
      }
      sx={{
        '& span': {
          maxWidth: 'calc(100% - 40px)',
        },
      }}
      opacity={isInactive ? 0.5 : 1}
    >
      <Body medium isTruncated w="full">
        {project?.title}
      </Body>
    </MenuItem>
  )
}
