import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { isDraft, isPrelaunch } from '@/utils/index.ts'

import { FOLLOWERS_NEEDED } from '../../projectView/views/body/components/PrelaunchFollowButton.tsx'

export const useCheckPrelaunchSteps = () => {
  const { project, loading } = useProjectAtom()

  const navigate = useNavigate()

  const isProjectDraft = isDraft(project?.status)
  const isProjectPrelaunch = isPrelaunch(project?.status)
  const hasEnoughFollowers = project?.followersCount && project?.followersCount >= FOLLOWERS_NEEDED

  const hasPaidToLaunch = project?.paidLaunch

  useEffect(() => {
    if (hasPaidToLaunch || (isProjectPrelaunch && hasEnoughFollowers) || loading) {
      return
    }

    if (isProjectDraft) {
      navigate(getPath('launchProjectStrategy', project.id))
      return
    }

    if (isProjectPrelaunch) {
      navigate(getPath('projectPreLaunch', project.id))
    }
  }, [isProjectPrelaunch, isProjectDraft, hasEnoughFollowers, hasPaidToLaunch, navigate, project?.id, loading])
}
