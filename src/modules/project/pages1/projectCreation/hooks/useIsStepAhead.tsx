import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { ProjectCreationStep, UpdateProjectInput } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

const projectCreationStepIndex = {
  [ProjectCreationStep.ProjectDetails]: 0,
  [ProjectCreationStep.FundingType]: 1,
  [ProjectCreationStep.FundingGoal]: 2,
  [ProjectCreationStep.PerksAndProducts]: 3,
  [ProjectCreationStep.Story]: 4,
  [ProjectCreationStep.AboutYou]: 5,
  [ProjectCreationStep.Wallet]: 6,
  [ProjectCreationStep.TaxId]: 7,
  [ProjectCreationStep.IdentityVerification]: 8,
}

export const useUpdateProjectWithLastCreationStep = (step: ProjectCreationStep, nextPath: string) => {
  const { project } = useProjectAtom()
  const { updateProject } = useProjectAPI()
  const navigate = useNavigate()
  const toast = useNotification()

  const projectStepIsAhead = projectCreationStepIndex[project.lastCreationStep] > projectCreationStepIndex[step]

  const nextStep = Object.keys(projectCreationStepIndex)[projectCreationStepIndex[step] + 1]

  const updateProjectWithLastCreationStep = (projectUpdateIput?: Omit<UpdateProjectInput, 'projectId'>) => {
    if (projectStepIsAhead) {
      navigate(nextPath)
      return
    }

    updateProject.execute({
      variables: {
        input: {
          projectId: project?.id,
          lastCreationStep: projectStepIsAhead ? undefined : (nextStep as ProjectCreationStep),
          ...projectUpdateIput,
        },
      },
      onCompleted() {
        navigate(nextPath)
      },
      onError() {
        toast.error({
          title: t('Failed to update project'),
          description: t('Please try again later.'),
        })
      },
    })
  }

  return {
    updateProjectWithLastCreationStep,
    loading: updateProject.loading,
  }
}
