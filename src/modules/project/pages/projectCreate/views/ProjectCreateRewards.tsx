import { useTranslation } from 'react-i18next'
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { getPath } from '../../../../../constants'
import { useProjectByNameOrIdQuery } from '../../../../../types'
import { ProjectProvider } from '../../../context'
import { FormContinueButton } from '../components/FormContinueButton'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout'

export const ProjectCreateRewards = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { data } = useProjectByNameOrIdQuery({
    skip: !params.projectId,
    variables: { where: { id: Number(params.projectId) } },
  })

  const project = data?.projectGet

  const isNew = useMatch(getPath('launchProjectRewardsNew', project?.id))
  const isEdit = useMatch(getPath('launchProjectRewardsEdit', project?.id, ':rewardId'))
  const isCreatingOrEditing = isNew || isEdit

  const handleNext = () => {
    navigate(getPath('launchProjectWithNode', project?.id))
  }

  const handleBack = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectStory', project?.id))
  }

  const noRewards = project?.rewards?.length === 0

  return (
    <ProjectProvider projectName={project?.name || ''}>
      <ProjectCreateLayout
        title={<TitleWithProgressBar title={t('Add Rewards')} subtitle={t('Create a project')} index={4} length={5} />}
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
    </ProjectProvider>
  )
}
