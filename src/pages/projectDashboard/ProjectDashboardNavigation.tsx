import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Menu,
  Text,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { NavLink } from 'react-router-dom'

import { CardLayout } from '../../components/layouts'
import { getPath } from '../../constants'
import { ProjectFragment } from '../../types'
import { useMobileMode } from '../../utils'
import { DashboardMobileNavButton } from './components/DashboardMobileNavButton'
import { DashboardMobileNavItem } from './components/DashboardMobileNavItem'
import { DashboardNavItem } from './components/DashboardNavItem'
import { creatorSections, projectSections } from './ProjectDashboard'

export const ProjectDashboardNavigation = ({
  isDrawerOpen,
  setDrawerOpen,
  project,
  activeSectionKey,
  ...props
}: {
  isDrawerOpen: boolean
  setDrawerOpen: Dispatch<SetStateAction<boolean>>
  project: ProjectFragment
  activeSectionKey: string
} & BoxProps) => {
  const isMobile = useMobileMode()
  if (isMobile) {
    return (
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <Menu>
            <DashboardMobileNavButton
              color="neutral.1000"
              fontSize="16px"
              fontWeight={500}
              rightIcon={
                <IconButton
                  variant="transparent"
                  aria-label="close dashboard menu"
                  onClick={() => setDrawerOpen(false)}
                >
                  <CloseIcon fontSize="0.8em" />
                </IconButton>
              }
            >
              Menu
            </DashboardMobileNavButton>
            <DashboardMobileNavButton
              bg="neutral.200"
              color="neutral.1000"
              fontWeight={700}
            >
              Creator dashboard
            </DashboardMobileNavButton>
            {Object.entries(creatorSections).map(([key, section]) => (
              <DashboardMobileNavItem
                onClick={() => setDrawerOpen(false)}
                key={key}
                projectName={project.name}
                section={section}
              />
            ))}
            <DashboardMobileNavButton
              bg="neutral.200"
              color="neutral.1000"
              fontWeight={700}
            >
              Edit project
            </DashboardMobileNavButton>
            {Object.entries(projectSections).map(([key, section]) => (
              <DashboardMobileNavItem
                onClick={() => setDrawerOpen(false)}
                key={key}
                projectName={project.name}
                section={section}
              />
            ))}
          </Menu>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Box {...props}>
      <NavLink to={getPath('project', project.name)}>
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="secondary"
          w="100%"
          mb={4}
        >
          Back to project
        </Button>
      </NavLink>
      <CardLayout p={4}>
        <Text px={4} variant="body1" whiteSpace="nowrap">
          Creator dashboard
        </Text>
        {Object.entries(creatorSections).map(([key, section]) => (
          <DashboardNavItem
            key={key}
            isActive={activeSectionKey === key}
            projectName={project.name}
            section={section}
          />
        ))}
        <Text px={4} variant="body1">
          Edit project
        </Text>
        {Object.entries(projectSections).map(([key, section]) => (
          <DashboardNavItem
            key={key}
            isActive={activeSectionKey === key}
            projectName={project.name}
            section={section}
          />
        ))}
      </CardLayout>
    </Box>
  )
}
