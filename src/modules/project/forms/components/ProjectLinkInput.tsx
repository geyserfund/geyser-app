import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { PiX } from 'react-icons/pi'

interface ProjectLinkInputProps extends InputGroupProps {
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
    <InputGroup w="full" backgroundColor="utils.pbg" {...rest}>
      <InputLeftElement>
        <Icon as={LeftIcon} fontSize="20px" />
      </InputLeftElement>
      <Input
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
      <InputRightElement>
        <IconButton
          size="md"
          variant="ghost"
          colorScheme="error"
          aria-label="close-icon"
          color="utils.text"
          onClick={handleClose}
          icon={<Icon as={PiX} />}
        />
      </InputRightElement>
    </InputGroup>
  )
}
