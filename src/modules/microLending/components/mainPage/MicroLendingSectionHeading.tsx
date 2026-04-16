import { Box } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { H2 } from '@/shared/components/typography/Heading.tsx'

type MicroLendingSectionHeadingProps = {
  children: ReactNode
}

/** Centered section title (no decorative rules). */
export function MicroLendingSectionHeading({ children }: MicroLendingSectionHeadingProps): JSX.Element {
  return (
    <Box w="full" textAlign="center">
      <H2 size={{ base: 'lg', md: '2xl' }} bold whiteSpace="normal">
        {children}
      </H2>
    </Box>
  )
}
