import { ChevronRightIcon } from '@chakra-ui/icons'
import { Divider } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { getPath } from '../../../constants'
import { DashboardSection } from '../ProjectDashboard'
import { DashboardMobileNavButton } from './DashboardMobileNavButton'

export const DashboardMobileNavItem = ({
  section,
  projectName,
  onClick,
}: {
  section: DashboardSection
  projectName: string
  onClick(): void
}) => {
  return (
    <NavLink to={getPath(section.path, projectName)} onClick={onClick}>
      <DashboardMobileNavButton py={8} rightIcon={<ChevronRightIcon />}>
        {section.label}
      </DashboardMobileNavButton>
      <Divider />
    </NavLink>
  )
}
