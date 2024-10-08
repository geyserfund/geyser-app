import { ColorMode, extendTheme, ThemeProvider, ThemeProviderProps, useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'
import { ThemeProvider as ReactJSSThemeProvider } from 'react-jss'

import { theme } from '@/config/theme'

import { darkModeColors, lightModeColors } from '../shared/styles'
import { UserSetColorMode } from '../utils'
import { useThemeDetector } from '../utils/hooks'

export type AppTheme = typeof theme & {
  colors: typeof lightModeColors
  isNostrColor: boolean
  colorMode: ColorMode
}

export const ChakraThemeProvider = ({ children, ...props }: Omit<ThemeProviderProps, 'theme'>) => {
  const { colorMode, setColorMode } = useColorMode()

  const systemColorMode = useThemeDetector()
  const finalTheme = {
    ...theme,
    colors: colorMode === 'light' ? lightModeColors : darkModeColors,
    colorMode,
  }
  const chakraTheme = extendTheme(finalTheme)

  useEffect(() => {
    if (systemColorMode) {
      const userSet = localStorage.getItem(UserSetColorMode)
      if (!userSet) {
        setColorMode(systemColorMode)
      }
    }
  }, [systemColorMode, setColorMode])

  return (
    <ThemeProvider {...props} theme={chakraTheme}>
      <ReactJSSThemeProvider theme={finalTheme}>{children}</ReactJSSThemeProvider>
    </ThemeProvider>
  )
}
