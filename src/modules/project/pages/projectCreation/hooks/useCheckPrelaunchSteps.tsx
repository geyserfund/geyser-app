import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { isDraft, isPrelaunch } from '@/utils/index.ts'

import { isReadyForLaunchAtom } from '../states/nodeStatusAtom.ts'

export const useCheckPrelaunchSteps = () => {
  const { project, loading } = useProjectAtom()
  const { wallet, loading: walletLoading } = useWalletAtom()
  const setIsReadyForLaunch = useSetAtom(isReadyForLaunchAtom)

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
      setIsReadyForLaunch(false)
      navigate(getPath('launchPaymentWallet', project?.id), { replace: true })
    }
  }, [loading, project, wallet, navigate, isProjectDraft, isProjectPrelaunch, walletLoading, setIsReadyForLaunch])
}
