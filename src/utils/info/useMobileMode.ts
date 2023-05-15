import { useMediaQuery } from '@chakra-ui/media-query'

type Props = {
  /**
   * The breakpoint at which smaller widths should be
   * considered "mobile".
   */
  mobileBreakpoint: number
}

export const DEFAULT_MOBILE_BREAK_POINT = 900

export const useMobileMode = (
  props: Props = { mobileBreakpoint: DEFAULT_MOBILE_BREAK_POINT },
) => {
  const [isMobile] = useMediaQuery(`(max-width: ${props.mobileBreakpoint}px)`)

  if (isMobile === undefined) {
    return true
  }

  return isMobile
}
