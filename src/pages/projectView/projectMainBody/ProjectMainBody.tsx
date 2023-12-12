import { useAtomValue } from 'jotai'
import { Navigate, useParams } from 'react-router-dom'

import {
  routeMatchForProjectPageAtom,
  useGetHistoryRoute,
} from '../../../config'
import { getPath } from '../../../constants'
import { useProjectContext } from '../../../context'
import { useProjectDetails } from '../projectNavigation/hooks/useProjectDetails'
import {
  Entries,
  Header,
  LaunchProjectNotice,
  Milestones,
  Rewards,
  Story,
} from './sections'
import { Details } from './sections/Details'

export const ProjectMainBody = () => {
  const { project, isProjectOwner } = useProjectContext()

  const projectDetails = useProjectDetails(project)

  const params = useParams<{ projectId: string }>()
  const routeMatchForProjectPage = useAtomValue(routeMatchForProjectPageAtom)
  const historyRoutes = useGetHistoryRoute()
  const lastRoute = historyRoutes[historyRoutes.length - 2] || ''

  if (
    params.projectId &&
    routeMatchForProjectPage &&
    isProjectOwner &&
    !lastRoute.includes('launch') &&
    !(lastRoute.includes('project') && lastRoute.includes(params.projectId))
  ) {
    return <Navigate to={getPath('projectOverview', `${params.projectId}`)} />
  }

  return (
    <>
      <Header />

      {project && isProjectOwner ? (
        <LaunchProjectNotice project={project} />
      ) : null}
      <Story />
      {projectDetails.entriesLength ? <Entries /> : null}
      {projectDetails.rewardsLength ? <Rewards /> : null}
      {projectDetails.milestonesLength ? <Milestones /> : null}
      <Details />
    </>
  )
}
