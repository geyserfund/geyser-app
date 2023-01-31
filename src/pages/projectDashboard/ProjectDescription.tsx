import { useMutation } from '@apollo/client'
import { GridItem, useMediaQuery, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ButtonComponent } from '../../components/ui'
import { MUTATION_UPDATE_PROJECT } from '../../graphql/mutations'
import { FormError } from '../../types'
import { Project } from '../../types/generated/graphql'
import { toInt, useMobileMode, useNotification } from '../../utils'
import {
  ProjectCreateForm,
  ProjectCreateFormValidation,
} from '../creation/projectCreate/components/ProjectCreateForm'
import {
  ProjectLinks,
  useProjectLinks,
} from '../creation/projectCreate/components/ProjectLinks'
import { ProjectPreviewComponent } from '../creation/projectCreate/components/ProjectPreviewComponent'
import { ProjectUpdateVariables } from '../creation/projectCreate/types'

export const ProjectDescription = ({ project }: { project: Project }) => {
  const isMobile = useMobileMode()

  const { toast } = useNotification()

  const { links, setLinks, handleLinks, linkError } = useProjectLinks({
    project,
  })

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  const [form, setForm] = useState<ProjectUpdateVariables>({
    projectId: project.id,
    title: '',
    shortDescription: '',
    description: '',
    image: '',
    thumbnailImage: '',
  })

  const [formError, setFormError] = useState<FormError<ProjectUpdateVariables>>(
    {},
  )

  const [updateProject, { loading: updateLoading }] = useMutation(
    MUTATION_UPDATE_PROJECT,
    {
      onCompleted() {
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
    },
  )

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
      if (project?.links?.length > 0) {
        const existingLinks = project.links.filter((link) => link) as string[]
        setLinks(existingLinks)
      }
    }
  }, [project])

  const handleNext = async () => {
    const isValid = validateForm()

    if (isValid) {
      await handleLinks()
      updateProject({
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
    let { errors, isValid } = ProjectCreateFormValidation(form)

    if (!isValid) {
      setFormError(errors)
    }

    if (linkError.includes(true)) {
      isValid = true
    }

    return isValid
  }

  return (
    <>
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

            <ProjectLinks {...{ links, setLinks, linkError }} />

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
    </>
  )
}
