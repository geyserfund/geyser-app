import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { ProjectStoryForm } from '@/modules/project/forms/ProjectStoryForm'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useNotification } from '@/utils'

import { useProjectStoryForm } from '../../projectCreation/hooks/useProjectStoryForm'
import { DashboardLayout } from '../common'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../common/ProjectUnsavedModal'

export const ProjectDashboardStory = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  const { project, loading } = useProjectAtom()

  const form = useProjectStoryForm({ project })

  const { updateProject } = useProjectAPI()

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const onSubmit = async ({ description }: { description: string }) => {
    if (!project) {
      return
    }

    updateProject.execute({
      variables: {
        input: { projectId: project.id, description },
      },
      onCompleted(data) {
        toast.success({
          title: 'Project story updated successfully!',
        })
      },
      onError(error) {
        toast.error({
          title: 'There was a problem while trying to update the project story',
          description: `${error}`,
        })
      },
    })
  }

  const SaveButton = (props: ButtonProps) => {
    return (
      <Button
        size="lg"
        variant="solid"
        colorScheme="primary1"
        type="submit"
        isLoading={updateProject.loading}
        {...props}
      >
        {t('Save')}
      </Button>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} style={{ flexGrow: 1, display: 'flex' }}>
      <DashboardLayout
        mobileTopNavRightComponent={<SaveButton />}
        deskTopBottomComponent={<SaveButton w="full" />}
        desktopTitle={t('Story')}
        width="full"
      >
        <VStack width="100%" alignItems="flex-start" px={{ base: 0, lg: 6 }}>
          <ProjectStoryForm form={form} isLoading={loading} />
        </VStack>
      </DashboardLayout>

      <ProjectUnsavedModal {...unsavedModal} />
    </form>
  )
}
