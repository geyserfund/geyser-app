import { stepperAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(stepperAnatomy.keys)

const baseStyle = definePartsStyle({
  indicator: {
    '[data-status=active] &': {
      background: 'utils.pbg',
      borderColor: 'primary1.9',
    },
    '[data-status=complete] &': {
      background: 'primary1.9',
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
      background: 'neutral1.6',
    },
    '[data-status=complete] &': {
      background: 'primary1.9',
    },
    '[data-status=incomplete] &': {
      background: 'neutral1.6',
    },
  },
})

export const stepperTheme = defineMultiStyleConfig({ baseStyle })
