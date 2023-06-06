import { drawerAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(drawerAnatomy.keys)

const baseStyle = definePartsStyle({
  dialog: {
    bg: 'neutral.0',
  },
})

export const drawerTheme = defineMultiStyleConfig({ baseStyle })
