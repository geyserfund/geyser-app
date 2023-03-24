import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

import { NostrSvgIcon } from '../../components/icons'
import { signMessage } from '../../utils/nostr/nip07'

interface ConnectWithNostrModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ConnectWithNostr = () => {
  const onClickHandler = () => {
    signMessage('geyser.fund').then(console.log)
  }

  return (
    <>
      <Button
        w="100%"
        backgroundColor="brand.nostr"
        leftIcon={<NostrSvgIcon height="20px" width="20px" />}
        color="white"
        _hover={{}}
        onClick={() => onClickHandler()}
        isDisabled
      >
        Nostr
      </Button>
    </>
  )
}

export const ConnectWithNostrModal = ({
  isOpen,
  onClose,
}: ConnectWithNostrModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader>
          <Text fontSize="lg" fontWeight="bold">
            Connect with Nostr
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody width="100%">
          <Box
            justifyContent="center"
            alignItems="center"
            marginTop={2}
            marginLeft={2}
            marginRight={2}
          >
            Nostr Login UI HERE
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
