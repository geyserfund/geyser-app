import { Box, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'

import { AddSponsorUrl } from '../../constants'
import { ButtonComponent, UndecoratedLink } from '../ui'

interface IConnectTwitter {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export const AddSponsor = ({ isOpen, onClose }: IConnectTwitter) => {
  const useTitle = 'Become a sponsor'
  const useDescription =
    'Interested in sponsoring this project? Click continue to let us know your details and we can quickly add you as a sponsor.'

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="neutral.0"
        display="flex"
        alignItems="center"
        padding="20px 15px"
      >
        <ModalHeader>
          <Text fontSize="16px" fontWeight="normal">
            {useTitle}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{useDescription}</Text>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <UndecoratedLink href={AddSponsorUrl} isExternal>
              <ButtonComponent margin="10px" w="full" primary standard>
                Continue
              </ButtonComponent>
            </UndecoratedLink>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
