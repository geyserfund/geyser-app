import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

import { darkModeColors, fonts, lightModeColors } from '../../../shared/styles'

export const buttonTheme: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    fontWeight: 500,
    fontFamily: fonts.brand,
    boxShadow: 'none',
    outline: 'none',
    minWidth: '20px',
    textDecoration: 'none',
    _hover: {
      textDecoration: 'none',
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    xs: {
      height: '20px',
      minWidth: '20px',
      paddingX: '4px',
      borderRadius: '5px',
      fontSize: '12px',
    },
    sm: {
      height: '24px',
      minWidth: '24px',
      minW: '24px',
      paddingX: '8px',
      borderRadius: '6px',
      fontSize: '12px',
    },
    md: {
      height: '32px',
      minWidth: '32px',
      minW: '32px',
      paddingX: '12px',
      borderRadius: '8px',
      fontSize: '14px',
    },
    lg: {
      height: '40px',
      minWidth: '40px',
      minW: '40px',
      paddingX: '16px',
      borderRadius: '10px',
      fontSize: '16px',
    },
    xl: {
      height: '48px',
      minWidth: '48px',
      minW: '48px',
      paddingX: '24px',
      borderRadius: '12px',
      fontSize: '18px',
    },
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    solid: ({ colorScheme = 'primary1' }: StyleFunctionProps) => ({
      backgroundColor: `${colorScheme}.9`,
      color: colorScheme === 'primary1' ? 'utils.blackContrast' : 'utils.whiteContrast',
      _hover: {
        backgroundColor: `${colorScheme}.10`,
      },
      _active: {
        opacity: 0.92,
        backgroundColor: `${colorScheme}.10`,
      },
      _disabled: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.8',
      },
      _loading: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.11',
      },
    }),
    soft: ({ colorScheme = 'primary1' }: StyleFunctionProps) => ({
      backgroundColor: `${colorScheme}.3`,
      color: `${colorScheme}.11`,
      _hover: {
        backgroundColor: `${colorScheme}.4`,
      },
      _active: {
        backgroundColor: `${colorScheme}.5`,
      },
      _disabled: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.8',
      },
      _loading: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.11',
      },
    }),
    surface: ({ colorScheme = 'primary1' }: StyleFunctionProps) => ({
      backgroundColor: colorScheme === 'primary1' ? 'utils.primarySurface' : 'transparent',
      color: `${colorScheme}.11`,
      border: '1px solid',
      borderColor: `${colorScheme}.7`,
      _hover: {
        backgroundColor: colorScheme === 'primary1' ? 'utils.primarySurface' : 'transparent',
        borderColor: `${colorScheme}.8`,
      },
      _active: {
        backgroundColor: `${colorScheme}.3`,
        borderColor: `${colorScheme}.8`,
      },
      _disabled: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.8',
        borderColor: 'neutral1.8',
      },
      _loading: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.11',
        borderColor: 'neutral1.8',
      },
    }),
    outline: ({ colorScheme = 'primary1' }: StyleFunctionProps) => ({
      backgroundColor: 'transparent',
      color: `${colorScheme}.11`,
      border: '1px solid',
      borderColor: `${colorScheme}.8`,
      _hover: {
        backgroundColor: `${colorScheme}.2`,
        borderColor: `${colorScheme}.8`,
      },
      _active: {
        backgroundColor: `${colorScheme}.3`,
        borderColor: `${colorScheme}.8`,
      },
      _disabled: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.8',
        borderColor: 'neutral1.8',
      },
      _loading: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.11',
        borderColor: 'neutral1.8',
      },
    }),
    ghost: ({ colorScheme = 'primary1' }: StyleFunctionProps) => ({
      backgroundColor: 'transparent',
      color: `${colorScheme}.11`,
      _hover: {
        backgroundColor: `${colorScheme}.3`,
      },
      _active: {
        backgroundColor: `${colorScheme}.4`,
      },
      _disabled: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.8',
      },
      _loading: {
        backgroundColor: 'neutral1.3',
        color: 'neutral1.11',
      },
    }),

    menu: ({ colorScheme = 'primary1' }: StyleFunctionProps) => ({
      bg: 'utils.pbg',
      color: 'utils.text',
      borderRadius: '8px',
      justifyContent: 'flex-start',
      _hover: {
        bg: `${colorScheme}.3`,
        color: 'utils.text',
      },
      _active: {
        bg: `${colorScheme}.10`,
        color: 'utils.blackContrast',
      },
      _selected: {
        bg: `${colorScheme}.9`,
        color: 'utils.blackContrast',
      },
      _loading: {
        backgroundColor: `${colorScheme}.6`,
        color: 'utils.blackContrast',
      },
      _disabled: {
        bg: 'panel.solid',
        color: 'neutral1.8',
      },
    }),
    select: ({ colorScheme = 'primary1' }: StyleFunctionProps) => ({
      bg: 'transparent',
      color: 'utils.text',
      borderRadius: '8px',
      justifyContent: 'flex-start',
      _hover: {
        bg: `${colorScheme}.9`,
        color: 'utils.blackContrast',
      },
      _active: {
        bg: `neutral1.3`,
        color: 'utils.text',
      },
      _selected: {
        bg: `neutral1.3`,
        color: 'utils.text',
      },
      _loading: {
        backgroundColor: `${colorScheme}.6`,
        color: 'utils.blackContrast',
      },
      _disabled: {
        bg: 'panel.solid',
        color: 'neutral1.8',
      },
    }),

    // DEPRECATED: DO NOT USE ANY BELOW HERE

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
