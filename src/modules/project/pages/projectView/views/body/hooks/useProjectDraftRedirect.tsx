import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'

import { getProjectCreationRoute } from '../../../../projectCreation/utils/getProjectCreationRoute.ts'

export const useProjectDraftRedirect = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { project, loading, isProjectOwner } = useProjectAtom()

  const isDraftProject = !project.launchedAt
  const isDraftUrl = location.pathname.includes('/draft')

  useEffect(() => {
    if (project && isProjectOwner && !loading && isDraftProject && !isDraftUrl) {
      navigate(getProjectCreationRoute(project.lastCreationStep, project.id))
    }
  }, [project, isProjectOwner, loading, navigate, isDraftProject, isDraftUrl])
}
