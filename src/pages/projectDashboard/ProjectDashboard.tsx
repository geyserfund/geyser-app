import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  useMediaQuery,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router'

import Loader from '../../components/ui/Loader'
import { getPath, PathName } from '../../constants'
import { ProjectProvider, useAuthContext } from '../../context'
import { useProjectState } from '../../hooks/graphqlState'
import { noScrollBar } from '../../styles/common'
import { Owner } from '../../types/generated/graphql'
import { useMobileMode } from '../../utils'

enum DashboardTabs {
  entries = 'entries',
  funds = 'funds',
  milestones = 'milestones',
  rewards = 'rewards',
  editProject = 'edit project',
  contributors = 'contributors',
  stats = 'stats',
  settings = 'settings',
}

export const ProjectDashboard = () => {
  const isMobile = useMobileMode()
  const { projectId } = useParams<{ projectId: string }>()

  const navigate = useNavigate()
  const location = useLocation()

  const { user, setNav } = useAuthContext()

  const [activeTab, setActiveTab] = useState<DashboardTabs>()

  useEffect(() => {
    if (location.pathname) {
      const splitedValue = location.pathname.split(
        `${PathName.projectDashboard}/`,
      )[1]
      const pathName = checkValue(splitedValue)
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

  const checkValue = (splitedValue: string) => {
    switch (splitedValue) {
      case DashboardTabs.entries:
        return DashboardTabs.entries
      case DashboardTabs.funds:
        return DashboardTabs.funds
      case DashboardTabs.milestones:
        return DashboardTabs.milestones
      case DashboardTabs.rewards:
        return DashboardTabs.rewards
      case DashboardTabs.contributors:
        return DashboardTabs.contributors
      case DashboardTabs.stats:
        return DashboardTabs.stats
      case DashboardTabs.settings:
        return DashboardTabs.settings
      default:
        return DashboardTabs.editProject
    }
  }

  const { loading, project } = useProjectState(projectId || '', {
    onError() {
      navigate(getPath('notFound'))
    },
    onCompleted(data) {
      const { project } = data
      if (project) {
        if (project.owners[0].user.id !== user.id) {
          navigate(getPath('notAuthorized'))
        }

        setNav({
          projectName: project.name,
          projectTitle: project.title,
          projectPath: `${getPath('project', project.name)}`,
          projectOwnerIDs:
            project.owners.map((ownerInfo: Owner) => {
              return Number(ownerInfo.user.id || -1)
            }) || [],
        })
      }
    },
  })

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  if (loading) {
    return <Loader alignItems="flex-start" paddingTop="120px" />
  }

  const renderButton = (nav: DashboardTabs) => {
    return (
      <Box
        key={nav}
        borderBottom="3px solid"
        borderColor={activeTab === nav ? 'brand.primary' : 'brand.neutral500'}
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
    DashboardTabs.contributors,
    DashboardTabs.funds,
    DashboardTabs.entries,
    DashboardTabs.rewards,
    DashboardTabs.milestones,
    DashboardTabs.stats,
    DashboardTabs.settings,
  ]

  if (loading) {
    return <Loader />
  }

  return (
    <Box
      background={'brand.bgGrey4'}
      position="relative"
      paddingBottom={10}
      height="100%"
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

      <Grid
        width="100%"
        templateColumns={
          isLargerThan1280
            ? 'repeat(12, 1fr)'
            : isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(5, 1fr)'
        }
        padding={
          isMobile
            ? '10px'
            : isLargerThan1280
            ? '40px 40px 20px 40px'
            : '40px 20px 20px 20px'
        }
      >
        {activeTab !== DashboardTabs.contributors && (
          <GridItem
            colSpan={isLargerThan1280 ? 3 : 1}
            display="flex"
            justifyContent="flex-start"
          ></GridItem>
        )}
        <ProjectProvider project={project}>
          <Outlet />
        </ProjectProvider>
      </Grid>
    </Box>
  )
}
