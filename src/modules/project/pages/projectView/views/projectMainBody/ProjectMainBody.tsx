import { VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ProjectStatus } from '../../../../../../types'
import { useProjectContext } from '../../../../context'
import { useProjectGoals } from '../../hooks/useProjectGoals'
import { useProjectDetails } from '../projectNavigation/hooks/useProjectDetails'
import {
  CreatorTools,
  Details,
  Entries,
  FinalizeProjectNotice,
  Goals,
  Header,
  LaunchProjectNotice,
  Rewards,
  ShareProject,
  Story,
} from './sections'

export const ProjectMainBody = () => {
  const { project, loading } = useProjectContext()

  const location = useLocation()
  const navigate = useNavigate()

  const { hasGoals } = useProjectGoals()

  useEffect(() => {
    if (loading) return
    if (project?.status === ProjectStatus.Draft && !location.pathname.includes('/draft')) {
      navigate(location.pathname + '/draft')
    } else if (project?.status === ProjectStatus.Active && location.pathname.includes('/draft')) {
      navigate(location.pathname.replace('/draft', ''))
    }
  }, [project?.status, location.pathname, navigate, project?.name, loading])

  const projectDetails = useProjectDetails(project)

  return (
    <VStack w="full" spacing="20px" overflow="visible">
      <FinalizeProjectNotice />
      <LaunchProjectNotice />
      <Header />

      <Story />
      <ShareProject />
      <Rewards />
      {projectDetails.entriesLength ? <Entries /> : null}
      {hasGoals ? <Goals /> : null}
      <CreatorTools />
      <Details />
    </VStack>
  )
}
