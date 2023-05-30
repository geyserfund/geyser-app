import { ColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const useThemeDetector = (): ColorMode | undefined => {
  const [colorTheme, setColorTheme] = useState<ColorMode | undefined>()

  const mqListener = (e: MediaQueryListEvent | MediaQueryList) => {
    setColorTheme(e.matches ? 'dark' : 'light')
  }

  useEffect(() => {
    mqListener(window.matchMedia('(prefers-color-scheme: dark)'))

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
    darkThemeMq.addEventListener('change', mqListener)
    return () => darkThemeMq.removeEventListener('change', mqListener)
  }, [])

  return colorTheme
}
