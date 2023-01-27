import { CloseIcon } from '@chakra-ui/icons'
import { Box, HStack, Input, InputProps, StackProps } from '@chakra-ui/react'
import React from 'react'

import { IconButtonComponent } from '../ui'

interface ProjectLinkInputProps extends StackProps {
  leftIcon: React.ReactNode
  inputProps?: InputProps
  handleClose: () => void
  value?: string
  onChange: (_: any) => void
  isError?: boolean
}

export const ProjectLinkInput = ({
  leftIcon,
  inputProps,
  handleClose,
  value,
  onChange,
  isError,
  ...rest
}: ProjectLinkInputProps) => {
  return (
    <HStack
      w="100%"
      size="md"
      padding="5px"
      backgroundColor="white"
      borderRadius="4px"
      border="1px solid"
      borderColor="brand.neutral200"
      {...rest}
    >
      <Box paddingX="12px">{leftIcon}</Box>
      <Input
        border="1px solid"
        borderRadius="4px !important"
        borderColor={'brand.neutral400'}
        backgroundColor="brand.neutral100"
        placeholder="mysite"
        value={value}
        onChange={onChange}
        isInvalid={isError}
        _focusVisible={{ borderColor: isError ? 'red' : 'brand.neutral600' }}
        {...inputProps}
      />
      <Box paddingX="10px" backgroundColor="white" border="none">
        <IconButtonComponent
          variant="ghost"
          size="sm"
          aria-label="close-icon"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButtonComponent>
      </Box>
    </HStack>
  )
}
