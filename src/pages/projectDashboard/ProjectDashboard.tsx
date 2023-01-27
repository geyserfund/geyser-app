import { useLazyQuery } from '@apollo/client'
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  useMediaQuery,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { useAuthContext } from '../../context'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../graphql'
import { noScrollBar } from '../../styles/common'
import { Owner } from '../../types/generated/graphql'
import { useMobileMode } from '../../utils'
import { MilestoneSettings } from './MilestoneSettings'
import { ProjectContributors } from './ProjectContributors'
import { ProjectDashboardEntries } from './ProjectDashboardEntries'
import { ProjectDescription } from './ProjectDescription'
import { ProjectFundingSettings } from './ProjectFundingSettings'
import { ProjectSettings } from './ProjectSettings'
import { ProjectStats } from './ProjectStats'
import { RewardSettings } from './RewardSettings'

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

let storedTab = DashboardTabs.editProject

export const ProjectDashboard = () => {
  const isMobile = useMobileMode()
  const { projectId } = useParams<{ projectId: string }>()
  const { state: locationState }: { state: { loggedOut?: boolean } } =
    useLocation()
  const navigate = useNavigate()

  const { user, setNav } = useAuthContext()

  const [activeTab, setActiveTab] = useState<DashboardTabs>(storedTab)

  useEffect(() => {
    try {
      getProject()
    } catch (_) {
      navigate(getPath('notFound'))
    }
  }, [locationState])

  const handleTabSelection = async (selectedTab: DashboardTabs) => {
    if (selectedTab !== activeTab) {
      await getProject({ fetchPolicy: 'no-cache' })
    }

    setActiveTab(selectedTab)
    storedTab = selectedTab
  }

  const [getProject, { loading, data }] = useLazyQuery(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: {
        where: { name: projectId },
      },
      onCompleted(data) {
        if (data.project.owners[0].user.id !== user.id) {
          navigate(getPath('notAuthorized'))
        }

        setNav({
          projectName: data.project.name,
          projectTitle: data.project.title,
          projectPath: `${getPath('project', data.project.name)}`,
          projectOwnerIDs:
            data.project.owners.map((ownerInfo: Owner) => {
              return Number(ownerInfo.user.id || -1)
            }) || [],
        })
      },
    },
  )

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  if (loading || !data || !data.project) {
    return <Loader />
  }

  const { project } = data

  const renderTabs = () => {
    if (loading) {
      return (
        <GridItem colSpan={6} display="flex" justifyContent="center">
          <Loader />
        </GridItem>
      )
    }

    switch (activeTab) {
      case DashboardTabs.entries:
        return <ProjectDashboardEntries project={project} />
      case DashboardTabs.milestones:
        return <MilestoneSettings project={project} />
      case DashboardTabs.rewards:
        return <RewardSettings project={project} />
      case DashboardTabs.funds:
        return <ProjectFundingSettings project={project} />
      case DashboardTabs.editProject:
        return <ProjectDescription project={project} />
      case DashboardTabs.contributors:
        return <ProjectContributors project={project} />
      case DashboardTabs.stats:
        return <ProjectStats project={project} />
      case DashboardTabs.settings:
        return <ProjectSettings project={project} />
      default:
        return <ProjectDashboardEntries project={project} />
    }
  }

  const renderButton = (nav: DashboardTabs) => {
    return (
      <Box
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

        {renderTabs()}
      </Grid>
    </Box>
  )
}
