import { useParams } from 'react-router-dom'

import { ProjectProvider } from '../../context'
import { ProjectDashboard } from './ProjectDashboard'

export const ProjectDashboardPage = () => {
  const { projectId } = useParams<{ projectId: string }>()

  return (
    <ProjectProvider projectId={projectId || ''}>
      <ProjectDashboard />
    </ProjectProvider>
  )
}
