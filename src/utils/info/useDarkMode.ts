import { useColorMode } from '@chakra-ui/react'

export const useDarkMode = () => {
  return useColorMode().colorMode === 'dark'
}
