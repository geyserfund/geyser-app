import { ChevronRightIcon } from '@chakra-ui/icons'
import { Container, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useMatch } from 'react-router-dom'

import Loader from '../../../../components/ui/Loader'
import { TitleDivider } from '../../../../components/ui/TitleDivider'
import { CardLayout } from '../../../../shared/constants'
import { useMobileMode } from '../../../../utils'
import { useProjectContext } from '../../context'
import { DashboardNavigation } from './navigation/DashboardNavigation'

export type DashboardSection = {
  label: string
  path: keyof PathsMap
  fullWidth?: boolean
  semiFullWidth?: boolean
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
    semiFullWidth: true,
  },
  status: {
    label: 'Status',
    path: 'dashboardStatus',
    semiFullWidth: true,
  },
  rewards: {
    label: 'Currency Denominations',
    path: 'dashboardRewards',
  },
  wallet: {
    label: 'Connect wallet',
    path: 'dashboardWallet',
  },
  nostr: {
    label: 'Nostr',
    path: 'dashboardNostr',
  },
  settings: {
    label: 'Project',
    path: 'dashboardSettings',
  },
  affiliate: {
    label: 'Affiliates',
    path: 'dashboardAffiliates',
    semiFullWidth: true,
  },
}

const sections = { ...projectSections }

export const ProjectDashboard = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const { project } = useProjectContext()

  const match = useMatch(project ? `${getPath('projectDashboard', project?.name)}/:section` : '')

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
        <TitleDivider
          zIndex={10}
          mb={4}
          bg="neutral.0"
          position="sticky"
          onClick={() => setDrawerOpen(true)}
          top={dimensions.topNavBar.desktop.height + 'px'}
          rightAction={
            <IconButton aria-label="open dashboard menu" variant="transparent" justifyContent="end">
              <ChevronRightIcon fontSize="1.7em" />
            </IconButton>
          }
        >
          {t(activeSection?.label || '')}
        </TitleDivider>
      ) : (
        <Text variant="h3">{t(activeSection?.label || '')}</Text>
      )}
      <Outlet />
    </>
  )

  return (
    <HStack alignItems="stretch" flexGrow={1} minHeight={`calc(100vh - ${dimensions.topNavBar.mobile.height}px)`}>
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
            xl: activeSection?.fullWidth ? '18em' : activeSection?.semiFullWidth ? '6em' : undefined,
          }}
          maxWidth={{
            base: '100%',
            lg: activeSection?.fullWidth ? '100%' : activeSection?.semiFullWidth ? '4xl' : '3xl',
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
