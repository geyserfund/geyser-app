import {
  extendTheme,
  ThemeProvider,
  ThemeProviderProps,
  useColorMode,
} from '@chakra-ui/react'

import { darkModeColors, lightModeColors } from '../styles'

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
      {children}
    </ThemeProvider>
  )
}
