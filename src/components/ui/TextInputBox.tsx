import { Box, Input, InputProps, Text } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

import { colors } from '../../styles'

const useStyles = createUseStyles({
  inputElement: {
    borderWidth: '2px',
    '&:focus': {
      borderColor: colors.normalLightGreen,
      boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
    },
  },
})

type Props = InputProps & {
  error?: React.ReactNode
}

export const TextInputBox = ({ children, error, ...rest }: Props) => {
  const classes = useStyles()
  return (
    <Box width="100%">
      <Input
        isInvalid={Boolean(error)}
        className={classes.inputElement}
        {...rest}
      >
        {children}
      </Input>

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
