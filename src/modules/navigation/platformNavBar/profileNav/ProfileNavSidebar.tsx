import { Menu, MenuList } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

import { NavigationBase, NavigationDirection } from '../../components/sideNavBase'
import { ProfileNavButton } from './components'
import { ProfileNavContent } from './ProfileNavContent'
import { useProfileSideNavAtom } from './profileSideNavAtom'

export const ProfileNavSidebar = () => {
  const [isProjectSideNavOpen, changeProjectSideNavOpen] = useProfileSideNavAtom()
  const location = useLocation()

  useEffect(() => {
    if (isProjectSideNavOpen) {
      changeProjectSideNavOpen(false)
    }
  }, [changeProjectSideNavOpen, isProjectSideNavOpen, location.hash, location.pathname, location.search])

  return (
    <>
      <ProfileNavButton onClick={() => changeProjectSideNavOpen(true)} />
      <NavigationBase
        isSideNavOpen={isProjectSideNavOpen}
        changeSideNavOpen={changeProjectSideNavOpen}
        navigation={<ProfileNavSidebarContent onClose={() => changeProjectSideNavOpen(false)} />}
        direction={NavigationDirection.right}
      />
    </>
  )
}

const ProfileNavSidebarContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <Menu isOpen={true} closeOnSelect={true} onClose={onClose}>
      <MenuList w="full" h="100vh" padding={0} borderRadius={0} boxShadow="none">
        <ProfileNavContent onNavigate={onClose} />
      </MenuList>
    </Menu>
  )
}
