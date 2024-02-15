import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import { dimensions, getPath } from '../../constants'
import { useProjectByNameOrIdQuery, useUpdateProjectMutation } from '../../types'
import { useNotification } from '../../utils'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectStoryForm } from './components/ProjectStoryForm'
import { useProjectStoryForm } from './hooks/useProjectStoryForm'

export const ProjectCreateStory = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { toast } = useNotification()
  const params = useParams<{ projectId: string }>()

  const { loading, data } = useProjectByNameOrIdQuery({
    skip: !params.projectId,
    variables: { where: { id: Number(params.projectId) } },
  })

  const [updateProject, { loading: updateLoading }] = useUpdateProjectMutation({
    onCompleted() {
      navigate(getPath('launchProjectWithNode', project?.id))
    },
    onError() {
      toast({
        title: 'there was a problem saving the project story',
        status: 'error',
      })
    },
  })

  const project = data?.projectGet
  const form = useProjectStoryForm({ project })

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
    updateProject({
      variables: {
        input: { projectId: params.projectId, description },
      },
    })
  }

  const nextProps = {
    isDisabled: loading || updateLoading || !form.formState.isValid,
    onClick: form.handleSubmit(onSubmit),
  }

  return (
    <ProjectCreateLayout
      maxWidth="3xl"
      continueButton={<FormContinueButton {...nextProps} flexGrow={1} />}
      onBackClick={onBackCLick}
      height="100%"
      title={<TitleWithProgressBar title={t('Story')} subtitle={t('Create a project')} index={3} length={4} />}
    >
      <ProjectStoryForm
        autoFocus
        form={form}
        isLoading={loading || !project}
        toolbarTop={dimensions.topNavBar.mobile.height + 'px'}
      />
    </ProjectCreateLayout>
  )
}
