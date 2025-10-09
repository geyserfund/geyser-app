import { Button, Image, ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DraftIllustrationUrl } from '@/shared/constants/index.ts'

import { Modal } from '../../../../../shared/components/layouts'
import { Body } from '../../../../../shared/components/typography'

export const ProjectCreateDraftModal = (props: Omit<ModalProps, 'children'>) => {
  const { t } = useTranslation()
  return (
    <Modal title={t('Your project is in draft')} {...props}>
      <VStack w="100%" spacing={6} pt={2}>
        <Image src={DraftIllustrationUrl} alt="Draft illustration" height="160px" />
        <Body>{t('Your project will remain hidden until you decide to launch it.')}</Body>
        <Button size="lg" w="100%" variant="outline" colorScheme="neutral1" onClick={props.onClose}>
          {t('Go to project')}
        </Button>
      </VStack>
    </Modal>
  )
}
