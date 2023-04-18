import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { CardLayout } from '../../../../components/layouts'
import { AuthModal } from '../../../../components/molecules'
import { Body1, H3 } from '../../../../components/typography'
import { UndecoratedLink } from '../../../../components/ui'
import { LockedConnectAccountUrl } from '../../../../constants'
import { useAuthContext } from '../../../../context'
import { ConnectWithNostr } from '../../../auth/ConnectWithNostr'
import { ConnectWithTwitter } from '../../../auth/ConnectWithTwitter'

export const GrantApply = () => {
  return (
    <CardLayout w="full" p="20px" alignItems="center">
      <H3 alignSelf="start">Apply</H3>
      <Body1 alignSelf="start">
        {
          "Apply to be part of the 'Bitcoin Gaming Grant' community-voting grant."
        }
      </Body1>
      <ApplyGrant />
    </CardLayout>
  )
}

export const ApplyGrant = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button variant="primary" onClick={onOpen}>
        APPLY
      </Button>
      <ApplyGrantModal {...{ isOpen, onOpen, onClose }} />
    </>
  )
}

interface ApplyGrantModalProps {
  onOpen: () => void
  isOpen: boolean
  onClose: () => void
}

export const ApplyGrantModal = ({
  onOpen,
  isOpen,
  onClose,
}: ApplyGrantModalProps) => {
  const { isLoggedIn } = useAuthContext()

  const getModalTitle = () => {
    if (!isLoggedIn) {
      return 'Login to apply'
    }
  }

  const getModalContent = () => {
    if (!isLoggedIn) {
      return <LoginForGrant />
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader alignSelf="start">
          <H3>{getModalTitle()}</H3>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={VStack} spacing="20px" alignItems="center">
          {getModalContent()}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export const LoginForGrant = () => {
  return (
    <>
      <Image src={LockedConnectAccountUrl} maxWidth="200px" />
      <Body1>To apply to a grant you need to first login into Geyser.</Body1>
      <VStack>
        <ConnectWithTwitter />
        <ConnectWithNostr />
      </VStack>
    </>
  )
}
