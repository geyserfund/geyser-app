import { useTranslation } from 'react-i18next'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'

import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectCreationStep } from '@/types/index.ts'

import { getPath, PathName } from '../../../../../../shared/constants'
import { useUpdateProjectWithLastCreationStep } from '../../hooks/useIsStepAhead.tsx'
import { useLocationMandatoryRedirect } from '../../hooks/useLocationMandatoryRedirect'
import { ProjectCreationLayout } from '../../Layouts/ProjectCreationLayout.tsx'

export const ProjectCreateRewards = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useProjectRewardsAPI(true)

  const { project } = useProjectAtom()

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.PerksAndProducts,
    getPath('launchStory', project.id),
  )

  useLocationMandatoryRedirect()

  const isNew = useMatch(getPath('launchProjectRewardsCreate', project?.id))
  const isEdit = useMatch(getPath('launchProjectRewardsEdit', project?.id, PathName.rewardUUID))
  const isCreatingOrEditing = isNew || isEdit

  const handleNext = () => {
    updateProjectWithLastCreationStep()
  }

  const handleBack = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchFundingGoal', project?.id))
  }

  const continueProps = {
    onClick: handleNext,
  }

  const backProps = {
    onClick: handleBack,
  }

  return (
    <ProjectCreationLayout
      title={t('Products & Perks')}
      removeBottomContainer={Boolean(isCreatingOrEditing)}
      continueButtonProps={continueProps}
      backButtonProps={backProps}
    >
      <Outlet />
    </ProjectCreationLayout>
  )
}
