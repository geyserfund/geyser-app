import { useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'

let initialColorMode = ''
let modeSet = false

export const useInitialColorModeEffect = () => {
  const { colorMode, setColorMode } = useColorMode()

  useEffect(() => {
    if (!modeSet) {
      modeSet = true
      initialColorMode = colorMode
    }

    setColorMode('light')

    return () => {
      setColorMode(initialColorMode)
    }
  }, [colorMode, setColorMode])

  useEffect(() => {
    return () => {
      modeSet = false
    }
  }, [])
}
