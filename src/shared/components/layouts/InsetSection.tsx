import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import { dimensions } from '@/shared/constants/components/dimensions.ts'

const desktopSectionWidth = `calc((100vw + min(100vw - 48px, ${dimensions.maxWidth + 96}px)) / 2)`

/** Frames wide backgrounds with responsive margins and generous corners. */
export const InsetSection = (props: BoxProps) => (
  <Box
    w={{ base: 'calc(100vw - 12px)', lg: desktopSectionWidth }}
    maxW="none"
    mx={{ base: 'calc(50% - 50vw + 6px)', lg: `calc((100% - ${desktopSectionWidth}) / 2)` }}
    position="relative"
    overflow="hidden"
    borderRadius={{ base: 'sectionMobile', lg: 'section' }}
    {...props}
  />
)
