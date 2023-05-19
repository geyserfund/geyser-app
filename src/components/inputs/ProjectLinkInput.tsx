import { CloseIcon } from '@chakra-ui/icons'
import { Box, HStack, Input, InputProps, StackProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

import { colors } from '../../styles'
import { IconButtonComponent } from '../ui'

interface ProjectLinkInputProps extends StackProps {
  leftIcon: IconType
  inputProps?: InputProps
  handleClose: () => void
  value?: string
  onChange: (_: any) => void
  isError?: boolean
}

export const ProjectLinkInput = ({
  leftIcon: LeftIcon,
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
      padding="12px 5px"
      backgroundColor="white"
      borderRadius="8px"
      border="1px solid"
      borderColor="neutral.400"
      {...rest}
    >
      <HStack justifyContent="center" width="50px">
        <LeftIcon fontSize="20px" />
      </HStack>
      <Input
        border="1px solid"
        borderRadius="4px !important"
        borderColor={'neutral.400'}
        placeholder="https://twitter.com/halfin"
        value={value}
        onChange={onChange}
        isInvalid={isError}
        _focusVisible={{
          borderColor: isError ? 'red' : colors.normalLightGreen,
          boxShadow: !isError && `0 0 0 1px ${colors.normalLightGreen}`,
        }}
        {...inputProps}
      />
      <Box paddingX="5px" backgroundColor="white" border="none">
        <IconButtonComponent
          noBorder
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
