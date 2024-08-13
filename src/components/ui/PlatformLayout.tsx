import { Box, VStack } from '@chakra-ui/react'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box w="full" display="flex" justifyContent="center" alignItems="center" height="120%" bg="utils.pbg">
      <VStack
        width="100%"
        height="100%"
        paddingTop={{
          base: `${dimensions.projectNavBar.mobile.height - 20}px`,
          lg: `${dimensions.projectNavBar.desktop.height}px`,
        }}
        paddingX={standardPadding}
        alignItems="center"
      >
        <Box w="100%" height="100%" maxWidth={dimensions.maxWidth}>
          {children}
        </Box>
      </VStack>
    </Box>
  )
}

export default PlatformLayout
