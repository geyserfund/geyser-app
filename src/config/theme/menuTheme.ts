import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    bg: 'neutral.0',
  },
  item: {
    bg: 'neutral.0',
    _hover: {
      bg: 'neutral.200',
    },
  },
})

export const menuTheme = defineMultiStyleConfig({ baseStyle })
