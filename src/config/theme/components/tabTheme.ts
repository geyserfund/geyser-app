import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const baseStyle = definePartsStyle({
  tablist: {
    color: 'neutral1.9',
  },
  tab: {
    _selected: {
      color: 'utils.text',
      borderColor: 'primary1.10 !important',
    },
  },
})

export const tabTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    secondary: {
      tab: {
        bg: 'utils.pbg',
        variant: 'outline',
        borderRadius: '8px',
        border: '2px solid',
        borderColor: 'neutral1.2',
        p: '10px 20px',
        _selected: {
          bg: 'neutral.0',
          borderColor: 'neutral1.4',
        },
        _hover: {
          bg: 'neutral.50',
          borderColor: 'neutral1.4',
        },
      },
    },
  },
})
