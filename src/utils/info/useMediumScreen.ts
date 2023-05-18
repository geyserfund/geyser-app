import { useBreakpointValue } from '@chakra-ui/media-query'

export const useMediumScreen = (): boolean => {
  const isMediumScreen = useBreakpointValue({ xl: false, base: true })

  return isMediumScreen || false
}
