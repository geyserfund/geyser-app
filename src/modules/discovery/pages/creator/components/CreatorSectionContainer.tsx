import { type BoxProps, Box } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'

/** Shared section wrapper for creator page content width and horizontal spacing. */
export const CreatorSectionContainer = ({ children, ...props }: PropsWithChildren<BoxProps>) => {
  return (
    <Box w="full" maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto" px={standardPadding} {...props}>
      {children}
    </Box>
  )
}
