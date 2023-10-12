import {
  NavigationBase,
  NavigationDirection,
} from '../sideNavBase/NavigationBase'
import { ProfileRightSideNav } from './ProfileRightSideNav'
import { useProfileSideNavAtom } from './profileSideNavAtom'

export const ProfileSideNavigation = () => {
  const [isProjectSideNavOpen, changeProjectSideNavOpen] =
    useProfileSideNavAtom()
  return (
    <NavigationBase
      isSideNavOpen={isProjectSideNavOpen}
      changeSideNavOpen={changeProjectSideNavOpen}
      navigation={<ProfileRightSideNav />}
      direction={NavigationDirection.right}
    />
  )
}
