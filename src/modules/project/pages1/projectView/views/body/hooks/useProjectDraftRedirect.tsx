import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'
import { isDraft } from '@/utils/index.ts'

export const useProjectDraftRedirect = () => {
  const navigate = useNavigate()

  const { project, loading, isProjectOwner } = useProjectAtom()

  useEffect(() => {
    if (project && isProjectOwner && !loading && isDraft(project.status)) {
      navigate(getProjectCreationRoute(project.lastCreationStep, project.id))
    }
  }, [project, isProjectOwner, loading, navigate])
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
      return getPath('launchPaymentIdentityVerification', projectId)

    default:
      return getPath('launchProjectDetails', projectId)
  }
}
