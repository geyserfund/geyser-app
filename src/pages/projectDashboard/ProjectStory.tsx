import { Button, GridItem, useBreakpointValue, VStack } from '@chakra-ui/react'

import { useProjectContext } from '../../context'
import { useUpdateProjectMutation } from '../../types'
import { useNotification } from '../../utils'
import { ProjectPreviewComponent } from '../projectCreate/components/ProjectPreviewComponent'
import { ProjectStoryForm } from '../projectCreate/components/ProjectStoryForm'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from '../projectCreate/components/ProjectUnsavedModal'
import { useProjectStoryForm } from '../projectCreate/hooks/useProjectStoryForm'
import { DashboardGridLayout } from './components/DashboardGridLayout'

export const ProjectStory = () => {
  const { toast } = useNotification()

  const { project, updateProject, loading } = useProjectContext()

  const isViewXL = useBreakpointValue({ xl: true, base: false })

  const form = useProjectStoryForm({ project })

  const [updateProjectMutation, { loading: updateLoading }] =
    useUpdateProjectMutation({
      onCompleted(data) {
        if (updateProject) {
          updateProject(data.updateProject)
        }

        toast({
          title: 'Project story updated successfully!',
          status: 'success',
        })
      },
      onError(error) {
        toast({
          title: 'There was a problem while trying to update the project story',
          description: `${error}`,
          status: 'error',
        })
      },
    })

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const onSubmit = async ({ description }: { description: string }) => {
    if (!project) {
      return
    }

    updateProjectMutation({
      variables: {
        input: { projectId: project.id, description },
      },
    })
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
            justifyContent="center"
            alignItems="center"
          >
            <VStack width="100%" alignItems="flex-start" spacing="24px">
              <ProjectStoryForm form={form} isLoading={loading} />
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
          marginTop={0}
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
