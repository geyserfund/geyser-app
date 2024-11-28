import { Menu, MenuButton, MenuList, Portal } from '@chakra-ui/react'

import { ProfileNavButton } from './components/ProfileNavButton'
import { ProfileNavContent } from './ProfileNavContent'

export const ProfileNavMenu = () => {
  return (
    <Menu placement="bottom-end" closeOnSelect={true} strategy="fixed">
      <MenuButton as={ProfileNavButton} />
      <Portal>
        <MenuList p={0} zIndex="99" shadow="md" maxHeight="calc(100vh - 100px)" overflowY="auto">
          <ProfileNavContent />
        </MenuList>
      </Portal>
    </Menu>
  )
}
