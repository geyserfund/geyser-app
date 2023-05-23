import {
  Box,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends ModalProps {
  title?: ReactNode
}

export const Modal = ({ children, title, ...props }: Props) => {
  return (
    <ChakraModal isCentered {...props} size="sm">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent bg="transparent" boxShadow={0}>
        <Box borderRadius="8px" bg="neutral.0" pb={3}>
          {title && <ModalHeader pb={2}>{title}</ModalHeader>}
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </Box>
      </ModalContent>
    </ChakraModal>
  )
}
