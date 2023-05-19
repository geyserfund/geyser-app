import { useBreakpointValue } from '@chakra-ui/media-query'

export const useMobileMode = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: false })

  return isMobile
}
