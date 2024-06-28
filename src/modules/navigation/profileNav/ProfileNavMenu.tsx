import { Menu, MenuButton, MenuList, Portal } from '@chakra-ui/react'

import { ProfileNavButton } from './components/ProfileNavButton'
import { ProfileNavContent } from './ProfileNavContent'

export const ProfileNavMenu = () => {
  return (
    <Menu placement="bottom-end" closeOnSelect={true} strategy="fixed">
      <MenuButton>
        <ProfileNavButton as="div" />
      </MenuButton>
      <Portal>
        <MenuList p={0} zIndex="99" shadow="md">
          <ProfileNavContent />
        </MenuList>
      </Portal>
    </Menu>
  )
}
