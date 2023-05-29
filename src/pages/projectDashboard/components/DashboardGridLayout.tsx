import { Fade, Grid, GridItem } from '@chakra-ui/react'

import { useMobileMode } from '../../../utils'

export const DashboardGridLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const isMobile = useMobileMode()
  return (
    <Fade in>
      <Grid
        width="100%"
        minHeight="100%"
        templateColumns={isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)'}
        padding={isMobile ? '10px' : '40px 20px 20px 20px'}
      >
        <GridItem
          colSpan={isMobile ? 1 : 3}
          display="flex"
          justifyContent="flex-start"
        ></GridItem>
        {children}
      </Grid>
    </Fade>
  )
}
