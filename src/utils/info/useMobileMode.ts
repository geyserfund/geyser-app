import { useMediaQuery } from '@chakra-ui/media-query';

type Props = {
  /**
   * The breakpoint at which smaller widths should be
   * considered "mobile".
   */
  mobileBreakpoint: number;
};

export const useMobileMode = (props: Props = { mobileBreakpoint: 900 }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${props.mobileBreakpoint}px)`);

  return isMobile;
};
