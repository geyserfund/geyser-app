import { useMutation } from '@apollo/client'
import { Button, Switch, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Body2 } from '../../../components/typography'
import { TextInputBox } from '../../../components/ui'
import { useAuthContext, useProjectContext } from '../../../context'
import { MUTATION_UPDATE_PROJECT } from '../../../graphql/mutations'
import { Project, ProjectStatus } from '../../../types'
import { isActive, useNotification } from '../../../utils'
import { ProjectFundraisingDeadline } from '../../projectCreate/components/ProjectFundraisingDeadline'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from '../../projectCreate/components/ProjectUnsavedModal'

export type ProjectSettingsVariables = {
  expiresAt?: string
  email: string
  status: ProjectStatus | ''
  deactivate: boolean
}

export const ProjectSettings = () => {
  const { user } = useAuthContext()
  const { toast } = useNotification()

  const { project, updateProject } = useProjectContext()

  const form = useForm<ProjectSettingsVariables>({
    values: useMemo(
      () => ({
        expiresAt: project?.expiresAt || '',
        email: user.email || '',
        status: project?.status || '',
        deactivate: !isActive(project?.status),
      }),
      [project?.expiresAt, project?.status, user.email],
    ),
  })

  const { formState, handleSubmit, setValue, watch } = form

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: formState.isDirty,
  })

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
        title: 'project update failed!',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('email', event.target.value, { shouldDirty: true })
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

  const onSubmit = ({ expiresAt, status }: ProjectSettingsVariables) => {
    if (project) {
      updateProjectMutation({
        variables: {
          input: {
            projectId: Number(project.id),
            expiresAt: expiresAt || null,
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
        <ProjectFundraisingDeadline setValue={setValue} watch={watch} />
        <VStack width="100%" alignItems="flex-start" spacing="5px">
          <Body2>Project E-mail</Body2>
          <TextInputBox
            name="email"
            value={watch('email')}
            onChange={handleEmail}
            error={formState.errors.email?.message}
            isDisabled={Boolean(user.email)}
          />
        </VStack>
        {project.status !== ProjectStatus.Deleted && (
          <VStack width="100%" alignItems="flex-start" spacing="5px">
            <Body2>Deactivate</Body2>
            <Switch
              defaultChecked={watch('deactivate')}
              onChange={handleDeactivate}
              colorScheme="red"
            >
              {' '}
              Deactivate Project
            </Switch>
            <Text fontSize="12px">
              Deactivating your project would not allow others to fund your
              project, but your project will still be visible to everyone else.
              You will be able to re-activate your project at any time.
            </Text>
          </VStack>
        )}

        <VStack w="100%" flexGrow={1} justifyContent="end">
          <Button
            isLoading={updateLoading}
            variant="primary"
            w="full"
            type="submit"
          >
            Save
          </Button>
        </VStack>
      </VStack>
      <ProjectUnsavedModal {...unsavedModal} />
    </form>
  )
}
