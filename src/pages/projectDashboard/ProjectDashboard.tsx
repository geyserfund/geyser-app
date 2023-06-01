import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Container,
  ContainerProps,
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
  containerWidth?: ContainerProps['maxWidth']
  disableCanvas?: boolean
}

export const creatorSections: Record<string, DashboardSection> = {
  contributors: {
    label: 'Contributors',
    path: 'dashboardContributors',
    disableCanvas: true,
    containerWidth: '5xl',
  },
  stats: {
    label: 'Stats',
    path: 'dashboardStats',
    containerWidth: '4xl',
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
    disableCanvas: true,
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
        <VStack spacing={0} mb={4}>
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
    <HStack alignItems="stretch" flexGrow={1} minHeight="100%">
      <DashboardNavigation
        project={project}
        setDrawerOpen={setDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        activeSectionKey={activeSectionKey}
        p={10}
        position={{ base: 'sticky', '2xl': 'fixed' }}
        top={{ base: 0, '2xl': dimensions.topNavBar.desktop.height + 'px' }}
      />
      <VStack flexGrow={1}>
        <Container
          flexGrow={1}
          display="flex"
          flexDirection="column"
          py={{ base: 4, lg: 10 }}
          maxWidth={isMobile ? '100vw' : activeSection?.containerWidth || '2xl'}
          justifyItems="center"
        >
          {isMobile && activeSection?.disableCanvas ? (
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
