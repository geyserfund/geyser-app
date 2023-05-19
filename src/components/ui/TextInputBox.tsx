import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

import { colors } from '../../styles'

const useStyles = createUseStyles({
  inputElement: {
    borderRadius: '8px',
    borderWidth: '2px',
    '&:focus': {
      borderColor: colors.normalLightGreen,
      boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
    },
  },
})

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
  const classes = useStyles()
  return (
    <Box width="100%">
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
        )}
        <Input
          isInvalid={Boolean(error)}
          className={classes.inputElement}
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
          <Text color="brand.error" fontSize="12px">
            {error}
          </Text>
        )
      ) : null}
    </Box>
  )
}
