import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { isDraft, isPrelaunch } from '@/utils/index.ts'

export const useCheckPrelaunchSteps = () => {
  const { project, loading } = useProjectAtom()
  const { wallet, loading: walletLoading } = useWalletAtom()

  const navigate = useNavigate()

  const isProjectDraft = isDraft(project?.status)
  const isProjectPrelaunch = isPrelaunch(project?.status)

  useEffect(() => {
    if (loading || walletLoading) {
      return
    }

    if (!isProjectDraft) {
      if (isProjectPrelaunch) {
        navigate(getPath('projectPreLaunch', project?.name), { replace: true })
      } else {
        navigate(getPath('project', project?.name), { replace: true })
      }

      return
    }

    if (!wallet?.id) {
      navigate(getPath('launchProjectWallet', project?.id), { replace: true })
    }
  }, [loading, project, wallet, navigate, isProjectDraft, isProjectPrelaunch, walletLoading])
}
