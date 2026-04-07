import { Box, BoxProps, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

type StartPageSectionShellProps = {
  children: ReactNode
  sectionBg?: string
  id?: string
} & Omit<BoxProps, 'children'>

/** Shared wrapper for each section of the launch start playbook page. */
export const StartPageSectionShell = ({ children, id, sectionBg, ...boxProps }: StartPageSectionShellProps) => {
  const defaultBackground = 'utils.pbg'
  const startPageMaxWidth = `${dimensions.maxWidth + 24 * 2}px`

  return (
    <Box as="section" id={id} width="100%" backgroundColor={sectionBg ?? defaultBackground} {...boxProps}>
      <VStack
        width="100%"
        maxWidth={startPageMaxWidth}
        marginX="auto"
        paddingX={standardPadding}
        paddingY={{ base: 8, md: 12, lg: 16 }}
        spacing={{ base: 5, md: 6, lg: 8 }}
        alignItems="stretch"
      >
        {children}
      </VStack>
    </Box>
  )
}
