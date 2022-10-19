import { useColorMode } from '@chakra-ui/color-mode';

export const isDarkMode = () => {
  return useColorMode().colorMode === 'dark';
};
