import {
  Box,
  BoxProps,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

interface TextInputBoxProps extends InputProps {
  error?: React.ReactNode
  warn?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  wrapperProps?: BoxProps
}

export const TextInputBox = forwardRef<HTMLInputElement, TextInputBoxProps>(
  (
    { children, error, warn, leftIcon, rightIcon, wrapperProps, ...rest },
    ref,
  ) => {
    const { t } = useTranslation()
    return (
      <Box width="100%" {...wrapperProps}>
        <InputGroup>
          {leftIcon && (
            <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
          )}
          <Input
            ref={ref}
            isInvalid={Boolean(error)}
            borderRadius="8px"
            borderWidth="2px"
            borderColor="neutral.200"
            backgroundColor="neutral.0"
            _hover={{
              borderColor: 'neutral.400',
            }}
            _focus={{ borderColor: `primary.500`, boxShadow: 'none' }}
            _placeholder={{
              color: 'neutral.400',
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
          ) : typeof error === 'boolean' ? null : (
            <Text color="secondary.red" fontSize="12px">
              {t(`${error}`)}
            </Text>
          )
        ) : null}
        {warn ? (
          typeof warn === 'object' ? (
            warn
          ) : typeof warn === 'boolean' ? null : (
            <Text color="secondary.yellow" fontSize="12px">
              {t(`${warn}`)}
            </Text>
          )
        ) : null}
      </Box>
    )
  },
)
