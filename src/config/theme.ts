import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'

import { colors, fonts } from '../styles'

export const theme = extendTheme({
  initialColorMode: 'light',
  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '57em', // Desktop ~900px
    xl: '80em', // 1280px
    '2xl': '96em', // 1536px
  },
  colors: {
    brand: {
      ...colors,
    },
    // neutral: neutralColors,
    // primary: primaryColors,
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
        boxShadow: 'none',
        outline: 'none',
        borderRadius: '8px',
        fontSize: '16px',
      },
      sizes: {
        xl: {
          padding: '10px 30px',
          fontSize: '22px',
          fontWeight: 700,
        },
        sm: {
          padding: '6px',
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      variants: {
        primary: {
          backgroundColor: 'primary.400',
          border: 'none',
          color: 'neutral.900',
          _hover: {
            backgroundColor: 'neutral.200',
          },
          _active: {
            backgroundColor: 'neutral.300',
          },
        },
        primaryNeutral: {
          backgroundColor: 'neutral.100',
          border: 'none',
          color: 'neutral.900',
          _hover: {
            backgroundColor: 'neutral.200',
          },
          _active: {
            backgroundColor: 'neutral.300',
          },
        },
        secondary: {
          boxShadow: 'none',
          outline: 'none',
          border: `2px solid`,
          borderColor: 'neutral.200',
          color: 'neutral.900',
          backgroundColor: 'neutral.50',
          _hover: {
            borderColor: 'primary.400',
          },
          _active: {
            borderColor: 'primary.400',
            backgroundColor: 'primary.100',
          },
        },
        secondaryNeutral: {
          border: `2px solid`,
          borderColor: 'neutral.200',
          color: 'neutral.900',
          backgroundColor: 'neutral.100',
          _hover: {
            borderColor: 'primary.400',
          },
          _active: {
            borderColor: 'primary.400',
            backgroundColor: 'primary.100',
          },
        },
        transparent: {
          backgroundColor: 'transparent',
          _hover: {
            borderColor: 'primary.400',
            backgroundColor: 'neutral.100',
          },
          _active: {
            borderColor: 'primary.400',
            backgroundColor: 'primary.100',
          },
        },
        danger: {
          backgroundColor: 'secondary.red',
          color: colors.neutral0,
          _hover: {
            backgroundColor: 'secondary.red',
          },
        },
      },
    },
    Text: {
      baseStyle: {
        fontSize: '14px',
        color: 'neutral.900',
        lineHeight: 1.6,
      },
      variants: {
        caption: () => ({
          fontSize: '10px',
          fontWeight: 400,
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
        body1: () => ({
          fontWeight: 500,
          lineHeight: 1.6,
          fontSize: '16px',
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
          color: `${colorScheme}.400`,
          control: {
            _checked: {
              color: `${colorScheme}.400`,
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
              ringColor: `${colorScheme}.500`,
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
