import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'

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

export const getProjectCreationRoute = (lastCreationStep: ProjectCreationStep, projectId: string) => {
  switch (lastCreationStep) {
    case ProjectCreationStep.ProjectDetails:
      return getPath('launchProjectDetails', projectId)
    case ProjectCreationStep.FundingGoal:
      return getPath('launchFundingGoal', projectId)
    case ProjectCreationStep.FundingType:
      return getPath('launchFundingStrategy', projectId)
    case ProjectCreationStep.PerksAndProducts:
      return getPath('launchProjectRewards', projectId)
    case ProjectCreationStep.Story:
      return getPath('launchStory', projectId)
    case ProjectCreationStep.AboutYou:
      return getPath('launchAboutYou', projectId)
    case ProjectCreationStep.Wallet:
      return getPath('launchPaymentWallet', projectId)
    case ProjectCreationStep.TaxId:
      return getPath('launchPaymentTaxId', projectId)
    case ProjectCreationStep.IdentityVerification:
      return getPath('launchPaymentAccountPassword', projectId)
    case ProjectCreationStep.Launch:
      return getPath('launchFinalize', projectId)

    default:
      return getPath('launchProjectDetails', projectId)
  }
}
