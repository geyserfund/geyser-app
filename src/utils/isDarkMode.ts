import { useColorMode } from '@chakra-ui/color-mode';

export const isDarkMode = () => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark';
};
