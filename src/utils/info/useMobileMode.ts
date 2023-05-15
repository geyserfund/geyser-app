import { useBreakpointValue } from '@chakra-ui/media-query'

export const DEFAULT_MOBILE_BREAK_POINT = 900

export const useMobileMode = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return isMobile
}
