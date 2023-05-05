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
        fontWeight: 500,
        fontFamily: fonts.inter,
      },
      sizes: {
        xl: {
          padding: '10px 30px',
          fontSize: '22px',
          fontWeight: 700,
        },
      },
      variants: {
        primary: {
          borderRadius: '8px',
          backgroundColor: colors.primary,
          color: 'black',
          fontWeight: 'medium',
          minWidth: '220px',
          _hover: {
            backgroundColor: colors.primary500,
          },
        },
        danger: {
          backgroundColor: colors.secondaryRed,
          color: 'white',
          _hover: {
            backgroundColor: colors.secondaryRedDark,
          },
        },
        transparent: {
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: 'transparent',
          _hover: {
            borderColor: colors.neutral900,
          },
          _active: {
            backgroundColor: colors.neutral900,
          },
        },
        containedClear: {
          border: `2px solid`,
          borderColor: colors.neutral200,
          color: colors.neutral900,
          fontSize: '16px',
          padding: '8px 20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          _hover: {
            borderColor: colors.neutral400,
          },
          _active: {
            backgroundColor: colors.neutral200,
          },
        },
        contained: {
          background: colors.primary400,
          borderRadius: '8px',
          padding: '8px 20px',
          color: colors.neutral800,
          _hover: {
            background: colors.primary500,
          },
        },
      },
    },
    Text: {
      baseStyle: {
        fontSize: '14px',
      },
      variants: {
        caption: () => ({
          fontSize: '10px',
          fontWeight: 700,
        }),
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
    Link: {
      baseStyle: {
        textDecoration: 'underline',
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
