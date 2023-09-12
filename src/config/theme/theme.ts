import { StyleFunctionProps } from '@chakra-ui/react'

import { fonts, lightModeColors } from '../../styles'
import { alertTheme } from './alertTheme'
import { drawerTheme } from './drawerTheme'
import { menuTheme } from './menuTheme'
import { modalTheme } from './modalTheme'
import { popOverTheme } from './popOverTheme'

export const theme = {
  initialColorMode: 'system',
  useSystemColorMode: true,
  breakpoints: {
    xs: '20em', // 320px
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '57em', // Desktop ~900px
    xl: '80em', // 1280px
    '2xl': '96em', // 1536px
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
        md: {
          padding: 2,
          fontSize: '16px',
          fontWeight: 500,
        },
      },
      variants: {
        primary: {
          backgroundColor: lightModeColors.primary[400],
          border: 'none',
          color: lightModeColors.neutral[900],
          _hover: {
            backgroundColor: lightModeColors.neutral[200],
          },
          _active: {
            backgroundColor: lightModeColors.neutral[300],
          },
        },
        primaryLink: ({ theme }: StyleFunctionProps) => ({
          backgroundColor: 'transparent',
          border: 'none',
          color: theme.colors.primary[600],
          _hover: {
            backgroundColor: theme.colors.neutral[200],
          },
          _active: {
            backgroundColor: theme.colors.neutral[300],
          },
        }),
        primaryNeutral: ({ theme }: StyleFunctionProps) => ({
          backgroundColor: theme.colors.neutral[100],
          border: 'none',
          color: theme.colors.neutral[900],
          _hover: {
            backgroundColor: theme.colors.neutral[200],
          },
          _active: {
            backgroundColor: theme.colors.neutral[300],
          },
        }),
        primaryGradient: {
          background:
            'linear-gradient(270deg, #6BE7CE 0%, #20ECC7 35.42%, #00F388 100%)',
          border: 'none',
          color: lightModeColors.neutral[900],
          _hover: {
            background: lightModeColors.neutral[200],
          },
          _active: {
            background: lightModeColors.neutral[300],
          },
        },
        secondary: ({ theme }: StyleFunctionProps) => ({
          boxShadow: 'none',
          outline: 'none',
          border: `2px solid`,
          borderColor: theme.colors.neutral[200],
          color: theme.colors.neutral[900],
          backgroundColor: theme.colors.neutral[0],
          _hover: {
            borderColor: theme.colors.primary[400],
          },
          _active: {
            borderColor: theme.colors.primary[400],
            backgroundColor: theme.colors.primary[100],
          },
        }),
        secondaryNeutral: ({ theme }: StyleFunctionProps) => ({
          border: `2px solid`,
          borderColor: theme.colors.neutral[200],
          color: theme.colors.neutral[900],
          backgroundColor: theme.colors.neutral[100],
          _hover: {
            borderColor: theme.colors.primary[400],
          },
          _active: {
            borderColor: theme.colors.primary[400],
            backgroundColor: theme.colors.primary[100],
          },
        }),
        transparent: ({ theme }: StyleFunctionProps) => ({
          color: theme.colors.neutral900,
          backgroundColor: 'transparent',
          _hover: {
            borderColor: theme.colors.primary[400],
            backgroundColor: theme.colors.neutral[100],
          },
          _active: {
            borderColor: theme.colors.primary[400],
            backgroundColor: theme.colors.primary[100],
          },
        }),
        danger: ({ theme }: StyleFunctionProps) => ({
          boxShadow: 'none',
          outline: 'none',
          border: `2px solid`,
          borderColor: theme.colors.neutral[200],
          color: theme.colors.secondary.red,
          backgroundColor: theme.colors.neutral[50],
          _hover: {
            borderColor: theme.colors.secondary.red,
          },
          _active: {
            borderColor: theme.colors.secondary.red,
            backgroundColor: theme.colors.secondary.red,
            color: theme.colors.neutral[50],
          },
        }),
      },
    },
    Text: {
      baseStyle: {
        fontSize: '14px',
        lineHeight: 1.6,
        fontWeight: 400,
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
        h1: () => ({
          fontSize: '35px',
          lineHeight: 1.4,
          fontWeight: 700,
        }),
        body1: () => ({
          fontWeight: 400,
          lineHeight: 1.6,
          fontSize: '16px',
        }),
        satoshi: () => ({
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: '32px',
          lineHeight: '1.4em',
          letterSpacing: '0.01125em',
        }),
      },
    },
    Link: {
      baseStyle: {
        textDecoration: 'underline',
      },
    },
    Divider: {
      baseStyle: {
        boxSizing: 'border-box',
      },
      variant: {
        lg: {
          borderBottomWidth: '2px',
          borderColor: 'rgba(196, 196, 196, 0.4)',
        },
      },
    },
    Checkbox: {
      variants: {
        primary: ({ colorScheme = 'primary' }: StyleFunctionProps) => ({
          color: `${colorScheme}.400`,
          control: {
            _checked: {
              color: `${colorScheme}.400`,
            },
          },
        }),
      },
      defaultProps: {
        variant: 'primary',
        colorScheme: 'primary',
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
    Alert: alertTheme,
    Menu: menuTheme,
    Modal: modalTheme,
    Drawer: drawerTheme,
    Popover: popOverTheme,
    Input: {
      defaultProps: {
        focusBorderColor: 'primary.400',
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'primary.400',
      },
    },
  },
  styles: {
    global: ({ theme }: StyleFunctionProps) => ({
      body: {
        bg: theme.colors.neutral[50],
      },
    }),
  },
}
