import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

import { darkModeColors, fonts, lightModeColors } from '../../../styles'

export const buttonTheme: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    fontWeight: 500,
    fontFamily: fonts.brand,
    boxShadow: 'none',
    outline: 'none',
    borderRadius: '8px',
    fontSize: '16px',
  },
  // styles for different sizes ("sm", "md", "lg")
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
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: ({ theme }: StyleFunctionProps) => ({
      backgroundColor: theme.colors.primary[400],
      border: 'none',
      color: theme.isNostrColor ? lightModeColors.neutral[0] : lightModeColors.neutral[900],
      _hover: {
        backgroundColor: {
          base: theme.colors.primary[400],
          lg: theme.isNostrColor ? darkModeColors.neutral[200] : lightModeColors.neutral[200],
        },
      },
      _active: {
        backgroundColor: theme.isNostrColor ? darkModeColors.neutral[300] : lightModeColors.neutral[300],
      },
    }),
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
      backgroundColor: theme.colors.neutral[600],
      border: 'none',
      color: theme.colors.neutral[0],
      _hover: {
        backgroundColor: theme.colors.neutral[700],
      },
      _active: {
        backgroundColor: theme.colors.neutral[900],
      },
    }),
    neutral: ({ theme }: StyleFunctionProps) => ({
      backgroundColor: theme.colors.neutral[100],
      border: '2px solid',
      borderColor: 'transparent',
      color: theme.colors.neutral[900],
      _hover: {
        backgroundColor: theme.colors.neutral[200],
      },
      _active: {
        backgroundColor: theme.colors.primary[100],
        borderColor: theme.colors.primary[400],
      },
    }),
    primaryGradient: ({ theme }: StyleFunctionProps) => ({
      background: theme.isNostrColor
        ? `linear-gradient(270deg, #B486FA 0%, #C54BFF 35.42%, #D162FF 100%)`
        : `linear-gradient(270deg, #6BE7CE 0%, #20ECC7 35.42%, #00F388 100%)`,
      border: 'none',
      color: lightModeColors.neutral[900],
      _hover: {
        background: lightModeColors.neutral[200],
      },
      _active: {
        background: lightModeColors.neutral[300],
      },
    }),
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
      backgroundColor: theme.colors.neutral[0],
      textDecoration: 'none',
      _hover: {
        borderColor: theme.colors.primary[400],
        textDecoration: 'none',
      },
      _active: {
        borderColor: theme.colors.primary[400],
        backgroundColor: theme.colors.primary[100],
        textDecoration: 'none',
      },
    }),
    transparent: ({ theme }: StyleFunctionProps) => ({
      color: theme.colors.neutral900,
      backgroundColor: 'transparent',
      _hover: {
        borderColor: theme.colors.primary[400],
        backgroundColor: theme.colors.neutral[400],
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
    login: ({ theme }: StyleFunctionProps) => ({
      boxShadow: 'none',
      outline: 'none',
      border: `1px solid`,
      borderRadius: '4px',
      borderColor: theme.colors.neutral[600],
      color: theme.colors.neutral[900],
      backgroundColor: theme.colors.neutral[0],
      textDecoration: 'none',
      fontFamily: fonts.roboto,
      fontSize: '14px',
      padding: '12px',
      iconSpacing: '10px',
      _hover: {
        backgroundColor: theme.colors.neutral[100],
        textDecoration: 'none',
      },
      _active: {
        backgroundColor: theme.colors.neutral[100],
      },
    }),
    text: ({ theme }: StyleFunctionProps) => ({
      boxShadow: 'none',
      outline: 'none',
      border: 'none',
      color: theme.colors.neutral[900],
      backgroundColor: 'transparent',
      textdecoration: 'none',
      _hover: {
        backgroundColor: 'transparent',
        textdecoration: 'underline',
      },
      _active: {
        backgroundColor: 'transparent',
      },
    }),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: 'md',
  },
}
