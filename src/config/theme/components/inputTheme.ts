import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

export const defaultInputStyle = {
  borderRadius: '8px',
  borderColor: 'neutral1.5',
  backgroundColor: 'utils.surface',
  _placeholder: {
    color: 'neutral1.9',
  },
  _hover: {
    borderColor: 'neutral1.8',
  },
  _focus: {
    borderColor: 'primary1.8',
    boxShadow: 'none',
  },
  _focusVisible: {
    borderColor: 'primary1.8',
    boxShadow: 'none',
  },
}

export const inputTheme = defineMultiStyleConfig({
  variants: {
    outline: {
      field: defaultInputStyle,
    },
  },
  defaultProps: {
    variant: 'outline',
  },
})
