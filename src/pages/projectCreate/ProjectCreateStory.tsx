import { useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import { getPath } from '../../constants'
import {
  useProjectByNameOrIdQuery,
  useUpdateProjectMutation,
} from '../../types'
import { useNotification } from '../../utils'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectStoryForm } from './components/ProjectStoryForm'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from './components/ProjectUnsavedModal'
import { useProjectStoryForm } from './hooks/useProjectStoryForm'

export const ProjectCreateStory = () => {
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

  const project = data?.project
  const form = useProjectStoryForm({ project })

  const onLeave = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectDetails', project?.id))
  }

  const onBackCLick = () => {
    if (form.formState.isDirty) {
      return unsavedModal.onOpen({
        onLeave,
      })
    }

    onLeave()
  }

  const onSubmit = async ({ description }: { description: string }) => {
    updateProject({
      variables: {
        input: { projectId: params.projectId, description },
      },
    })
  }

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const nextProps = {
    isDisabled: loading || updateLoading,
    onClick: form.handleSubmit(onSubmit),
  }

  return (
    <ProjectCreateLayout
      maxWidth="3xl"
      continueButton={<FormContinueButton {...nextProps} flexGrow={1} />}
      onBackClick={onBackCLick}
      title={
        <TitleWithProgressBar
          title="Project description"
          subtitle="Create a project"
          index={3}
          length={4}
        />
      }
    >
      <ProjectStoryForm form={form} isLoading={loading} />
      <FormContinueButton width="100%" {...nextProps} />
      <ProjectUnsavedModal {...unsavedModal} />
    </ProjectCreateLayout>
  )
}
