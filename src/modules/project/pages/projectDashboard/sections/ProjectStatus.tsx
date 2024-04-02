import { useMutation } from '@apollo/client'
import { Button, HStack, Switch, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../../../context'
import { MUTATION_UPDATE_PROJECT } from '../../../../../graphql/mutations'
import { Project, ProjectStatus } from '../../../../../types'
import { isActive, useNotification } from '../../../../../utils'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../components/ProjectUnsavedModal'
import { BackToProjectMobile } from '../navigation/BackToProjectMobile'

export type ProjectStatusVariables = {
  status: ProjectStatus | ''
  deactivate: boolean
}

export const ProjectStatusSection = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { project, updateProject } = useProjectContext()

  const form = useForm<ProjectStatusVariables>({
    values: useMemo(
      () => ({
        status: project?.status || '',
        deactivate: !isActive(project?.status),
      }),
      [project?.status],
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
        title: 'failed to update project',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const handleDeactivate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const shouldDeactivate = !event.target.checked
      setValue('deactivate', shouldDeactivate, { shouldDirty: true })
      setValue('status', shouldDeactivate ? ProjectStatus.Inactive : ProjectStatus.Active)
    }
  }

  const onSubmit = ({ status }: ProjectStatusVariables) => {
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
    <form onSubmit={handleSubmit(onSubmit)} style={{ flexGrow: 1, display: 'flex' }}>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1}>
        {project.status !== ProjectStatus.Deleted && (
          <VStack>
            <HStack w="100%" justifyContent="stretch">
              <Text variant="body2" flexGrow={1}>
                {t('Active')}
              </Text>
              <Switch defaultChecked={!watch('deactivate')} onChange={handleDeactivate} colorScheme="primary" />
            </HStack>
            <Text color="neutral.600">
              {t(
                'Deactivating your project would not allow others to fund your project, but your project will still be visible to everyone else. You will be able to re-activate your project at any time.',
              )}
            </Text>
          </VStack>
        )}

        <VStack w="100%" flexGrow={1} justifyContent="end">
          <Button isLoading={updateLoading} variant="primary" w="full" type="submit">
            {t('Save')}
          </Button>
          <BackToProjectMobile project={project} />
        </VStack>
      </VStack>
      <ProjectUnsavedModal {...unsavedModal} />
    </form>
  )
}
