import { useSetAtom } from 'jotai'
import { ScopeProvider } from 'jotai-scope'
import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { initialProjectDetailsLoadAtom, projectAtom, projectLoadingAtom } from '@/modules/project/state/projectAtom.ts'
import { initialProjectGrantApplicationsLoadAtom } from '@/modules/project/state/projectAtom.ts'
import { projectFormErrorAtom } from '@/modules/project/state/projectFormAtom.ts'
import { formProjectAtom } from '@/modules/project/state/projectFormAtom.ts'
import { initialRewardsLoadAtom, rewardsAtom } from '@/modules/project/state/rewardsAtom.ts'
import { walletAtom, walletConnectionDetailsAtom, walletLoadingAtom } from '@/modules/project/state/walletAtom.ts'
import { toInt } from '@/utils'

import { ProjectProvider } from '../../context/ProjectProvider.tsx'
import { creationReviewLockEnabledAtom, projectReviewsAtom } from './states/projectReviewAtom.ts'

const listOfAtoms = [
  projectAtom,
  projectLoadingAtom,
  initialProjectDetailsLoadAtom,
  initialProjectGrantApplicationsLoadAtom,
  rewardsAtom,
  initialRewardsLoadAtom,
  walletAtom,
  walletConnectionDetailsAtom,
  walletLoadingAtom,
  formProjectAtom,
  projectFormErrorAtom,
  projectReviewsAtom,
  creationReviewLockEnabledAtom,
]

export const ProjectCreation = () => {
  const { projectId } = useParams<{ projectId: string }>()
  useUserAccountKeys()

  const isProjectId = projectId && projectId !== 'new'

  return (
    <ScopeProvider atoms={listOfAtoms}>
      <ProjectCreationScopedContent projectId={isProjectId ? toInt(projectId) : undefined} />
    </ScopeProvider>
  )
}

const ProjectCreationScopedContent = ({ projectId }: { projectId?: number }) => {
  const setCreationReviewLockEnabled = useSetAtom(creationReviewLockEnabledAtom)

  useEffect(() => {
    setCreationReviewLockEnabled(true)

    return () => {
      setCreationReviewLockEnabled(false)
    }
  }, [setCreationReviewLockEnabled])

  return (
    <ProjectProvider projectId={projectId}>
      <Outlet />
    </ProjectProvider>
  )
}
