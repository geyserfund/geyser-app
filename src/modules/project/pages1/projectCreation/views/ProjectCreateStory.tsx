import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useNotification } from '@/utils'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { dimensions, getPath } from '../../../../../shared/constants'
import { ProjectStoryForm } from '../../../forms/ProjectStoryForm'
import { FormContinueButton } from '../components/FormContinueButton'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout'
import { useLocationMandatoryRedirect } from '../hooks/useLocationMandatoryRedirect'
import { useProjectStoryForm } from '../hooks/useProjectStoryForm'

export const ProjectCreateStory = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useNotification()

  const params = useParams<{ projectId: string }>()

  const { project, loading } = useProjectAtom()

  const { updateProject } = useProjectAPI()

  const form = useProjectStoryForm({ project })

  useLocationMandatoryRedirect()

  const onLeave = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectDetails', project?.id))
  }

  const onBackCLick = () => {
    onLeave()
  }

  const onSubmit = async ({ description }: { description: string }) => {
    if (project.description === description) {
      navigate(getPath('launchProjectRewards', project?.id))
      return
    }

    updateProject.execute({
      variables: {
        input: { projectId: params.projectId, description },
      },
      onCompleted() {
        navigate(getPath('launchProjectRewards', project?.id))
      },
      onError(error) {
        toast.error({
          title: 'failed to update project story',
          description: `${error}`,
        })
      },
    })
  }

  const nextProps = {
    isDisabled: loading || updateProject.loading || !form.formState.isValid,
    onClick: form.handleSubmit(onSubmit),
  }

  return (
    <ProjectCreateLayout
      maxWidth={dimensions.project.posts.view.maxWidth}
      continueButton={<FormContinueButton {...nextProps} flexGrow={1} />}
      onBackClick={onBackCLick}
      height="100%"
      title={<TitleWithProgressBar title={t('Story')} subtitle={t('Create a project')} index={3} length={5} />}
      innerDesktopContainerProps={{ marginBottom: 20 }}
    >
      <ProjectStoryForm
        autoFocus
        form={form}
        isLoading={loading || !project}
        toolBarBottom={dimensions.bottomNavBar.desktopHeight + 'px'}
        fieldContainerProps={{
          subtitle: t('Write a more in-depth description of the project. You can also add images and videos.'),
        }}
      />
    </ProjectCreateLayout>
  )
}
