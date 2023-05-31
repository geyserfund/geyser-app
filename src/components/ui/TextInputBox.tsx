import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react'

interface TextInputBoxProps extends InputProps {
  error?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const TextInputBox = ({
  children,
  error,
  leftIcon,
  rightIcon,
  ...rest
}: TextInputBoxProps) => {
  return (
    <Box width="100%">
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
        )}
        <Input
          isInvalid={Boolean(error)}
          borderRadius="8px"
          borderWidth="2px"
          borderColor="neutral.200"
          backgroundColor="neutral.0"
          _hover={{
            borderColor: 'neutral.400',
          }}
          _focus={{ borderColor: `neutral.500`, boxShadow: 'none' }}
          _placeholder={{
            color: 'neutral.600',
          }}
          {...rest}
        >
          {children}
        </Input>
        {rightIcon && (
          <InputRightElement pointerEvents="none">
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>
      {error ? (
        typeof error === 'object' ? (
          error
        ) : (
          <Text color="secondary.red" fontSize="12px">
            {error}
          </Text>
        )
      ) : null}
    </Box>
  )
}
