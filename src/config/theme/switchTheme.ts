import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    borderWidth: 1,
    borderColor: 'neutral.300',
    borderRadius: 'full',
    _checked: {
      borderColor: 'primary.400'
    }
  },
  thumb: {
    bg: 'neutral.300',
    _checked: {
      bg: 'primary.400'
    }
  },
  track: {
    p: 1,
    bg: 'neutral.00',
    _checked: {
      bg: 'neutral.00',
    },
  },
})

export const switchTheme = defineMultiStyleConfig({ baseStyle })