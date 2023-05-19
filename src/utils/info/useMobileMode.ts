import { useBreakpoint } from '@chakra-ui/media-query'

export const DEFAULT_MOBILE_BREAK_POINT = 900

export const useMobileMode = () => {
  const isLg = useBreakpoint('lg')
  return !isLg
}
