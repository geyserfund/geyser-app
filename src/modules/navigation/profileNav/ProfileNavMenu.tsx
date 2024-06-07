import { Menu, MenuButton, MenuList, Portal } from '@chakra-ui/react'

import { ProfileNavButton } from './components/ProfileNavButton'
import { ProfileNavContent } from './ProfileNavContent'

export const ProfileNavMenu = () => {
  return (
    <Menu placement="bottom-end" strategy="fixed">
      <MenuButton>
        <ProfileNavButton />
      </MenuButton>
      <Portal>
        <MenuList p={0}>
          <ProfileNavContent />
        </MenuList>
      </Portal>
    </Menu>
  )
}
