import { PropsWithChildren } from 'react'

import {
  NavigationBase,
  NavigationDirection,
} from '../sideNavBase/NavigationBase'
import { ProfileRightSideNav } from './ProfileRightSideNav'
import { useProfileSideNavAtom } from './profileSideNavAtom'

export const ProfileSideNavigation = ({ children }: PropsWithChildren) => {
  const [isProjectSideNavOpen, changeProjectSideNavOpen] =
    useProfileSideNavAtom()
  return (
    <NavigationBase
      isSideNavOpen={isProjectSideNavOpen}
      changeSideNavOpen={changeProjectSideNavOpen}
      navigation={<ProfileRightSideNav />}
      direction={NavigationDirection.right}
    >
      {children}
    </NavigationBase>
  )
}
