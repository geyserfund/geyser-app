import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    backgroundColor: 'panel.solid',
    border: '1px solid',
    borderColor: 'neutral1.3',
    outline: 'none',
    padding: '16px',
    zIndex: '99',
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
        color: 'utils.blackContrast',
      },
      _active: {
        bg: 'primary1.10',
        color: 'utils.blackContrast',
      },
      _selected: {
        bg: 'neutral1.3',
        color: 'utils.blackContrast',
      },
      _disabled: {
        bg: 'panel.solid',
        color: 'neutral1.8',
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
        color: 'neutral1.8',
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
        color: 'neutral1.8',
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
        color: 'neutral1.8',
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
