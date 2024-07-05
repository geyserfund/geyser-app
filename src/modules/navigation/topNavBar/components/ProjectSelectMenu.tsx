import { Button, Menu, MenuButton, MenuItem, MenuList, Portal, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { getPath } from '@/constants'
import { useAuthContext } from '@/context'

import { CreateProjectButton } from './CreateProjectButton'

export const ProjectSelectMenu = () => {
  const { t } = useTranslation()

  const { user, isUserAProjectCreator } = useAuthContext()

  if (!isUserAProjectCreator) {
    return <CreateProjectButton />
  }

  return (
    <Menu size={'md'} closeOnSelect placement="bottom-end">
      <MenuButton as={Button} size={{ base: 'md', lg: 'lg' }} variant="outline" colorScheme="neutral1">
        {t('Select project')}
      </MenuButton>
      <Portal>
        <MenuList minWidth="260px">
          <VStack w="full" spacing={2}>
            {user.ownerOf.map((owner) => {
              if (!owner.project) return null
              return (
                <MenuItem
                  as={Link}
                  to={getPath('project', owner.project.name)}
                  key={owner.project.id}
                  icon={
                    <ImageWithReload
                      src={owner.project.thumbnailImage}
                      height="20px"
                      width="20px"
                      borderRadius={'6px'}
                    />
                  }
                >
                  {owner.project?.title}
                </MenuItem>
              )
            })}
            <MenuItem
              as={Link}
              to={getPath('publicProjectLaunch')}
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
