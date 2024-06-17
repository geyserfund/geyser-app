import { CheckCircleIcon } from '@chakra-ui/icons'
import { Button, ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { Modal } from '../../../../../shared/components/layouts'
import { Body } from '../../../../../shared/components/typography'

export const ProjectCreateDraftModal = (props: Omit<ModalProps, 'children'>) => {
  const { t } = useTranslation()
  return (
    <Modal
      title={
        <TitleWithProgressBar
          hideSteps
          index={1}
          length={1}
          title={t('Your project is in draft')}
          subtitle={t('Saved in draft')}
        />
      }
      {...props}
    >
      <VStack w="100%" spacing={6} pt={2}>
        <CheckCircleIcon fontSize="3.4em" color="primary1.9" />
        <Body>{t("By keeping your project in 'draft', it will remain hidden until you decide to launch it")}</Body>
        <Button w="100%" variant="secondary" onClick={props.onClose}>
          {t('Go to project')}
        </Button>
      </VStack>
    </Modal>
  )
}
