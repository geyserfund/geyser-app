import { useTranslation } from 'react-i18next'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'

import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'

import TitleWithProgressBar from '../../../../../../components/molecules/TitleWithProgressBar'
import { getPath, PathName } from '../../../../../../shared/constants'
import { FormContinueButton } from '../../components/FormContinueButton'
import { ProjectCreateLayout } from '../../components/ProjectCreateLayout'
import { useLocationMandatoryRedirect } from '../../hooks/useLocationMandatoryRedirect'

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
    navigate(getPath('launchProjectWallet', project?.id))
  }

  const handleBack = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectStory', project?.id))
  }

  const noRewards = rewards?.length === 0

  return (
    <ProjectCreateLayout
      title={<TitleWithProgressBar title={t('Add Products')} subtitle={t('Create a project')} index={4} length={5} />}
      continueButton={
        !isCreatingOrEditing && <FormContinueButton isSkip={noRewards} flexGrow={1} onClick={handleNext} />
      }
      isNestedProcess={Boolean(isCreatingOrEditing)}
      onBackClick={handleBack}
      maxW="3xl"
      height="100%"
    >
      <Outlet />
    </ProjectCreateLayout>
  )
}
