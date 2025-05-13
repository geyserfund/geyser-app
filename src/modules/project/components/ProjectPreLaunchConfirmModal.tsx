import { Button, Image, ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { LaunchpadCountdownIllustrationUrl } from '@/shared/constants/index.ts'

import { Modal } from '../../../shared/components/layouts'

interface ProjectLaunchConfirmModalProps extends Omit<ModalProps, 'children'> {
  isLoading: boolean
  onLaunchClick: () => void
}

export const ProjectPreLaunchConfirmModal = ({
  isLoading,
  onLaunchClick,
  ...confirmModal
}: ProjectLaunchConfirmModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal {...confirmModal} title={t('Confirm project launch')} bodyProps={{ as: VStack, gap: 4 }}>
      <Image src={LaunchpadCountdownIllustrationUrl} alt="Launchpad countdown illustration" height="160px" />
      <VStack spacing="20px">
        <Body light>
          {t(
            'Once you launch your project, it will become visible and searchable by the public. A 7-day countdown will begin immediately.',
          )}
        </Body>
        <Body light>{t('If you’re not ready to launch we recommend you place your project in Draft mode. ')}</Body>
        <Button variant="solid" colorScheme="primary1" w="full" onClick={onLaunchClick} isLoading={isLoading}>
          {t('Launch & Start Countdown')}
        </Button>
      </VStack>
    </Modal>
  )
}
