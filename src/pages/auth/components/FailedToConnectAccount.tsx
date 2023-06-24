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
import { useTranslation } from 'react-i18next'
import { BsArrowLeft } from 'react-icons/bs'

import { Body1 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { CannotConnectAccountUrl, GeyserTelegramUrl } from '../../../constants'
import { useModal } from '../../../hooks/useModal'

interface FailedToConnectAccountProps extends ReturnType<typeof useModal> {
  title?: string
  children?: JSX.Element
}

const DEFAULT_TITLE = 'Account connection error'

export const FailedToConnectAccount = (props: FailedToConnectAccountProps) => {
  const { t } = useTranslation()

  const DefaultDescription = (
    <Body1 semiBold color="neutral.1000">
      {t(
        'This account is connected to another Geyser profile. Make sure you use a unique account. For any questions reach out to the Geyser team via',
      )}
      <ChakraLink href={GeyserTelegramUrl} isExternal>
        {' telegram.'}
      </ChakraLink>
    </Body1>
  )

  const {
    isOpen,
    onClose,
    title = DEFAULT_TITLE,
    children = DefaultDescription,
  } = props
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader>
          <Text variant="h2">{title}</Text>
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
            <Box pb={6}>{children}</Box>
            <ButtonComponent
              width="100%"
              leftIcon={<BsArrowLeft fontSize="25px" />}
              onClick={onClose}
            >
              {t('Back')}
            </ButtonComponent>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
