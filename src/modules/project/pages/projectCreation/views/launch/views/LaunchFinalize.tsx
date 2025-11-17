import { Button, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiRocket } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { LaunchSummary } from '../components/LaunchSummary.tsx'

export const LaunchFinalize = ({ handleBack }: { handleBack: () => void }) => {
  const navigate = useNavigate()
  const toast = useNotification()

  const projectPublishedModal = useModal()

  const { project } = useProjectAtom()
  const { publishProject } = useProjectAPI()

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
      await publishProject.execute({
        variables: { input: { projectId: project.id } },
        onCompleted(data) {
          if (data.projectPublish) {
            toast.success({
              title: t('Project Published!'),
              description: t('Your project is now live and available to the public'),
            })
            projectPublishedModal.onOpen()
          }
        },
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
      <Body>
        {t(
          'Your project is ready to launch! Review everything one more time and click "Launch Now" to make your project live.',
        )}
      </Body>
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
          isLoading={publishProject.loading}
          onClick={handlePublishClick}
          loadingText={t('Publishing...')}
          fontSize="lg"
          fontWeight="bold"
        >
          {t('Launch Now')}
        </Button>
      </VStack>
      <Modal title={t('Project Published!')} isOpen={projectPublishedModal.isOpen} onClose={handleCloseModal}>
        <VStack>
          <Body>{t('Your project is now live and available to the public')}</Body>
          <Button
            variant="solid"
            colorScheme="primary1"
            onClick={() => navigate(getPath('projectLaunch', project.name || ''))}
          >
            {t('Go to project')}
          </Button>
        </VStack>
      </Modal>
    </ProjectCreationPageWrapper>
  )
}
