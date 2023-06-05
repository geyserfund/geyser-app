import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Divider } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { getPath } from '../../../constants'
import { DashboardSection } from '../ProjectDashboard'
import { MobileNavButton, NavButton } from './NavButton'

export const NavItem = ({
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
      <NavButton isActive={isActive}>{section.label}</NavButton>
    </NavLink>
  )
}

export const MobileNavItem = ({
  section,
  isActive,
  projectName,
  onClick,
}: {
  section: DashboardSection
  isActive: boolean
  projectName: string
  onClick(): void
}) => {
  return (
    <NavLink to={getPath(section.path, projectName)} onClick={onClick}>
      <MobileNavButton
        py={8}
        isActive={isActive}
        rightIcon={
          <Box p={2}>
            <ChevronRightIcon fontSize="1.2em" />
          </Box>
        }
      >
        {section.label}
      </MobileNavButton>
      <Divider />
    </NavLink>
  )
}
