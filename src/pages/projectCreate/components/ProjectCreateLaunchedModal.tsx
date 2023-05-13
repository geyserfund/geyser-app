import { CheckCircleIcon } from '@chakra-ui/icons'
import { Button, ModalProps, Text, VStack } from '@chakra-ui/react'

import { Modal } from '../../../components/layouts/Modal'
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar'

export const ProjectCreateLaunchedModal = (
  props: Omit<ModalProps, 'children'>,
) => {
  return (
    <Modal
      title={
        <TitleWithProgressBar
          hideSteps
          index={1}
          length={1}
          title="Your project is live!"
          subtitle="Success!"
        />
      }
      {...props}
    >
      <VStack w="100%" spacing={6} pt={2}>
        <CheckCircleIcon fontSize="3.4em" color="primary.400" />
        <Text variant="body1">
          Now that your project is live you can add <b>Rewards</b> and{' '}
          <b>Milestones</b> and write <b>Entries</b>.
        </Text>
        <Text variant="body1">
          In the <b>Dashboard</b> you’ll be able to view the list of
          contributors and see some analytics.
        </Text>
        <Text variant="body1">
          You can always amend your project details by clicking{' '}
          <b>Edit Project</b>.
        </Text>
        <Text w="100%" variant="body1">
          Good luck!
        </Text>
        <Button w="100%" variant="secondary" onClick={props.onClose}>
          Go to project
        </Button>
      </VStack>
    </Modal>
  )
}
