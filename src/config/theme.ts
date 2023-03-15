import { extendTheme } from '@chakra-ui/react'

import { colors, fonts, neutralColors, primaryColors } from '../styles'

export const theme = extendTheme({
  initialColorMode: 'light',
  colors: {
    brand: {
      ...colors,
    },
    neutral: neutralColors,
    primary: primaryColors,
  },
  fonts: {
    heading: fonts.brand,
    body: fonts.brand,
    default: fonts.brand,
  },
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'normal', // Normally, it is "semibold"
        height: '200px',
      },
    },
    Text: {
      baseStyle: {
        fontSize: '14px',
      },
    },
    Divider: {
      variant: {
        lg: {
          borderBottomWidth: '2px',
          borderColor: 'rgba(196, 196, 196, 0.4)',
        },
      },
    },
    Radio: {
      variants: {
        primary: ({ colorScheme = 'primary' }) => ({
          color: `brand.${colorScheme}400`,
          control: {
            _checked: {
              color: `brand.${colorScheme}400`,
              _before: {
                width: '90%',
                height: '90%',
              },
            },
            _before: {
              width: '90%',
              height: '90%',
            },
            _focus: {
              ring: 2,
              ringColor: `brand.${colorScheme}500`,
            },
          },
        }),
      },
      defaultProps: {
        variant: 'primary',
        colorScheme: 'primary',
      },
    },
  },
})
