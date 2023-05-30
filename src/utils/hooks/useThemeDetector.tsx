import { ColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const useThemeDetector = (): ColorMode | undefined => {
  const [isDarkTheme, setIsDarkTheme] = useState<ColorMode | undefined>()

  const mqListener = (e: MediaQueryListEvent) => {
    setIsDarkTheme(e.matches ? 'dark' : 'light')
  }

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
    darkThemeMq.addEventListener('change', mqListener)
    return () => darkThemeMq.removeEventListener('change', mqListener)
  }, [])
  return isDarkTheme
}
