import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    bg: 'panel.solid',
    boxShadow: '0px 12px 32px -16px rgba(251, 251, 235, 0.14), 0px 12px 60px 0px rgba(0, 0, 0, 0.15);',
    border: '1px solid',
    borderColor: 'neutralAlpha.3',
    outline: 'none',
  },
})

const variants = {
  regular: {
    item: {
      bg: 'panel.solid',
      color: 'utils.text',
      borderRadius: '8px',
      _hover: {
        bg: 'primary1.9',
      },
      _active: {
        bg: 'primary1.10',
      },
      _selected: {
        bg: 'neutral1.3',
      },
      _disabled: {
        bg: 'panel.solid',
        color: 'neutralAlpha.8',
      },
    },
  },
  light: {
    item: {
      height: '32px',
      fontSize: '14px',
      bg: 'panel.solid',
      borderRadius: '8px',
      opacity: 1,
      color: 'utils.text',
      _hover: {
        bg: 'primary1.5',
        color: 'primary1.11',
      },
      _active: {
        opacity: 0.88,
        bg: 'primary1.5',
        color: 'primary1.11',
      },
      _selected: {
        bg: 'neutral1.3',
      },
      _disabled: {
        bg: 'panel.solid',
        color: 'neutralAlpha.8',
      },
    },
  },
  error: {
    item: {
      height: '32px',
      fontSize: '14px',
      bg: 'panel.solid',
      borderRadius: '8px',
      opacity: 1,
      color: 'error.11',
      _hover: {
        color: 'utils.whiteContrast',
        bg: 'error.9',
      },
      _active: {
        color: 'utils.whiteContrast',
        bg: 'error.10',
      },
      _selected: {
        bg: 'neutral1.3',
        color: 'error.11',
      },
      _disabled: {
        bg: 'panel.solid',
        color: 'neutralAlpha.8',
      },
    },
  },
  errorLight: {
    item: {
      height: '32px',
      fontSize: '14px',
      bg: 'panel.solid',
      borderRadius: '8px',
      opacity: 1,
      color: 'error.11',
      _hover: {
        bg: 'error.5',
        color: 'error.11',
      },
      _active: {
        opacity: 0.88,
        bg: 'error.5',
        color: 'error.11',
      },
      _selected: {
        bg: 'neutral1.3',
      },
      _disabled: {
        bg: 'panel.solid',
        color: 'neutralAlpha.8',
      },
    },
  },
}

const sizes = {
  sm: {
    list: {
      borderRadius: '10px',
      padding: '4px',
    },
    item: {
      height: '24px',
      fontSize: '12px',
      borderRadius: '4px',
      paddingX: '12px',
    },
  },
  md: {
    list: {
      borderRadius: '12px',
      padding: '8px',
    },
    item: {
      height: '32px',
      fontSize: '14px',
      borderRadius: '8px',
      paddingX: '12px',
    },
  },
}

export const menuTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'regular',
    size: 'md',
  },
})

// "button" | "divider" | "list" | "command" | "item" | "groupTitle"
