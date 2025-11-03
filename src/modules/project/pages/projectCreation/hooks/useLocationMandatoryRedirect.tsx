import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { initialProjectDetailsLoadAtom } from '@/modules/project/state/projectAtom.ts'
import { getPath } from '@/shared/constants'

export const useLocationMandatoryRedirect = () => {
  const navigate = useNavigate()
  const { project, loading } = useProjectAtom()
  const projectDetailsLoading = useAtomValue(initialProjectDetailsLoadAtom)

  useEffect(() => {
    if (project && projectDetailsLoading && !project.location?.country?.code) {
      navigate(getPath('launchProjectDetails', project?.id))
    }
  }, [loading, project, navigate, projectDetailsLoading])
}
