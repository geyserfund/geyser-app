import { Box, HStack, IconButton, Input, InputProps, StackProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { PiX } from 'react-icons/pi'

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
      backgroundColor="utils.pbg"
      borderRadius="8px"
      border="1px solid"
      borderColor="neutral1.6"
      {...rest}
    >
      <HStack justifyContent="center" width="50px">
        <LeftIcon fontSize="20px" />
      </HStack>
      <Input
        border="1px solid"
        borderRadius="4px !important"
        borderColor={'neutral1.3'}
        placeholder="https://twitter.com/halfin"
        value={value}
        onChange={onChange}
        isInvalid={isError}
        _focusVisible={{
          borderColor: isError ? 'error.9' : 'neutral1.6',
          boxShadow: !isError && `0 0 0 1px ${'neutral1.6'}`,
        }}
        {...inputProps}
      />
      <Box paddingX="5px" border="none">
        <IconButton variant="ghost" aria-label="close-icon" onClick={handleClose} icon={<PiX />} />
      </Box>
    </HStack>
  )
}
