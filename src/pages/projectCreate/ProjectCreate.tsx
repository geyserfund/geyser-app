import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import { getPath } from '../../constants'
import { useAuthContext } from '../../context'
import { useModal } from '../../hooks'
import { useCreateProjectMutation, useProjectByNameOrIdQuery, useUpdateProjectMutation } from '../../types'
import { useNotification } from '../../utils'
import { ProjectExitConfirmModal } from './components'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectForm } from './components/ProjectForm'
import { ProjectUnsavedModal, useProjectUnsavedModal } from './components/ProjectUnsavedModal'
import { useProjectForm } from './hooks/useProjectForm'
import { ProjectCreationVariables } from './types'

export const ProjectCreate = () => {
  const { t } = useTranslation()
  const params = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  const { toast } = useNotification()
  const { queryCurrentUser } = useAuthContext()

  const isEdit = Boolean(params.projectId)

  const { loading, data } = useProjectByNameOrIdQuery({
    skip: !params.projectId,
    variables: { where: { id: Number(params.projectId) } },
  })

  const form = useProjectForm({
    isEdit,
    project: data?.projectGet,
  })

  const [createProject, { loading: createLoading }] = useCreateProjectMutation({
    onCompleted({ createProject }) {
      if (createProject && createProject.owners[0]) {
        queryCurrentUser()

        navigate(getPath('launchProjectDetails', createProject.id))
      }
    },
    onError(error) {
      toast({
        title: 'failed to create project',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const [updateProject, { loading: updateLoading }] = useUpdateProjectMutation({
    onCompleted() {
      navigate(getPath('launchProjectDetails', params.projectId || ''))
    },
    onError(error) {
      toast({
        title: 'failed to update project',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const onLeave = () =>
    navigate(
      params.projectId ? `${getPath('publicProjectLaunch')}/${params.projectId}` : getPath('publicProjectLaunch'),
    )

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const exitModal = useModal()

  const onBackClick = () => {
    if (form.formState.isDirty) {
      return unsavedModal.onOpen({
        onLeave,
      })
    }

    onLeave()
  }

  const onSubmit = async ({ email, ...values }: ProjectCreationVariables) => {
    if (isEdit && data?.projectGet) {
      updateProject({
        variables: {
          input: {
            projectId: Number(data.projectGet?.id),
            ...values,
          },
        },
      })
    } else {
      createProject({
        variables: {
          input: {
            ...values,
            email,
          },
        },
      })
    }
  }

  const nextProps = {
    isLoading: loading || createLoading || updateLoading,
    isDisabled: createLoading || updateLoading || !form.formState.isValid,
    onClick: form.handleSubmit(onSubmit),
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ProjectCreateLayout
        continueButton={<FormContinueButton {...nextProps} flexGrow={1} />}
        onBackClick={isEdit ? exitModal.onOpen : onBackClick}
        title={
          <TitleWithProgressBar
            title={t('Project description')}
            subtitle={t('Create a project')}
            index={1}
            length={4}
          />
        }
      >
        <VStack width="100%" alignItems="flex-start" spacing={6}>
          <ProjectForm form={form} isEdit={isEdit} />
        </VStack>
      </ProjectCreateLayout>
      <ProjectUnsavedModal {...unsavedModal} />
      <ProjectExitConfirmModal {...exitModal} onConfirm={onBackClick} />
    </form>
  )
}
