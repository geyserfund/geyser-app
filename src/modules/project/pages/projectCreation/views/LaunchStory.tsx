import { useDisclosure, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import Loader from '@/components/ui/Loader.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, ProjectValidations } from '@/shared/constants/index.ts'
import { MarkdownField } from '@/shared/markdown/MarkdownField.tsx'
import { ProjectCreationStep } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../hooks/useIsStepAhead.tsx'
import { useProjectStoryForm } from '../hooks/useProjectStoryForm.tsx'

export const LaunchStory = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { isOpen: isEditorMode, onToggle: toggleEditorMode } = useDisclosure()

  const { project, loading } = useProjectAtom()

  const { updateProjectWithLastCreationStep, loading: updateProjectLoading } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.Story,
    getPath('launchAboutYou', project.id),
  )

  const form = useProjectStoryForm({ project })

  const onLeave = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectRewards', project?.id))
  }

  const onBackCLick = () => {
    onLeave()
  }

  const onSubmit = async ({ description }: { description: string }) => {
    if (project.description === description) {
      updateProjectWithLastCreationStep()
      return
    }

    updateProjectWithLastCreationStep({
      description,
    })
  }

  const continueProps = {
    type: 'submit' as const,
    isDisabled: loading || updateProjectLoading,
  }

  const backProps = {
    onClick: onBackCLick,
  }

  if (loading) {
    return <Loader />
  }

  return (
    <form style={{ minHeight: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
      <ProjectCreationPageWrapper
        title={t('Tell your story')}
        continueButtonProps={continueProps}
        backButtonProps={backProps}
      >
        <FieldContainer error={form.formState.errors.description?.message} gap={2}>
          <Body>
            {t(
              'Explain in more detail what you are doing with this project. The more detailed the better. Keep it personal and authentic. Why does this project matter to you?',
            )}
          </Body>
          <VStack
            flexDirection={'column-reverse'}
            justifyContent="space-between"
            flex={1}
            width="100%"
            border="1px solid"
            borderColor="neutral1.6"
            borderRadius="8px"
            overflow="hidden"
            paddingTop={3}
            backgroundColor="utils.pbg"
          >
            <MarkdownField
              initialContent={() => form.watch('description') || ''}
              content={form.watch('description') || ''}
              name="description"
              placeholder={t('Describe your product in detail - features, specifications, and benefits.')}
              flex
              noFloatingToolbar
              control={form.control}
              isEditorMode={isEditorMode}
              toggleEditorMode={toggleEditorMode}
              toolbarWrapperProps={{
                borderBottom: 'none',
                borderRight: 'none',
                borderLeft: 'none',
                borderRadius: 0,
                marginBottom: 0,
                overflowX: 'auto',
              }}
              toolbarMaxWidth={'100%'}
              enableRawMode
              editorWrapperProps={{
                paddingX: '16px',
                minHeight: '40vh',
              }}
              markdownRawEditorProps={{
                minHeight: '40vh',
                padding: '0px 16px',
              }}
            />
          </VStack>
          <Body w="full" size="xs" light flexGrow={1} textAlign="right">
            <span>{form.watch('description').length}</span>/<span>{ProjectValidations.description.maxLength}</span>
          </Body>
        </FieldContainer>
      </ProjectCreationPageWrapper>
    </form>
  )
}
