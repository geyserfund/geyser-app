import { useMutation } from '@apollo/client'
import { Button, HStack, Switch, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAuthContext, useProjectContext } from '../../../context'
import { FieldContainer } from '../../../forms/components/FieldContainer'
import { TextField } from '../../../forms/components/TextField'
import { MUTATION_UPDATE_PROJECT } from '../../../graphql/mutations'
import { useModal } from '../../../hooks/useModal'
import {
  Project,
  ProjectStatus,
  useProjectDeleteMutation,
} from '../../../types'
import { isActive, useNotification } from '../../../utils'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from '../../projectCreate/components/ProjectUnsavedModal'
import { DeleteProjectModal } from '../components/DeleteProjectModal'

export type ProjectSettingsVariables = {
  expiresAt?: string
  email: string
  status: ProjectStatus | ''
  deactivate: boolean
}

export const ProjectSettings = () => {
  const { t } = useTranslation()
  const { user } = useAuthContext()
  const { toast } = useNotification()
  const navigate = useNavigate()

  const { project, updateProject } = useProjectContext()

  const form = useForm<ProjectSettingsVariables>({
    values: useMemo(
      () => ({
        email: user.email || '',
        status: project?.status || '',
        deactivate: !isActive(project?.status),
      }),
      [project?.status, user.email],
    ),
  })

  const { formState, handleSubmit, setValue, watch, control } = form

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: formState.isDirty,
  })

  const deleteProjectModal = useModal()

  const [updateProjectMutation, { loading: updateLoading }] = useMutation<{
    updateProject: Project
  }>(MUTATION_UPDATE_PROJECT, {
    onCompleted(data) {
      if (data?.updateProject && updateProject) {
        updateProject(data.updateProject)
      }

      toast({
        title: 'Project updated successfully!',
        status: 'success',
      })
    },
    onError(error) {
      toast({
        title: 'failed to update project',
        description: `${error}`,
        status: 'error',
      })
    },
  })

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
        .catch(() =>
          toast({ title: 'failed to delete project', status: 'error' }),
        )
    }
  }

  const handleDeactivate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const shouldDeactivate = event.target.checked
      setValue('deactivate', shouldDeactivate, { shouldDirty: true })
      setValue(
        'status',
        shouldDeactivate ? ProjectStatus.Inactive : ProjectStatus.Active,
      )
    }
  }

  const onSubmit = ({ status }: ProjectSettingsVariables) => {
    if (project) {
      updateProjectMutation({
        variables: {
          input: {
            projectId: Number(project.id),
            status,
          },
        },
      })
    }
  }

  if (!project) {
    return null
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ flexGrow: 1, display: 'flex' }}
    >
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
        {project.status !== ProjectStatus.Deleted && (
          <VStack>
            <FieldContainer title="Project status">
              <HStack w="100%" justifyContent="stretch">
                <Text variant="body2" flexGrow={1}>
                  {t('Deactivate')}
                </Text>
                <Switch
                  defaultChecked={watch('deactivate')}
                  onChange={handleDeactivate}
                  colorScheme="red"
                />
              </HStack>
            </FieldContainer>
            <Text color="neutral.600">
              {t(
                'Deactivating your project would not allow others to fund your project, but your project will still be visible to everyone else. You will be able to re-activate your project at any time.',
              )}
            </Text>
          </VStack>
        )}

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
          <Button
            isLoading={updateLoading}
            variant="primary"
            w="full"
            type="submit"
          >
            {t('Save')}
          </Button>
        </VStack>
      </VStack>
      <ProjectUnsavedModal {...unsavedModal} />
      <DeleteProjectModal
        {...deleteProjectModal}
        isLoading={deleteLoading}
        onConfirm={() => handleDeleteProject()}
      />
    </form>
  )
}
