import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../context'
import { useUpdateProjectMutation } from '../../../types'
import { useNotification } from '../../../utils'
import { ProjectStoryForm } from '../../projectCreate/components/ProjectStoryForm'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from '../../projectCreate/components/ProjectUnsavedModal'
import { useProjectStoryForm } from '../../projectCreate/hooks/useProjectStoryForm'
import { BackToProjectMobile } from '../navigation/BackToProjectMobile'

export const ProjectStory = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { project, updateProject, loading } = useProjectContext()

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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={{ flexGrow: 1, display: 'flex' }}
    >
      <VStack
        width="100%"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        <VStack width="100%" alignItems="flex-start" flexGrow={1}>
          <ProjectStoryForm
            form={form}
            isLoading={loading}
            toolbarTop="5.9em"
          />
          <Button
            isLoading={updateLoading}
            isDisabled={!form.formState.isValid}
            variant="primary"
            w="full"
            type="submit"
          >
            {t('Save')}
          </Button>
          <BackToProjectMobile project={project} />
        </VStack>
      </VStack>
      <ProjectUnsavedModal {...unsavedModal} />
    </form>
  )
}
