import { Box } from '@chakra-ui/react'

import { dimensions } from '../../constants'

interface PageLayoutProps {
  children: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Box
      position="relative"
      paddingTop={`${dimensions.topNavBar.desktop.height}px`}
      width="full"
      height="full"
    >
      {children}
    </Box>
  )
}
