import {
  extendTheme,
  ThemeProvider,
  ThemeProviderProps,
  useColorMode,
} from '@chakra-ui/react'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { ThemeProvider as ReactJSSThemeProvider } from 'react-jss'

import { theme } from '../config'
import {
  darkModeColors,
  lightModeColors,
  nostrColorsDark,
  nostrColorsLight,
  primaryColorsDark,
  primaryColorsLight,
} from '../styles'
import { UserSetColorMode } from '../utils'
import { useThemeDetector } from '../utils/hooks'

export type AppTheme = typeof theme & { colors: typeof lightModeColors }

const nostrColorAtom = atom(false)
export const useNostrColor = () => useAtom(nostrColorAtom)

export const ChakraThemeProvider = ({
  children,
  ...props
}: Omit<ThemeProviderProps, 'theme'>) => {
  const { colorMode, setColorMode } = useColorMode()
  const [isNostrColor] = useNostrColor()

  const systemColorMode = useThemeDetector()
  const finalTheme = {
    ...theme,
    colors:
      colorMode === 'light'
        ? {
            ...lightModeColors,
            primary: isNostrColor ? nostrColorsLight : primaryColorsLight,
          }
        : {
            ...darkModeColors,
            primary: isNostrColor ? nostrColorsDark : primaryColorsDark,
          },
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
      <ReactJSSThemeProvider theme={finalTheme}>
        {children}
      </ReactJSSThemeProvider>
    </ThemeProvider>
  )
}
