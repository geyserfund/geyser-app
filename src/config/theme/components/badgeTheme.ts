import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

const contrastColorThemes = ['primary1', 'success', 'warning', 'info']

export const badgeTheme: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'none',
  },
  sizes: {
    sm: {
      borderRadius: '5px',
      fontSize: '12px',
      height: '20px',
      padding: '2px 6px',
    },
    md: {
      borderRadius: '6px',
      fontSize: '12px',
      height: '24px',
      padding: '4px 8px',
    },
    lg: {
      borderRadius: '8px',
      fontSize: '14px',
      height: '28px',
      padding: '4px 10px',
    },
  },
  variants: {
    solid: ({ colorScheme }: StyleFunctionProps) => ({
      backgroundColor: `${colorScheme}.9`,
      color: contrastColorThemes.includes(colorScheme) ? 'utils.blackContrast' : 'utils.whiteContrast',
    }),
    soft: ({ colorScheme }: StyleFunctionProps) => ({
      backgroundColor: `${colorScheme}.3`,
      color: `${colorScheme}.11`,
    }),
    outline: ({ colorScheme }: StyleFunctionProps) => ({
      color: `${colorScheme}.11`,
      border: '1px solid',
      borderColor: `${colorScheme}.8`,
    }),
    surface: ({ colorScheme }: StyleFunctionProps) => ({
      color: `${colorScheme}.11`,
      backgroundColor: `${colorScheme}.2`,
      border: '1px solid',
      borderColor: `${colorScheme}.7`,
    }),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'primary1',
  },
}
