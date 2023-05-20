import {
  extendTheme,
  ThemeProvider,
  ThemeProviderProps,
  useColorMode,
} from '@chakra-ui/react'
import { ThemeProvider as ReactJSSThemeProvideer } from 'react-jss'

import { darkModeColors, lightModeColors } from '../styles'

export type ReactJSSTheme = typeof lightModeColors

export const DynamicColorMode = ({
  children,
  ...props
}: Omit<ThemeProviderProps, 'theme'>) => {
  const { colorMode } = useColorMode()
  const theme = extendTheme({
    colors: colorMode === 'light' ? lightModeColors : darkModeColors,
  })

  return (
    <ThemeProvider {...props} theme={theme}>
      <ReactJSSThemeProvideer
        theme={colorMode === 'light' ? lightModeColors : darkModeColors}
      >
        {children}
      </ReactJSSThemeProvideer>
    </ThemeProvider>
  )
}
