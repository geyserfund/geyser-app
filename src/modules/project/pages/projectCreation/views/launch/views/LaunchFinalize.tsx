import { Button, Icon, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { PiRocket } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { ProjectCreateLaunchedModal } from '@/modules/project/pages/projectView/components/ProjectCreateLaunchedModal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, LiveProjectsImageUrl } from '@/shared/constants/index.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { ProjectStatus, useProjectForStatusCheckQuery } from '@/types/index.ts'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { LaunchSummary } from '../components/LaunchSummary.tsx'

export const LaunchFinalize = ({ handleBack }: { handleBack: () => void }) => {
  const navigate = useNavigate()
  const toast = useNotification()

  const [isPublishing, setIsPublishing] = useState(false)

  const projectPublishedModal = useModal()

  const { project } = useProjectAtom()
  const { publishProject } = useProjectAPI()

  const { data } = useProjectForStatusCheckQuery({
    skip: !isPublishing,
    fetchPolicy: 'network-only',
    variables: { where: { name: project?.name } },
    pollInterval: 2000,
  })

  useEffect(() => {
    if (isPublishing && data?.projectGet?.status === ProjectStatus.Active) {
      setIsPublishing(false)
      projectPublishedModal.onOpen()
    }
  }, [data, isPublishing, projectPublishedModal])

  /** Handle publish button click */
  const handlePublishClick = async () => {
    if (!project?.id) {
      toast.error({
        title: t('Error'),
        description: t('Project not found'),
      })
      return
    }

    try {
      setIsPublishing(true)
      await publishProject.execute({
        variables: { input: { projectId: project.id } },
        onError(error) {
          toast.error({
            title: t('Publication Failed'),
            description: error.message || t('Something went wrong. Please try again.'),
          })
        },
      })
    } catch (error) {
      toast.error({
        title: t('Publication Failed'),
        description: t('Something went wrong. Please try again.'),
      })
    }
  }

  const handleBackClick = () => {
    handleBack()
  }

  const backProps = {
    onClick: handleBackClick,
  }

  const handleCloseModal = () => {
    projectPublishedModal.onClose()
    navigate(getPath('projectLaunch', project.name || ''))
  }

  return (
    <ProjectCreationPageWrapper title={t('Ready to launch!')} backButtonProps={backProps} hideContinueButton={true}>
      <VStack w="full" spacing={0}>
        <Image src={LiveProjectsImageUrl} alt={t('Launch Now')} height="200px" />
        <Body>
          {t(
            'Your project is ready to launch! Review everything one more time and click "Launch Now" to make your project live.',
          )}
        </Body>
      </VStack>

      <LaunchSummary />

      <VStack w="full" alignItems="start" spacing={8}>
        <Body>{t('Once launched, your project will be public and people can start contributing to it.')}</Body>

        <Button
          size="xl"
          width="100%"
          height="60px"
          colorScheme="primary1"
          variant="solid"
          leftIcon={<Icon as={PiRocket} fontSize="24px" />}
          isLoading={isPublishing}
          onClick={handlePublishClick}
          loadingText={t('Publishing...')}
          fontSize="lg"
          fontWeight="bold"
        >
          {t('Launch Now')}
        </Button>
      </VStack>
      <ProjectCreateLaunchedModal {...projectPublishedModal} onClose={handleCloseModal} />
    </ProjectCreationPageWrapper>
  )
}
