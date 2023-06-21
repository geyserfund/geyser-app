import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    bg: 'neutral.100',
  },
  icon: {
    color: 'neutral.300',
  },
  description: {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: 1.4,
    color: 'neutral.900',
  },
})

export const alertTheme = defineMultiStyleConfig({ baseStyle })
