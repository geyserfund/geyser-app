import { Avatar, HStack, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '@/components/ui/Loader.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { ProjectStoryForm } from '@/modules/project/forms/ProjectStoryForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath, ProjectValidations } from '@/shared/constants/index.ts'
import { MarkdownField } from '@/shared/markdown/MarkdownField.tsx'
import { useNotification } from '@/utils'

import { useProjectStoryForm } from '../hooks/useProjectStoryForm.tsx'
import { ProjectCreationLayout } from '../Layouts/ProjectCreationLayout.tsx'

export const LaunchAboutYou = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useNotification()

  const { user } = useAuthContext()

  const [aboutYou, setAboutYou] = useState(user.bio)

  useEffect(() => {
    setAboutYou(user.bio)
  }, [user.bio])

  const { isOpen: isEditorMode, onToggle: toggleEditorMode } = useDisclosure()

  const params = useParams<{ projectId: string }>()

  const { project, loading } = useProjectAtom()

  const { updateProject } = useProjectAPI()

  const form = useProjectStoryForm({ project })

  const onLeave = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectDetails', project?.id))
  }

  const onBackCLick = () => {
    onLeave()
  }

  const onSubmit = async ({ description }: { description: string }) => {
    if (project.description === description) {
      navigate(getPath('launchAboutYou', project?.id))
      return
    }

    updateProject.execute({
      variables: {
        input: { projectId: params.projectId, description },
      },
      onCompleted() {
        navigate(getPath('launchAboutYou', project?.id))
      },
      onError(error) {
        toast.error({
          title: 'failed to update project story',
          description: `${error}`,
        })
      },
    })
  }

  const continueProps = {
    type: 'submit' as const,
    isDisabled: loading || updateProject.loading,
  }

  const backProps = {
    onClick: onBackCLick,
  }

  if (loading) {
    return <Loader />
  }

  return (
    <ProjectCreationLayout title={t('About you')} continueButtonProps={continueProps} backButtonProps={backProps}>
      <FieldContainer
        title={t('Tell contributors more about yourself')}
        subtitle={t(
          'Building trust with your contributors is one of the most important aspects of a successful project. Tell contributors a bit more about yourself. This information will show on your project page and profile.',
        )}
        error={form.formState.errors.description?.message}
      >
        <VStack
          w="full"
          h="full"
          border="1px solid"
          borderColor="neutral1.6"
          borderRadius="8px"
          overflow="hidden"
          gap={4}
          padding={4}
        >
          <HStack w="full">
            <Avatar size="xs" src={user?.imageUrl || ''} />
            <Body light>{user?.username}</Body>
          </HStack>

          <Textarea
            padding={0}
            border="none"
            placeholder={t('Write a bit more about yourself')}
            value={aboutYou || ''}
            onChange={(e) => setAboutYou(e.target.value)}
          />
        </VStack>
      </FieldContainer>
    </ProjectCreationLayout>
  )
}
