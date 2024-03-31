import { useParams } from 'react-router-dom'

import { ProjectProvider } from '../../context'
import { ProjectDashboard } from './ProjectDashboard'

export const ProjectDashboardPage = () => {
  const { projectName } = useParams<{ projectName: string }>()

  return (
    <ProjectProvider projectName={projectName || ''}>
      <ProjectDashboard />
    </ProjectProvider>
  )
}
