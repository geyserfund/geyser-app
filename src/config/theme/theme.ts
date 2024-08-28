import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'

import { fonts, lightModeColors } from '../../shared/styles'
import {
  alertTheme,
  badgeTheme,
  buttonTheme,
  drawerTheme,
  inputTheme,
  menuTheme,
  modalTheme,
  popOverTheme,
  selectTheme,
  switchTheme,
  tabTheme,
  textareaTheme,
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
    '3xl': '100em', // 1600px
    '4xl': '110em', // 1760px
    '5xl': '120em', // 1920px
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
        textDecoration: 'none',
        _hover: {
          textDecoration: 'none',
        },
        _focusVisible: {
          boxShadow: 'none',
        },
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
        primary: ({ colorScheme = 'primary1' }: StyleFunctionProps) => ({
          control: {
            _checked: {
              color: `utils.blackContrast`,
              backgroundColor: `${colorScheme}.9`,
              borderColor: `${colorScheme}.9`,
            },
            _focus: {
              ring: 1,
              ringColor: `${colorScheme}.9`,
              borderColor: `${colorScheme}.9`,
            },
          },
        }),
      },
      defaultProps: {
        variant: 'primary',
        colorScheme: 'primary1',
      },
    },
    Radio: {
      variants: {
        primary: ({ colorScheme = 'primary1' }: StyleFunctionProps) => ({
          control: {
            _checked: {
              borderColor: `${colorScheme}.9`,
              backgroundColor: `${colorScheme}.9`,
              color: `utils.blackContrast`,
              _before: {
                width: '50%',
                height: '50%',
              },
            },
            _before: {
              width: '50%',
              height: '50%',
            },
            _focus: {
              ring: 1,
              ringColor: `${colorScheme}.9`,
            },
          },
        }),
      },
      defaultProps: {
        variant: 'primary',
        colorScheme: 'primary1',
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
    Input: inputTheme,
    Textarea: textareaTheme,
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
/** This is only used for chakra types generation process */
export default extendTheme(finalTheme)
