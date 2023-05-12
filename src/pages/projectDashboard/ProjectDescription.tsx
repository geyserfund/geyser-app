import { useMutation } from '@apollo/client'
import { GridItem, useMediaQuery, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ButtonComponent } from '../../components/ui'
import { useProjectContext } from '../../context'
import { MUTATION_UPDATE_PROJECT } from '../../graphql/mutations'
import { useBeforeClose } from '../../hooks'
import { FormError, Project } from '../../types'
import { checkDiff, toInt, useMobileMode, useNotification } from '../../utils'
import {
  ProjectCreateForm,
  ProjectCreateFormValidation,
} from '../projectCreate/components/ProjectCreateForm'
import { ProjectPreviewComponent } from '../projectCreate/components/ProjectPreviewComponent'
import { ProjectUpdateVariables } from '../projectCreate/types'
import { DashboardGridLayout } from './components/DashboardGridLayout'

export const ProjectDescription = () => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()

  const { project, updateProject } = useProjectContext()

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  // @TODO: Figure a better way to type the form to reuse with create flow
  const [form, setForm] = useState<any>({
    projectId: project?.id || '',
    title: '',
    shortDescription: '',
    description: '',
    image: '',
    thumbnailImage: '',
  })

  const { setIsFormDirty } = useBeforeClose()

  useEffect(() => {
    if (!project) {
      return
    }

    const isDiff = checkDiff(project, form, [
      'title',
      'shortDescription',
      'description',
      'image',
      'thumbnailImage',
    ])

    setIsFormDirty(isDiff)
  }, [project, form, setIsFormDirty])

  const [formError, setFormError] = useState<FormError<ProjectUpdateVariables>>(
    {},
  )

  const [updateProjectMutation, { loading: updateLoading }] = useMutation<{
    updateProject: Project
  }>(MUTATION_UPDATE_PROJECT, {
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
        title: 'project update failed!',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  useEffect(() => {
    if (project && project.id) {
      setForm({
        projectId: project.id,
        title: project.title,
        image: project.image || undefined,
        thumbnailImage: project.thumbnailImage || undefined,
        shortDescription: project.shortDescription,
        description: project.description,
        name: project.name,
      })
    }
  }, [project])

  if (!project) {
    return null
  }

  const handleNext = async () => {
    const isValid = validateForm()

    if (isValid) {
      updateProjectMutation({
        variables: {
          input: {
            projectId: toInt(project.id),
            title: form.title,
            image: form.image || undefined,
            thumbnailImage: form.thumbnailImage || undefined,
            shortDescription: form.shortDescription,
            description: form.description,
          },
        },
      })
    }
  }

  const validateForm = () => {
    const { errors, isValid } = ProjectCreateFormValidation(form)

    if (!isValid) {
      setFormError(errors)
    }

    return isValid
  }

  return (
    <DashboardGridLayout>
      <GridItem
        colSpan={isLargerThan1280 ? 6 : 2}
        display="flex"
        justifyContent="center"
      >
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
            <ProjectCreateForm
              {...{ form, setForm, formError, setFormError, isEdit: true }}
            />

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
      <GridItem
        colSpan={isLargerThan1280 ? 3 : 2}
        display="flex"
        marginTop={isMobile ? '0px' : '0px'}
        alignItems="flex-start"
        justifyContent="center"
      >
        <ProjectPreviewComponent data={form} />
      </GridItem>
    </DashboardGridLayout>
  )
}
