import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { isDraft, isPrelaunch } from '@/utils/index.ts'

export const useCheckPrelaunchSteps = () => {
  const { project, loading } = useProjectAtom()

  const navigate = useNavigate()

  const isProjectDraft = isDraft(project?.status)
  const isProjectPrelaunch = isPrelaunch(project?.status)

  useEffect(() => {
    if (loading) {
      return
    }

    if (!isProjectDraft) {
      if (isProjectPrelaunch) {
        navigate(getPath('projectPreLaunch', project?.name), { replace: true })
      } else {
        navigate(getPath('project', project?.name), { replace: true })
      }
    }
  }, [loading, project, navigate, isProjectDraft, isProjectPrelaunch])
}
