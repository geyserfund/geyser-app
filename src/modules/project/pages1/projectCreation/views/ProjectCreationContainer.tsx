import { Outlet, useParams } from 'react-router'

import { ProjectProvider } from '@/modules/project/context'
import { toInt } from '@/utils'

export const ProjectCreationContainer = () => {
  const { projectId } = useParams<{ projectId: string }>()

  return (
    <ProjectProvider projectId={toInt(projectId)}>
      <Outlet />
    </ProjectProvider>
  )
}
