import { drawerAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(drawerAnatomy.keys)

const baseStyle = definePartsStyle({
  dialog: {
    bg: 'utils.pbg',
  },
  overlay: {
    bg: 'blackAlpha.300',
    backdropFilter: 'blur(10px)',
    _dark: {
      bg: 'whiteAlpha.300',
    },
  },
})

export const drawerTheme = defineMultiStyleConfig({ baseStyle })
