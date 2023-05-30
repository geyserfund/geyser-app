import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const baseStyle = definePartsStyle({
  dialog: {
    bg: 'neutral.0',
  },
})

export const modalTheme = defineMultiStyleConfig({ baseStyle })
