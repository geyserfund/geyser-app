import { useColorMode } from '@chakra-ui/color-mode'

export const useDarkMode = () => {
  return useColorMode().colorMode === 'dark'
}
