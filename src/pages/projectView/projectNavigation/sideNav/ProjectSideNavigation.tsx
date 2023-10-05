import { PropsWithChildren } from 'react'

import {
  NavigationBase,
  NavigationDirection,
} from '../../../../navigation/sideNavBase/NavigationBase'
import { ProjectNavigation } from '../components/ProjectNavigation'
import { useProjectSideNavAtom } from './projectSideNavAtom'

export const ProjectSideNavigation = ({ children }: PropsWithChildren) => {
  const [isProjectSideNavOpen, changeProjectSideNavOpen] =
    useProjectSideNavAtom()
  return (
    <NavigationBase
      isSideNavOpen={isProjectSideNavOpen}
      changeSideNavOpen={changeProjectSideNavOpen}
      navigation={<ProjectNavigation showLabel />}
      direction={NavigationDirection.left}
    />
  )
}
