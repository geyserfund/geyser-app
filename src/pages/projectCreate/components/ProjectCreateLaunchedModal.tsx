import { CheckCircleIcon } from '@chakra-ui/icons'
import { Button, ModalProps, Text, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

import { Modal } from '../../../components/layouts/Modal'
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar'

export const ProjectCreateLaunchedModal = (
  props: Omit<ModalProps, 'children'>,
) => {
  const { t } = useTranslation()
  return (
    <Modal
      title={
        <TitleWithProgressBar
          hideSteps
          index={1}
          length={1}
          title={t('Your project is live!')}
          subtitle={`${t('Success')}!`}
        />
      }
      {...props}
    >
      <VStack w="100%" spacing={6} pt={2}>
        <CheckCircleIcon fontSize="3.4em" color="primary.400" />
        <Text variant="body1">
          <Trans
            i18nKey={
              'Now that your project is live you can add <1>Rewards</1> and <1>Milestones</1> and write <1>Entries</1>'
            }
          >
            Now that your project is live you can add <b>Rewards</b> and
            <b>Milestones</b> and write <b>Entries</b>.
          </Trans>
        </Text>
        <Text variant="body1">
          <Trans
            i18nKey={
              'In the <1>Dashboard</1> you’ll be able to view the list of contributors and see some analytics.'
            }
          >
            In the <b>Dashboard</b> you’ll be able to view the list of
            contributors and see some analytics.
          </Trans>
        </Text>
        <Text variant="body1">
          <Trans
            i18nKey={
              'You can always amend your project details by clicking <1>Edit Project</1>.'
            }
          >
            You can always amend your project details by clicking{' '}
            <b>Edit Project</b>.
          </Trans>
        </Text>
        <Text w="100%" variant="body1">
          {t('Good luck!')}
        </Text>
        <Button w="100%" variant="secondary" onClick={props.onClose}>
          {t('Go to project')}
        </Button>
      </VStack>
    </Modal>
  )
}
