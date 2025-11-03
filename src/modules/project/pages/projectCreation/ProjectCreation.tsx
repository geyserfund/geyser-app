import { ScopeProvider } from 'jotai-scope'
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
]

export const ProjectCreation = () => {
  const { projectId } = useParams<{ projectId: string }>()
  useUserAccountKeys()

  const isProjectId = projectId && projectId !== 'new'

  return (
    <ScopeProvider atoms={listOfAtoms}>
      <ProjectProvider projectId={isProjectId ? toInt(projectId) : undefined}>
        <Outlet />
      </ProjectProvider>
    </ScopeProvider>
  )
}
