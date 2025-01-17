import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { ProjectStoryForm } from '@/modules/project/forms/ProjectStoryForm'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H1 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { useProjectStoryForm } from '../../projectCreation/hooks/useProjectStoryForm'
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
    <>
      <VStack as={'form'} onSubmit={form.handleSubmit(onSubmit)} w="full" height="full" paddingBottom={20}>
        <TopNavContainerBar>
          <Button
            size="lg"
            variant="ghost"
            colorScheme="neutral1"
            as={Link}
            to={getPath('project', project?.name)}
            leftIcon={<PiArrowLeft />}
          >
            {t('Back to project')}
          </Button>
          <SaveButton />
        </TopNavContainerBar>

        <CardLayout
          noborder
          backgroundColor="utils.pbg"
          w="full"
          h="full"
          flex={1}
          spacing={3}
          dense
          alignItems="center"
          paddingTop={8}
        >
          <VStack
            width="full"
            overflow={'hidden'}
            flex={1}
            maxWidth={dimensions.project.posts.view.maxWidth}
            alignItems="start"
          >
            <VStack w="full" alignItems={'start'} spacing={0}>
              <H1 size="2xl" bold>
                {t('Project Story')}
              </H1>
              <Body size="sm" light>
                {t('Write a more in-depth description of the project. You can also add images and videos.')}
              </Body>
            </VStack>
            <CardLayout w="full" flex={1} backgroundColor={'utils.surface'} height="calc(100% - 50px)" overflowY="auto">
              <ProjectStoryForm autoFocus form={form} isLoading={loading || !project} />
            </CardLayout>
          </VStack>
        </CardLayout>
      </VStack>

      <ProjectUnsavedModal {...unsavedModal} />
    </>
  )
}
