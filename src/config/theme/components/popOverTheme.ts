import { popoverAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(popoverAnatomy.keys)

const baseStyle = definePartsStyle({
  body: {
    bg: 'utils.pbg',
    borderRadius: '8px',
  },
  content: {
    maxWidth: 'unset',
    width: 'unset',
  },
  popper: {
    maxWidth: 'unset',
    width: 'unset',
    zIndex: 11,
  },
})

export const popOverTheme = defineMultiStyleConfig({ baseStyle })
