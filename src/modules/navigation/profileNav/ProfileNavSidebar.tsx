import { Menu, MenuList } from '@chakra-ui/react'

import { NavigationBase, NavigationDirection } from '../sideNavBase/NavigationBase'
import { ProfileNavButton } from './components'
import { ProfileNavContent } from './ProfileNavContent'
import { useProfileSideNavAtom } from './profileSideNavAtom'

export const ProfileNavSidebar = () => {
  const [isProjectSideNavOpen, changeProjectSideNavOpen] = useProfileSideNavAtom()
  return (
    <>
      <ProfileNavButton onClick={() => changeProjectSideNavOpen(true)} />
      <NavigationBase
        isSideNavOpen={isProjectSideNavOpen}
        changeSideNavOpen={changeProjectSideNavOpen}
        navigation={<ProfileNavSidebarContent />}
        direction={NavigationDirection.right}
      />
    </>
  )
}

const ProfileNavSidebarContent = () => {
  return (
    <Menu isOpen={true} closeOnSelect={true}>
      <MenuList w="full" h="100vh" padding={0} borderRadius={0} boxShadow="none">
        <ProfileNavContent />
      </MenuList>
    </Menu>
  )
}
