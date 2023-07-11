import {
  Box,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends ModalProps {
  title?: ReactNode
  contentProps?: ModalContentProps
}

export const Modal = ({ children, title, contentProps, ...props }: Props) => {
  return (
    <ChakraModal isCentered size="sm" {...props}>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow={0} {...contentProps}>
        <Box borderRadius="8px" bg="neutral.0" pb={3}>
          {title && <ModalHeader pb={2}>{title}</ModalHeader>}
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </Box>
      </ModalContent>
    </ChakraModal>
  )
}
