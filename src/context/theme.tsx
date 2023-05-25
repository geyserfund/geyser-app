import {
  extendTheme,
  ThemeProvider,
  ThemeProviderProps,
  useColorMode,
} from '@chakra-ui/react'
import { ThemeProvider as ReactJSSThemeProvider } from 'react-jss'

import { theme } from '../config'
import { darkModeColors, lightModeColors } from '../styles'

export type AppTheme = typeof theme & { colors: typeof lightModeColors }

export const ChakraThemeProvider = ({
  children,
  ...props
}: Omit<ThemeProviderProps, 'theme'>) => {
  const { colorMode } = useColorMode()

  const finalTheme = {
    ...theme,
    colors: colorMode === 'light' ? lightModeColors : darkModeColors,
  }

  const chakraTheme = extendTheme(finalTheme)

  return (
    <ThemeProvider {...props} theme={chakraTheme}>
      <ReactJSSThemeProvider theme={finalTheme}>
        {children}
      </ReactJSSThemeProvider>
    </ThemeProvider>
  )
}
