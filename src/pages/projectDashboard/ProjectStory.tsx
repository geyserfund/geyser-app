import { Button, GridItem, VStack } from '@chakra-ui/react'

import { useProjectContext } from '../../context'
import { useUpdateProjectMutation } from '../../types'
import { useMobileMode, useNotification } from '../../utils'
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

  const isMobile = useMobileMode()

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
    <form onSubmit={form.handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <DashboardGridLayout>
        <GridItem
          colSpan={isMobile ? 2 : 6}
          display="flex"
          justifyContent="center"
        >
          <VStack
            width="100%"
            maxWidth="600px"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <VStack width="100%" alignItems="flex-start">
              <ProjectStoryForm form={form} isLoading={loading} />
              <Button
                isLoading={updateLoading}
                isDisabled={!form.formState.isValid}
                variant="primary"
                w="full"
                type="submit"
              >
                Save
              </Button>
            </VStack>
          </VStack>
        </GridItem>
        <ProjectUnsavedModal {...unsavedModal} />
      </DashboardGridLayout>
    </form>
  )
}
