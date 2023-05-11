import { useMutation } from '@apollo/client'
import { GridItem, Switch, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Body2 } from '../../components/typography'
import { ButtonComponent, TextInputBox } from '../../components/ui'
import { useAuthContext, useProjectContext } from '../../context'
import { MUTATION_UPDATE_PROJECT } from '../../graphql/mutations'
import { useBeforeClose } from '../../hooks'
import { FormError, Project, ProjectStatus } from '../../types'
import { isActive, toInt, useNotification } from '../../utils'
import { ProjectFundraisingDeadline } from '../projectCreate/components/ProjectFundraisingDeadline'
import { ProjectUpdateVariables } from '../projectCreate/types'
import { DashboardGridLayout } from './components/DashboardGridLayout'

type ProjectSettingsForm = {
  expiresAt?: string
  email: string
  status: ProjectStatus
}

export const ProjectSettings = () => {
  const { user } = useAuthContext()
  const { toast } = useNotification()

  const { project, updateProject } = useProjectContext()

  const [form, setForm] = useState<ProjectSettingsForm>({
    expiresAt: project.expiresAt as string,
    email: '',
    status: project.status as ProjectStatus,
  })

  const [deactivate, setDeactivate] = useState(!isActive(project.status))
  const [formError, setFormError] = useState<FormError<ProjectSettingsForm>>({})

  const { setIsFormDirty } = useBeforeClose()

  useEffect(() => {
    const isFormDirty = () => {
      if (
        ((Boolean(form.expiresAt) || Boolean(project.expiresAt)) &&
          `${form.expiresAt}` !== `${project.expiresAt}`) ||
        form.status !==
          (deactivate ? ProjectStatus.Inactive : ProjectStatus.Active)
      ) {
        return true
      }

      return false
    }

    setIsFormDirty(isFormDirty())
  }, [project, form, deactivate])

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
    setForm({ ...form, email: event.target.value })
  }

  const handleDeactivate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setDeactivate(event.target.checked)
    }
  }

  const handleNext = () => {
    const isValid = validateForm()

    const newForm = form
    newForm.email = user.email || form.email
    if (isValid) {
      updateProjectMutation({
        variables: {
          input: {
            projectId: toInt(project.id),
            expiresAt: form.expiresAt || null,
            status: deactivate ? ProjectStatus.Inactive : ProjectStatus.Active,
          },
        },
      })
    }
  }

  const validateForm = () => {
    const errors = {} as FormError<ProjectUpdateVariables>
    const isValid = true

    if (!isValid) {
      setFormError(errors)
    }

    return isValid
  }

  return (
    <DashboardGridLayout>
      <GridItem colSpan={6} display="flex" justifyContent="center">
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          maxWidth="600px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack width="100%" alignItems="flex-start" spacing="24px">
            <ProjectFundraisingDeadline {...{ form, setForm }} />
            <VStack width="100%" alignItems="flex-start" spacing="5px">
              <Body2>Project E-mail</Body2>
              <TextInputBox
                name="email"
                value={user.email || form.email}
                onChange={handleEmail}
                error={formError.email}
                isDisabled={Boolean(user.email)}
              />
            </VStack>
            {project.status !== ProjectStatus.Deleted && (
              <VStack width="100%" alignItems="flex-start" spacing="5px">
                <Body2>Deactivate</Body2>
                <Switch
                  defaultChecked={deactivate}
                  onChange={handleDeactivate}
                  colorScheme="red"
                >
                  {' '}
                  Deactivate Project
                </Switch>
                <Text fontSize="12px">
                  Deactivating your project would not allow others to fund your
                  project, but your project will still be visible to everyone
                  else. You will be able to re-activate your project at any
                  time.
                </Text>
              </VStack>
            )}
            <ButtonComponent
              isLoading={updateLoading}
              primary
              w="full"
              onClick={handleNext}
            >
              Save
            </ButtonComponent>
          </VStack>
        </VStack>
      </GridItem>
    </DashboardGridLayout>
  )
}
