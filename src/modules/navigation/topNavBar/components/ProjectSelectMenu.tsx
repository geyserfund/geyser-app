import { Button, Menu, MenuButton, MenuItem, MenuList, Portal, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { useAuthContext } from '@/context'
import { getPath } from '@/shared/constants'
import { toInt } from '@/utils'

import { CreateProjectButton } from './CreateProjectButton'

export const ProjectSelectMenu = () => {
  const { t } = useTranslation()

  const { user, isUserAProjectCreator } = useAuthContext()

  if (!isUserAProjectCreator) {
    return <CreateProjectButton />
  }

  const projectListByOrder = user.ownerOf
    .map((owner) => owner.project)
    .sort((a, b) => toInt(b?.createdAt) - toInt(a?.createdAt))

  return (
    <Menu size={'md'} closeOnSelect placement="bottom-end">
      <MenuButton as={Button} size={{ base: 'md', lg: 'lg' }} variant="outline" colorScheme="neutral1">
        {t('Select project')}
      </MenuButton>
      <Portal>
        <MenuList minWidth="260px" maxHeight="500px" overflowY="auto">
          <VStack w="full" spacing={2}>
            {projectListByOrder.map((project) => {
              if (!project) return null
              return (
                <MenuItem
                  as={Link}
                  to={getPath('project', project.name)}
                  key={project.id}
                  icon={
                    <ImageWithReload src={project.thumbnailImage} height="20px" width="20px" borderRadius={'6px'} />
                  }
                >
                  {project?.title}
                </MenuItem>
              )
            })}
            <MenuItem
              as={Link}
              to={getPath('launchStart')}
              icon={<PiRocketLaunch fontSize={'20px'} />}
              border="1px solid"
              borderColor="primary1.11"
              color="primary1.11"
            >
              {t('Create a new project')}
            </MenuItem>
          </VStack>
        </MenuList>
      </Portal>
    </Menu>
  )
}
