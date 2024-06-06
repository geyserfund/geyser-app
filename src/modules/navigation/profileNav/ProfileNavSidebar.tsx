import { VStack } from '@chakra-ui/react'

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
    <VStack w="full" h="100%" paddingY={5}>
      <ProfileNavContent />
    </VStack>
  )
}
