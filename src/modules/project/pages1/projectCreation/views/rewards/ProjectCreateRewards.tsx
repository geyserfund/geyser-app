import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'

import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'

import TitleWithProgressBar from '../../../../../../components/molecules/TitleWithProgressBar'
import { getPath, PathName } from '../../../../../../shared/constants'
import { FormContinueButton } from '../../components/FormContinueButton'
import { ProjectCreateLayout } from '../../components/ProjectCreateLayout'
import { useLocationMandatoryRedirect } from '../../hooks/useLocationMandatoryRedirect'
import { ProjectCreationLayout } from '../../Layouts/ProjectCreationLayout.tsx'

export const ProjectCreateRewards = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useProjectRewardsAPI(true)

  const { project } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  useLocationMandatoryRedirect()

  const isNew = useMatch(getPath('launchProjectRewardsCreate', project?.id))
  const isEdit = useMatch(getPath('launchProjectRewardsEdit', project?.id, PathName.rewardUUID))
  const isCreatingOrEditing = isNew || isEdit

  const handleNext = () => {
    navigate(getPath('launchStory', project?.id))
  }

  const handleBack = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchFundingGoal', project?.id))
  }

  const noRewards = rewards?.length === 0

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
