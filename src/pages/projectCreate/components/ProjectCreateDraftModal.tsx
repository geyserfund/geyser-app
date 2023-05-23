import { CheckCircleIcon } from '@chakra-ui/icons'
import { Button, ModalProps, Text, VStack } from '@chakra-ui/react'

import { Modal } from '../../../components/layouts/Modal'
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar'

export const ProjectCreateDraftModal = (
  props: Omit<ModalProps, 'children'>,
) => {
  return (
    <Modal
      title={
        <TitleWithProgressBar
          hideSteps
          index={1}
          length={1}
          title="Your project is in draft"
          subtitle="Saved in draft"
        />
      }
      {...props}
    >
      <VStack w="100%" spacing={6} pt={2}>
        <CheckCircleIcon fontSize="3.4em" color="primary.400" />
        <Text variant="body1">
          Your project information is saved and ready for you to edit. Feel free
          to launch your project when you’re ready!
        </Text>
        <Button w="100%" variant="secondary" onClick={props.onClose}>
          Go to project
        </Button>
      </VStack>
    </Modal>
  )
}
