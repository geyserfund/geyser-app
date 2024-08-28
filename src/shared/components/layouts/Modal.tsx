import {
  Box,
  IconButton,
  Modal as ChakraModal,
  ModalBody,
  ModalBodyProps,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { PiX } from 'react-icons/pi'

import { standardPadding } from '@/shared/styles'

export interface CustomModalProps extends ModalProps {
  title?: ReactNode
  contentProps?: ModalContentProps
  bodyProps?: ModalBodyProps
  noClose?: boolean
}

export const Modal = ({ children, title, contentProps, bodyProps, noClose, ...props }: CustomModalProps) => {
  return (
    <ChakraModal isCentered size="sm" {...props}>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow={0} {...contentProps}>
        <Box borderRadius="12px" bg="utils.pbg" paddingY={6}>
          {title && (
            <ModalHeader pt={0} pb={3} px={standardPadding}>
              {title}
            </ModalHeader>
          )}
          {!noClose && (
            <ModalCloseButton padding="0" size="sm" top={6} right={{ base: 3, lg: 6 }}>
              <IconButton
                size="sm"
                aria-label="modal-close-icon"
                as="div"
                icon={<PiX />}
                variant="outline"
                colorScheme="neutral1"
              />
            </ModalCloseButton>
          )}
          <ModalBody paddingY={0} paddingX={standardPadding} {...bodyProps}>
            {children}
          </ModalBody>
        </Box>
      </ModalContent>
    </ChakraModal>
  )
}
