import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../context'
import { useUpdateProjectMutation } from '../../../types'
import { useNotification } from '../../../utils'
import { ProjectForm } from '../../projectCreate/components/ProjectForm'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from '../../projectCreate/components/ProjectUnsavedModal'
import { useProjectForm } from '../../projectCreate/hooks/useProjectForm'
import { ProjectCreationVariables } from '../../projectCreate/types'
import { BackToProjectMobile } from '../navigation/BackToProjectMobile'

export const ProjectDescription = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { project, updateProject } = useProjectContext()

  const form = useProjectForm({ isEdit: true, project })

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const [updateProjectMutation, { loading: updateLoading }] =
    useUpdateProjectMutation({
      onCompleted(data) {
        if (updateProject) {
          updateProject(data.updateProject)
        }

        toast({
          title: 'Project updated successfully!',
          status: 'success',
        })
      },
      onError(error) {
        toast({
          title: 'Project update failed!',
          description: `${error}`,
          status: 'error',
        })
      },
    })

  const onSubmit = ({ email, name, ...values }: ProjectCreationVariables) => {
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
        <Button
          isLoading={updateLoading}
          variant="primary"
          w="full"
          type="submit"
        >
          {t('Save')}
        </Button>
        <BackToProjectMobile project={project} />
      </VStack>
      <ProjectUnsavedModal {...unsavedModal} />
    </form>
  )
}
