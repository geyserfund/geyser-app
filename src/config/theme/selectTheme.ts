import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    _hover: {
      borderColor: 'primary.400',
    },
    _active: {
      borderColor: 'primary.400',
    },
    _focus: {
      borderColor: 'primary.400',
    },
  },
})

export const selectTheme = defineMultiStyleConfig({ baseStyle })
