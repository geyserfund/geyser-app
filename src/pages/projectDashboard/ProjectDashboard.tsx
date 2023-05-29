import { Box, Button, HStack, useBreakpointValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router'

import Loader from '../../components/ui/Loader'
import { getPath, PathName } from '../../constants'
import { useAuthContext, useProjectContext } from '../../context'
import { noScrollBar } from '../../styles/common'

enum DashboardTabs {
  funds = 'funds',
  editProject = 'edit project',
  story = 'story',
  contributors = 'contributors',
  details = 'details',
  stats = 'stats',
  settings = 'settings',
}

export const ProjectDashboard = () => {
  const isMobile = useBreakpointValue({ lg: false, base: true })
  const { projectId } = useParams<{ projectId: string }>()

  const navigate = useNavigate()
  const location = useLocation()

  const { user } = useAuthContext()

  const [activeTab, setActiveTab] = useState<DashboardTabs>()

  useEffect(() => {
    if (location.pathname) {
      const splitValue = location.pathname.split(
        `${PathName.projectDashboard}`,
      )[1]
      const pathName = checkValue(splitValue)
      setActiveTab(pathName)
    }
  }, [location])

  const handleTabSelection = async (selectedTab: DashboardTabs) => {
    const routePath =
      selectedTab === DashboardTabs.editProject ? '' : selectedTab
    navigate(
      `/${PathName.project}/${projectId}/${PathName.projectDashboard}/${routePath}`,
    )
  }

  const checkValue = (splitValue?: string) => {
    if (!splitValue || splitValue === '/') {
      return DashboardTabs.editProject
    }

    return splitValue.replaceAll('/', '') as DashboardTabs
  }

  const { loading, project } = useProjectContext()

  useEffect(() => {
    if (project && project.owners[0]?.user.id !== user.id) {
      navigate(getPath('notAuthorized'))
    }
  }, [navigate, project, user.id])

  if (loading) {
    return <Loader alignItems="flex-start" paddingTop="120px" />
  }

  const renderButton = (nav: DashboardTabs) => {
    return (
      <Box
        key={nav}
        borderBottom="3px solid"
        borderColor={activeTab === nav ? 'primary.400' : 'neutral.500'}
      >
        <Button
          borderRadius="4px"
          _hover={{ backgroundColor: 'none' }}
          w="100%"
          rounded="none"
          bg="none"
          fontWeight={activeTab === nav ? 'bold' : 'normal'}
          fontSize="16px"
          marginTop="10px"
          onClick={() => handleTabSelection(nav)}
          textTransform="capitalize"
        >
          {nav}
        </Button>
      </Box>
    )
  }

  const navList: DashboardTabs[] = [
    DashboardTabs.editProject,
    DashboardTabs.details,
    DashboardTabs.story,
    DashboardTabs.funds,
    DashboardTabs.contributors,
    DashboardTabs.stats,
    DashboardTabs.settings,
  ]

  if (loading) {
    return <Loader />
  }

  return (
    <Box
      background={'neutral.50'}
      position="relative"
      paddingBottom={10}
      minHeight="100%"
      justifyContent="space-between"
    >
      <HStack
        width="100%"
        justifyContent="center"
        paddingTop={isMobile ? '10px' : '30px'}
        overflowX={isMobile ? 'auto' : undefined}
        __css={noScrollBar}
      >
        <HStack
          spacing="0px"
          minWidth="350px"
          display="flex"
          alignItems="center"
        >
          {navList.map((nav) => renderButton(nav))}
        </HStack>
      </HStack>
      <Box maxW="100%" px={2}>
        <Outlet />
      </Box>
    </Box>
  )
}
