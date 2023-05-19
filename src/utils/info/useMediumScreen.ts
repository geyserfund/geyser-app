import { useBreakpoint } from '@chakra-ui/media-query'

export const useMediumScreen = (): boolean => {
  const isXl = useBreakpoint('xl')
  return !isXl
}
