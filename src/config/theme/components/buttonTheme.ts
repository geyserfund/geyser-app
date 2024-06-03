import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

import { darkModeColors, fonts, lightModeColors } from '../../../styles'

export const buttonTheme: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    fontWeight: 500,
    fontFamily: fonts.brand,
    boxShadow: 'none',
    outline: 'none',
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    sm: {
      height: '24px',
      paddingX: '8px',
      borderRadius: '3px',
      fontSize: '12px',
    },
    md: {
      height: '32px',
      paddingX: '12px',
      borderRadius: '4px',
      fontSize: '14px',
    },
    lg: {
      height: '40px',
      paddingX: '16px',
      borderRadius: '6px',
      fontSize: '16px',
    },
    xl: {
      height: '48px',
      paddingX: '24px',
      borderRadius: '8px',
      fontSize: '18px',
    },
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    solid: ({ theme, colorScheme = 'primary1' }: StyleFunctionProps) => ({
      backgroundColor: theme.colors[colorScheme][9],
      color: colorScheme === 'primary1' ? theme.colors.utils.blackContrast : theme.colors.utils.whiteContrast,
      _hover: {
        backgroundColor: theme.colors[colorScheme][10],
      },
      _active: {
        backgroundColor: theme.colors[colorScheme][11],
      },
      _disabled: {
        backgroundColor: theme.colors.neutral1[3],
        color: theme.colors.neutral1[8],
      },
      _loading: {
        backgroundColor: theme.colors.neutral1[3],
        color: theme.colors.neutral1[8],
      },
    }),
    soft: ({ theme, colorScheme = 'primary1' }: StyleFunctionProps) => ({
      backgroundColor: theme.colors[colorScheme][3],
      color: theme.colors[colorScheme][11],
      _hover: {
        backgroundColor: theme.colors[colorScheme][4],
      },
      _active: {
        backgroundColor: theme.colors[colorScheme][5],
      },
      _disabled: {
        backgroundColor: theme.colors.neutral1[3],
        color: theme.colors.neutral1[8],
      },
      _loading: {
        backgroundColor: theme.colors.neutral1[3],
        color: theme.colors.neutral1[8],
      },
    }),
    surface: ({ theme, colorScheme = 'primary1' }: StyleFunctionProps) => ({
      backgroundColor: colorScheme === 'primary1' ? theme.colors.utils.primarySurface : 'transparent',
      color: theme.colors[colorScheme][11],
      border: '1px solid',
      borderColor: theme.colors[colorScheme][7],
      _hover: {
        backgroundColor: 'transparent',
        borderColor: theme.colors[colorScheme][8],
      },
      _active: {
        backgroundColor: theme.colors[colorScheme][3],
        borderColor: theme.colors[colorScheme][8],
      },
      _disabled: {
        backgroundColor: theme.colors.neutral1[3],
        color: theme.colors.neutral1[8],
      },
      _loading: {
        backgroundColor: theme.colors.neutral1[3],
        color: theme.colors.neutral1[8],
      },
    }),
    outline: ({ theme }: StyleFunctionProps) => ({}),
    ghost: ({ theme }: StyleFunctionProps) => ({}),

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
