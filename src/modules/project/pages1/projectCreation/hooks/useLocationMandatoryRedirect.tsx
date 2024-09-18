import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'

export const useLocationMandatoryRedirect = () => {
  const navigate = useNavigate()
  const { project, loading } = useProjectAtom()

  useEffect(() => {
    if (project && !loading && !project.location?.country?.code) {
      navigate(getPath('launchProjectDetails', project?.id))
    }
  }, [loading, project, navigate])
}
