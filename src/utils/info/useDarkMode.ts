import { useColorMode } from '@chakra-ui/system'

export const useDarkMode = () => {
  return useColorMode().colorMode === 'dark'
}
