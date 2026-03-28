import { Menu, MenuList } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { matchPath, useLocation } from 'react-router'

import { getPath, PathName } from '@/shared/constants/index.ts'

import { NavigationBase, NavigationDirection } from '../../components/sideNavBase'
import { ProfileNavButton } from './components'
import { ProfileNavContent } from './ProfileNavContent'
import { useProfileSideNavAtom } from './profileSideNavAtom'

const MOBILE_SIDEBAR_SEARCH_PATTERNS = [
  { path: getPath('discoveryLanding'), end: true },
  { path: `${getPath('discoveryProjects')}/*`, end: false },
  { path: getPath('discoveryProjectCategory', PathName.categoryName), end: true },
  { path: getPath('discoveryProjectSubCategory', PathName.subCategoryName), end: true },
  { path: `${getPath('discoveryAllOrNothing')}/*`, end: false },
  { path: `${getPath('discoveryCampaigns')}/*`, end: false },
  { path: `${getPath('discoveryFundraisers')}/*`, end: false },
  { path: `${getPath('discoveryProducts')}/*`, end: false },
] as const

export const ProfileNavSidebar = () => {
  const [isProjectSideNavOpen, changeProjectSideNavOpen] = useProfileSideNavAtom()
  const location = useLocation()
  const previousLocationRef = useRef({
    hash: location.hash,
    pathname: location.pathname,
    search: location.search,
  })

  useEffect(() => {
    const previousLocation = previousLocationRef.current
    const hasLocationChanged =
      previousLocation.pathname !== location.pathname ||
      previousLocation.search !== location.search ||
      previousLocation.hash !== location.hash

    if (isProjectSideNavOpen && hasLocationChanged) {
      changeProjectSideNavOpen(false)
    }

    previousLocationRef.current = {
      hash: location.hash,
      pathname: location.pathname,
      search: location.search,
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
  const { pathname } = useLocation()
  const shouldShowSearch = MOBILE_SIDEBAR_SEARCH_PATTERNS.some((pattern) => matchPath(pattern, pathname))

  return (
    <Menu isOpen={true} closeOnSelect={true} onClose={onClose}>
      <MenuList w="full" h="100vh" padding={0} borderRadius={0} boxShadow="none">
        <ProfileNavContent onNavigate={onClose} showSearch={shouldShowSearch} />
      </MenuList>
    </Menu>
  )
}
