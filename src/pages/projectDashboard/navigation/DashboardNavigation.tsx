import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { NavLink } from 'react-router-dom'

import { CardLayout } from '../../../components/layouts'
import { getPath } from '../../../constants'
import { ProjectFragment } from '../../../types'
import { useMobileMode } from '../../../utils'
import { creatorSections, projectSections } from '../ProjectDashboard'
import { MobileNavButton } from './NavButton'
import { MobileNavItem, NavItem } from './NavItem'

export const DashboardNavigation = ({
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
          <MobileNavButton
            color="neutral.1000"
            fontWeight={500}
            onClick={() => setDrawerOpen(false)}
            rightIcon={
              <Box p={3}>
                <CloseIcon fontSize="0.8em" />
              </Box>
            }
          >
            Menu
          </MobileNavButton>
          <MobileNavButton
            bg="neutral.200"
            color="neutral.1000"
            fontWeight={700}
          >
            Creator dashboard
          </MobileNavButton>
          {Object.entries(creatorSections).map(([key, section]) => (
            <MobileNavItem
              onClick={() => setDrawerOpen(false)}
              key={key}
              isActive={activeSectionKey === key}
              projectName={project.name}
              section={section}
            />
          ))}
          <MobileNavButton
            bg="neutral.200"
            color="neutral.1000"
            fontWeight={700}
          >
            Edit project
          </MobileNavButton>
          {Object.entries(projectSections).map(([key, section]) => (
            <MobileNavItem
              onClick={() => setDrawerOpen(false)}
              key={key}
              isActive={activeSectionKey === key}
              projectName={project.name}
              section={section}
            />
          ))}
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
          <NavItem
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
          <NavItem
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
