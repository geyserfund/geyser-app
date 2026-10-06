import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys)

const commonActiveStyle = {
  borderColor: 'primary1.8',
  boxShadow: 'none',
  outline: 'none',
}

const baseStyle = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'neutralAlpha.7',
    borderRadius: '12px',
    _hover: commonActiveStyle,
    _active: commonActiveStyle,
    _focus: commonActiveStyle,
    _focusVisible: commonActiveStyle,
    _focusWithin: commonActiveStyle,
  },
})

export const selectTheme = defineMultiStyleConfig({ baseStyle })
