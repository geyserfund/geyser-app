import { Button, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../../../../context'
import { TextField } from '../../../../../forms/components/TextField'
import { useModal } from '../../../../../shared/hooks/useModal'
import { useProjectDeleteMutation } from '../../../../../types'
import { useNotification } from '../../../../../utils'
import { useProjectContext } from '../../../context'
import { DeleteProjectModal } from '../components/DeleteProjectModal'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../components/ProjectUnsavedModal'
import { BackToProjectMobile } from '../navigation/BackToProjectMobile'

export type ProjectSettingsVariables = {
  email: string
}

export const ProjectSettings = () => {
  const { t } = useTranslation()
  const { user } = useAuthContext()
  const { toast } = useNotification()
  const navigate = useNavigate()

  const { project } = useProjectContext()

  const form = useForm<ProjectSettingsVariables>({
    values: useMemo(
      () => ({
        email: user.email || '',
      }),
      [user.email],
    ),
  })

  const { formState, control } = form

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: formState.isDirty,
  })

  const deleteProjectModal = useModal()

  const [deleteProject, { loading: deleteLoading }] = useProjectDeleteMutation()

  const handleDeleteProject = () => {
    if (project && project.id && project.balance <= 0) {
      deleteProject({
        variables: {
          input: {
            projectId: project.id,
          },
        },
      })
        .then(() => {
          toast({
            title: 'Project updated successfully!',
            status: 'success',
            description: 'you will be redirected shortly...',
          })
          deleteProjectModal.onClose()
          setTimeout(() => navigate('/'), 2500)
        })
        .catch(() => toast({ title: 'failed to delete project', status: 'error' }))
    }
  }

  if (!project) {
    return null
  }

  return (
    <form style={{ flexGrow: 1, display: 'flex' }}>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1}>
        <TextField
          isDisabled={Boolean(user.email)}
          control={control}
          name="email"
          label={t('Email')}
          caption={t(
            `Project notifications and updates are sent to the project creator's email. This email can be edited from the creator's profile Settings.`,
          )}
        />

        <VStack w="100%" alignItems="start">
          <Text variant="body1">Delete Project</Text>
          <Text color="neutral.600">
            {t(
              'Deleting a project will make the project unaccessible to you and others. You can delete a project only if it has received no contributions. This is to ensure transparency for those who have contributed towards the project.',
            )}
          </Text>
          <Button
            w="100%"
            variant="danger"
            isDisabled={project.balance > 0}
            onClick={() => deleteProjectModal.onOpen()}
          >
            {t('Delete')}
          </Button>
        </VStack>

        <VStack w="100%" flexGrow={1} justifyContent="end">
          <BackToProjectMobile project={project} />
        </VStack>
      </VStack>
      <ProjectUnsavedModal {...unsavedModal} />
      <DeleteProjectModal {...deleteProjectModal} isLoading={deleteLoading} onConfirm={() => handleDeleteProject()} />
    </form>
  )
}
