import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'

import { fonts, lightModeColors } from '../../styles'
import {
  alertTheme,
  badgeTheme,
  buttonTheme,
  drawerTheme,
  menuTheme,
  modalTheme,
  popOverTheme,
  selectTheme,
  switchTheme,
  tabTheme,
  tooltipTheme,
} from './components'

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
    Button: buttonTheme,
    Heading: {
      baseStyle: {
        color: 'utils.text',
      },
    },
    Text: {
      baseStyle: {
        fontSize: '14px',
        lineHeight: 1.6,
        fontWeight: 400,
        color: 'utils.text',
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
    Select: selectTheme,
    Switch: switchTheme,
    Badge: badgeTheme,
    Tooltip: tooltipTheme,
    Tabs: tabTheme,
    Input: {
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
    },
  },
  styles: {
    global: ({ theme }: StyleFunctionProps) => ({
      body: {
        bg: theme.colors.neutral[50],
        color: theme.colors.utils.text,
      },
    }),
  },
}

const finalTheme = {
  ...theme,
  colors: lightModeColors,
}
export default extendTheme(finalTheme)
