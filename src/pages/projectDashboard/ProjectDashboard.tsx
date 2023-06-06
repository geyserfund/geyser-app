import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Container,
  Divider,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Outlet, useMatch } from 'react-router-dom'

import { CardLayout } from '../../components/layouts'
import Loader from '../../components/ui/Loader'
import { dimensions, getPath, PathsMap } from '../../constants'
import { useProjectContext } from '../../context'
import { useMobileMode } from '../../utils'
import { DashboardNavigation } from './navigation/DashboardNavigation'

export type DashboardSection = {
  label: string
  path: keyof PathsMap
  fullWidth?: boolean
}

export const creatorSections: Record<string, DashboardSection> = {
  contributors: {
    label: 'Contributors',
    path: 'dashboardContributors',
    fullWidth: true,
  },
  stats: {
    label: 'Stats',
    path: 'dashboardStats',
    fullWidth: true,
  },
}

export const projectSections: Record<string, DashboardSection> = {
  description: {
    label: 'Description',
    path: 'projectDashboard',
  },
  details: {
    label: 'Links & tags',
    path: 'dashboardDetails',
  },
  story: {
    label: 'Story',
    path: 'dashboardStory',
  },
  wallet: {
    label: 'Wallet',
    path: 'dashboardWallet',
  },
  settings: {
    label: 'Project settings',
    path: 'dashboardSettings',
  },
  // shop: {
  //   label: 'Shop items',
  //   path: 'dashboardShop',
  // },
}

const sections = { ...creatorSections, ...projectSections }

export const ProjectDashboard = () => {
  const isMobile = useMobileMode()
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const { project } = useProjectContext({ ownerAccessOnly: true })

  const match = useMatch(
    `${getPath('projectDashboard', project?.name)}/:section`,
  )

  const activeSectionKey = match?.params.section || 'description'
  const activeSection = sections[activeSectionKey]

  if (!project) {
    return (
      <Container pt={12}>
        <Loader />
      </Container>
    )
  }

  const content = (
    <>
      {isMobile ? (
        <VStack
          bg="neutral.0"
          spacing={0}
          mb={4}
          zIndex={10}
          position="sticky"
          top={dimensions.topNavBar.desktop.height + 'px'}
        >
          <HStack justifyContent="start" w="100%">
            <Text variant="h3" flexGrow={1} textAlign="left">
              {activeSection?.label}
            </Text>
            <IconButton
              aria-label="open dashboard menu"
              onClick={() => setDrawerOpen(true)}
              variant="transparent"
              justifyContent="end"
            >
              <ChevronRightIcon fontSize="1.7em" />
            </IconButton>
          </HStack>
          <Divider />
        </VStack>
      ) : (
        <Text variant="h3">{activeSection?.label}</Text>
      )}
      <Outlet />
    </>
  )

  return (
    <HStack
      alignItems="stretch"
      flexGrow={1}
      minHeight={`calc(100vh - ${dimensions.topNavBar.mobile.height}px)`}
    >
      <DashboardNavigation
        project={project}
        setDrawerOpen={setDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        activeSectionKey={activeSectionKey}
        p={10}
        position={{ base: 'sticky', xl: 'fixed' }}
        top={{ base: 0, xl: dimensions.topNavBar.desktop.height + 'px' }}
      />
      <VStack justifySelf="stretch" flexGrow={1} w="100%">
        <Container
          alignSelf="stretch"
          flexGrow={1}
          display="flex"
          flexDirection="column"
          py={{ base: 4, lg: 10 }}
          pl={{
            base: 4,
            xl: activeSection?.fullWidth ? '18em' : undefined,
          }}
          maxWidth={{
            base: '100%',
            lg: activeSection?.fullWidth ? '100%' : '2xl',
          }}
          justifyItems="center"
        >
          {isMobile ? (
            content
          ) : (
            <CardLayout pt={4} flexGrow={1}>
              {content}
            </CardLayout>
          )}
        </Container>
      </VStack>
    </HStack>
  )
}
