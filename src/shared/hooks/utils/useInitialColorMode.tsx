import { useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

let initialColorMode = ''

export const useInitialColorModeEffect = () => {
  const { colorMode, setColorMode } = useColorMode()

  const location = useLocation()
  const isGuardiansPage = location.pathname.includes('/guardians')

  useEffect(() => {
    if (isGuardiansPage && colorMode !== 'light') {
      initialColorMode = 'dark'
      setColorMode('light')
    } else if (!isGuardiansPage && initialColorMode === 'dark') {
      setColorMode('dark')
    }
  }, [isGuardiansPage, colorMode, setColorMode])
}
