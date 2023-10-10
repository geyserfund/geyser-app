import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const baseStyle = definePartsStyle({
  dialog: {
    bg: 'neutral.0',
  },
  overlay: {
    bg: 'blackAlpha.300',
    backdropFilter: 'blur(10px)',
    _dark: {
      bg: 'whiteAlpha.300',
    },
  },
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    transparentBackdrop: {
      overlay: {
        bg: 'transparent !important',
        backdropFilter: 'none',
      },
    },
    blurryBackdrop: {
      overlay: {
        bg: 'blackAlpha.100',
        backdropFilter: 'blur(0px)',
        _dark: {
          bg: 'whiteAlpha.100',
        },
      },
    },
  },
})
