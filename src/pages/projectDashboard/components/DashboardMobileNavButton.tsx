import { Box, ButtonProps } from '@chakra-ui/react'

import { DashboardNavButton } from './DashboardNavButton'

export const DashboardMobileNavButton = (props: ButtonProps) => (
  <DashboardNavButton p={6} borderRadius={0} {...props}>
    <Box as="span" flexGrow={1} textAlign="left">
      {props.children}
    </Box>
  </DashboardNavButton>
)
