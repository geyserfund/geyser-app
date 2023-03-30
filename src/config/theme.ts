import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'

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
      variants: {
        outlined: {
          border: `2px solid`,
          borderColor: colors.neutral200,
          color: colors.neutral900,
          fontSize: '16px',
          padding: '2px 5px',
          _hover: {
            borderColor: colors.neutral400,
          },
          _active: {
            backgroundColor: colors.neutral200,
          },
        },
        hugeContained: {
          background: colors.primary400,
          width: '100%',
          borderRadius: '8px',
          padding: '10px 30px',
          fontSize: '22px',
          color: colors.neutral800,
          textTransform: 'uppercase',
          fontFamily: fonts.livvic,
          fontWeight: 700,
        },
      },
    },
    Text: {
      baseStyle: {
        fontSize: '14px',
      },
      variants: {
        h3: () => ({
          fontWeight: 600,
          fontSize: '18px',
          lineHeight: 1.4,
        }),
        h2: () => ({
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: 1.4,
        }),
        body1: ({ theme }: StyleFunctionProps) => ({
          fontWeight: 500,
          lineHeight: 1.6,
          fontSize: '16px',
          color: theme.colors.neutral[600],
        }),
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
        primary: ({ colorScheme = 'primary' }: StyleFunctionProps) => ({
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
