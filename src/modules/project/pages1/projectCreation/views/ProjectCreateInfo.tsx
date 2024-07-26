import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from '@/modules/project/pages/projectDashboard/components/ProjectUnsavedModal'
import { useNotification } from '@/utils'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { useAuthContext } from '../../../../../context'
import { getPath } from '../../../../../shared/constants'
import { useModal } from '../../../../../shared/hooks'
import { ProjectForm } from '../../../forms/ProjectForm'
import { FormContinueButton } from '../components/FormContinueButton'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout'
import { ProjectExitConfirmModal } from '../components/ProjectExitConfirmModal'
import { useProjectForm } from '../hooks/useProjectForm'
import { ProjectCreationVariables } from '../types'

export const ProjectCreateInfo = () => {
  const { t } = useTranslation()
  const params = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const toast = useNotification()

  const { queryCurrentUser } = useAuthContext()

  const isEdit = Boolean(params.projectId)

  const { project, loading } = useProjectAtom()

  const form = useProjectForm({
    isEdit,
    project,
  })

  const { createProject, updateProject } = useProjectAPI()

  const onLeave = () =>
    navigate(params.projectId ? `${getPath('launchStartProject', params.projectId)}` : getPath('launchStart'))

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
    if (isEdit && project.id) {
      updateProject.execute({
        variables: {
          input: {
            projectId: Number(project.id),
            ...values,
          },
        },
        onCompleted({ updateProject }) {
          navigate(getPath('launchProjectDetails', updateProject.id))
        },
        onError(error) {
          toast.error({
            title: 'failed to update project',
            description: `${error}`,
          })
        },
      })
    } else {
      createProject.execute({
        variables: {
          input: {
            ...values,
            email,
          },
        },
        onCompleted({ createProject }) {
          queryCurrentUser()
          navigate(getPath('launchProjectDetails', createProject.id))
        },
        onError(error) {
          toast.error({
            title: 'failed to create project',
            description: `${error}`,
          })
        },
      })
    }
  }

  const nextProps = {
    isLoading: (isEdit && loading) || createProject.loading || updateProject.loading,
    isDisabled: createProject.loading || updateProject.loading || !form.formState.isValid,
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
            length={5}
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
