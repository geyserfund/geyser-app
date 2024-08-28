import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    borderWidth: 1,
    borderColor: 'neutral1.7',
    borderRadius: 'full',
    padding: 0,
    _checked: {
      borderColor: 'primary1.7',
    },
  },
  thumb: {
    bg: 'utils.pbg',
    borderColor: 'neutral1.8',
    _checked: {
      borderColor: 'primary1.7',
    },
  },
  track: {
    padding: 0,
    bg: 'neutral1.4',
    _checked: {
      bg: 'primary1.10',
    },
  },
})

export const switchTheme = defineMultiStyleConfig({ baseStyle })
