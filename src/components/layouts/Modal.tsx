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

export interface CustomModalProps extends ModalProps {
  title?: ReactNode
  contentProps?: ModalContentProps
  noClose?: boolean
}

export const Modal = ({
  children,
  title,
  contentProps,
  noClose,
  ...props
}: CustomModalProps) => {
  return (
    <ChakraModal isCentered size="sm" {...props}>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow={0} {...contentProps}>
        <Box borderRadius="8px" bg="neutral.0" pb={3}>
          {title && <ModalHeader pb={2}>{title}</ModalHeader>}
          {!noClose && <ModalCloseButton />}
          <ModalBody>{children}</ModalBody>
        </Box>
      </ModalContent>
    </ChakraModal>
  )
}
