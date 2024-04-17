import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useModal } from '../../../../../hooks'
import { useUpdateProjectMutation } from '../../../../../types'
import { useNotification } from '../../../../../utils'
import { useProjectContext } from '../../../context'
import { ProjectForm } from '../../../forms/ProjectForm'
import { useProjectForm } from '../../projectCreate/hooks/useProjectForm'
import { ProjectCreationVariables } from '../../projectCreate/types'
import { ProjectNameChangeConfirmModal } from '../components'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../components/ProjectUnsavedModal'

export const ProjectDescription = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const navigate = useNavigate()

  const nameChangeModal = useModal()

  const { project, updateProject } = useProjectContext()

  const form = useProjectForm({ isEdit: true, project })

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const [updateProjectMutation, { loading: updateLoading }] = useUpdateProjectMutation({
    onCompleted(data) {
      if (updateProject) {
        updateProject(data.updateProject)
      }

      toast({
        title: 'Project updated successfully!',
        status: 'success',
      })
      if (form.formState.dirtyFields.name) {
        navigate(`/project/${data.updateProject.name}/dashboard`, {
          replace: true,
        })
        form.resetField('name', {
          defaultValue: data.updateProject.name,
          keepError: false,
          keepDirty: false,
        })
      }
    },
    onError(error) {
      toast({
        title: 'Project update failed!',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const onSubmit = (values: ProjectCreationVariables) => {
    if (values.name !== project?.name) {
      nameChangeModal.onOpen()
      return
    }

    handleUpdateProjectMutation(values)
  }

  const handleUpdateProjectMutation = ({ email, ...values }: ProjectCreationVariables) => {
    if (project) {
      updateProjectMutation({
        variables: {
          input: {
            projectId: Number(project.id),
            ...values,
          },
        },
      })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <VStack width="100%" alignItems="flex-start" spacing="24px">
        <ProjectForm form={form} isEdit />
        <Button isLoading={updateLoading} variant="primary" w="full" type="submit">
          {t('Save')}
        </Button>
      </VStack>
      <ProjectUnsavedModal {...unsavedModal} />
      <ProjectNameChangeConfirmModal
        {...nameChangeModal}
        onSave={() => handleUpdateProjectMutation(form.getValues())}
      />
    </form>
  )
}
