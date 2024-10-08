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
  ({ children, error, warn, leftIcon, rightIcon, wrapperProps, ...rest }, ref) => {
    const { t } = useTranslation()
    return (
      <Box width="100%" {...wrapperProps}>
        <InputGroup>
          {leftIcon && <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>}
          <Input ref={ref} isInvalid={Boolean(error)} {...rest}>
            {children}
          </Input>
          {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
        </InputGroup>
        {error ? (
          typeof error === 'object' ? (
            error
          ) : typeof error === 'boolean' ? null : (
            <Text color="error.9" fontSize="12px">
              {t(`${error}`)}
            </Text>
          )
        ) : null}
        {warn ? (
          typeof warn === 'object' ? (
            warn
          ) : typeof warn === 'boolean' ? null : (
            <Text color="warning.9" fontSize="12px">
              {t(`${warn}`)}
            </Text>
          )
        ) : null}
      </Box>
    )
  },
)
