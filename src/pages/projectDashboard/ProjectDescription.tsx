import { Button, GridItem, useBreakpointValue, VStack } from '@chakra-ui/react'

import { useProjectContext } from '../../context'
import { useUpdateProjectMutation } from '../../types'
import { useMobileMode, useNotification } from '../../utils'
import { ProjectForm } from '../projectCreate/components/ProjectForm'
import { ProjectPreviewComponent } from '../projectCreate/components/ProjectPreviewComponent'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from '../projectCreate/components/ProjectUnsavedModal'
import { useProjectForm } from '../projectCreate/hooks/useProjectForm'
import { ProjectCreationVariables } from '../projectCreate/types'
import { DashboardGridLayout } from './components/DashboardGridLayout'

export const ProjectDescription = () => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()

  const { project, updateProject } = useProjectContext()

  const isViewXL = useBreakpointValue({ xl: true, base: false })

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
          title: 'project update failed!',
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
      <DashboardGridLayout>
        <GridItem
          colSpan={isViewXL ? 6 : 2}
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
              <ProjectForm form={form} isEdit />
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
        </GridItem>
        <GridItem
          colSpan={isViewXL ? 3 : 2}
          display="flex"
          marginTop={isMobile ? '0px' : '0px'}
          alignItems="flex-start"
          justifyContent="center"
        >
          <ProjectPreviewComponent data={form.getValues()} />
        </GridItem>
        <ProjectUnsavedModal {...unsavedModal} />
      </DashboardGridLayout>
    </form>
  )
}
