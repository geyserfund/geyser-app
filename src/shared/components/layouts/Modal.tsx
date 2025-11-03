import {
  Box,
  BoxProps,
  IconButton,
  Modal as ChakraModal,
  ModalBody,
  ModalBodyProps,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalHeaderProps,
  ModalOverlay,
  ModalProps,
  VStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { PiX } from 'react-icons/pi'

import { standardPadding } from '@/shared/styles'

import { Body, BodyProps } from '../typography/Body.tsx'

export interface CustomModalProps extends ModalProps {
  title?: ReactNode
  subtitle?: ReactNode
  contentProps?: ModalContentProps
  bodyProps?: ModalBodyProps
  noClose?: boolean
  headerProps?: ModalHeaderProps
  subtitleProps?: BodyProps
  wrapperProps?: BoxProps
}

export const Modal = ({
  children,
  title,
  subtitle,
  contentProps,
  bodyProps,
  noClose,
  headerProps,
  subtitleProps,
  wrapperProps,
  ...props
}: CustomModalProps) => {
  return (
    <ChakraModal isCentered size="sm" {...props}>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow={0} {...contentProps}>
        <Box borderRadius="12px" bg="utils.pbg" paddingY={6} {...wrapperProps}>
          <VStack
            pb={3}
            spacing={0}
            w="full"
            alignItems="flex-start"
            paddingLeft={standardPadding}
            paddingRight={noClose ? standardPadding : { base: 9, lg: 12 }}
          >
            {title && (
              <ModalHeader padding={0} {...headerProps}>
                {title}
              </ModalHeader>
            )}
            {subtitle && <Body {...subtitleProps}>{subtitle}</Body>}
          </VStack>

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
          <ModalBody as={VStack} paddingY={0} paddingX={standardPadding} {...bodyProps}>
            {children}
          </ModalBody>
        </Box>
      </ModalContent>
    </ChakraModal>
  )
}
