import { Outlet, useParams } from 'react-router-dom'

import { ProjectProvider } from '../../context'

export const ProjectCreatePage = () => {
  const params = useParams<{ projectId: string }>()

  return (
    <ProjectProvider projectId={params.projectId}>
      <Outlet />
    </ProjectProvider>
  )
}
