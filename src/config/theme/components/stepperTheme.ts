import { stepperAnatomy } from '@chakra-ui/anatomy'
import { ComponentStyleConfig, createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(stepperAnatomy.keys)

const baseStyle = definePartsStyle({
  indicator: {
    '[data-status=active] &': {
      background: 'utils.pbg',
      borderColor: 'neutral1.9',
    },
    '[data-status=complete] &': {
      background: 'neutral1.9',
    },
    '[data-status=incomplete] &': {
      background: 'utils.pbg',
      '& svg': {
        display: 'none',
      },
    },
  },
  separator: {
    '[data-status=active] &': {
      background: 'neutral1.3',
    },
    '[data-status=complete] &': {
      background: 'neutral1.9',
    },
    '[data-status=incomplete] &': {
      background: 'neutral1.3',
    },
  },
})

export const stepperTheme = defineMultiStyleConfig({ baseStyle })
