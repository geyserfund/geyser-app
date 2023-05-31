import { NavLink } from 'react-router-dom'

import { getPath } from '../../../constants'
import { DashboardSection } from '../ProjectDashboard'
import { DashboardNavButton } from './DashboardNavButton'

export const DashboardNavItem = ({
  isActive,
  section,
  projectName,
}: {
  isActive: boolean
  section: DashboardSection
  projectName: string
}) => {
  return (
    <NavLink to={getPath(section.path, projectName)}>
      <DashboardNavButton isActive={isActive}>
        {section.label}
      </DashboardNavButton>
    </NavLink>
  )
}
