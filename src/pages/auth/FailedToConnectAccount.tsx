import {
  Box,
  Image,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsArrowLeft } from 'react-icons/bs'

import { Body1 } from '../../components/typography'
import { ButtonComponent } from '../../components/ui'
import { CannotConnectAccountUrl } from '../../constants'

interface FailedToConnectAccountProps {
  isOpen: boolean
  onClose: () => void
}

export const FailedToConnectAccount = ({
  isOpen,
  onClose,
}: FailedToConnectAccountProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader>
          <Text fontSize="lg" fontWeight="bold">
            Account connection error
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody width="100%">
          <VStack w="full" padding="12px" spacing="20px">
            <Box width="200px">
              <Image
                w="full"
                h="auto"
                alt="feed-logged-out"
                src={CannotConnectAccountUrl}
              />
            </Box>
            <Body1 semiBold color="black">
              This account is connected to another Geyser profile. Make sure you
              use a unique account. For any questions reach out to the Geyser
              team at
              <ChakraLink href="mailto: hello@geyser.fund" isExternal>
                hello@geyser.fund
              </ChakraLink>
            </Body1>
            <ButtonComponent
              width="full"
              maxWidth="200px"
              leftIcon={<BsArrowLeft fontSize="25px" />}
              onClick={onClose}
            >
              Go back
            </ButtonComponent>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
