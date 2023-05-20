import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsXLg } from 'react-icons/bs'

import { Body2 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'

interface IDeleteConfirmModal {
  isOpen: boolean
  onClose: () => void
  confirm: () => any
  isLoading?: boolean
  isNostr?: boolean
}

export const RemoveExternalAccountModal = ({
  isOpen,
  onClose,
  confirm,
  isLoading,
  isNostr,
}: IDeleteConfirmModal) => (
  <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
    <ModalOverlay />
    <ModalContent display="flex" alignItems="center" padding="10px">
      <ModalHeader w="full" justifyContent="start">
        <Text fontSize="22px" fontWeight={600}>
          Disconnect account
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack width="100%" spacing="30px">
          <HStack
            height="60px"
            width="60px"
            justifyContent="center"
            alignItems="center"
            backgroundColor="secondary.red"
            rounded="full"
          >
            <BsXLg color="white" fontSize="40px" />
          </HStack>
          {isNostr && (
            <Body2 semiBold wordBreak="break-word">
              By disconnecting this Nostr account from your Geyser profile you
              will be able to connect a different Nostr account. However, you
              will be unable to create a new Geyser profile with this existing
              Nostr account.
            </Body2>
          )}
          <Body2 semiBold wordBreak="break-word" alignSelf="start">
            {`${
              isNostr ? 'Your badges are connected to this Nostr account.' : ''
            } Are you sure you want to disconnect this account?`}
          </Body2>
          <HStack width="100%" justifyContent="space-between" spacing="20px">
            <ButtonComponent w="full" onClick={onClose}>
              Cancel
            </ButtonComponent>
            <Button
              variant="danger"
              w="full"
              onClick={confirm}
              isLoading={isLoading}
            >
              Disconnect
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
)
