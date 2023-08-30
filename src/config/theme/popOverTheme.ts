import { popoverAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(popoverAnatomy.keys)

const baseStyle = definePartsStyle({
  body: {
    bg: 'neutral.0',
    borderRadius: '8px',
  },
})

export const popOverTheme = defineMultiStyleConfig({ baseStyle })
