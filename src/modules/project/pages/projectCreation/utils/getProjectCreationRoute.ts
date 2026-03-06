import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'

/** Returns the creation-flow route for a given persisted creation step. */
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
      return getPath('launchPayment', projectId)
    case ProjectCreationStep.TaxId:
      return getPath('launchPaymentTaxId', projectId)
    case ProjectCreationStep.IdentityVerification:
      return getPath('launchPaymentAccountPassword', projectId)
    case ProjectCreationStep.FiatContributions:
      return getPath('launchPaymentFiatContributions', projectId)
    case ProjectCreationStep.Launch:
      return getPath('launchFinalize', projectId)
    default:
      return getPath('launchProjectDetails', projectId)
  }
}
