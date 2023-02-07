import { Fade, Grid, GridItem, useMediaQuery } from '@chakra-ui/react'

import { useMobileMode } from '../../../utils'

export const DashboardGridLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const isMobile = useMobileMode()
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  return (
    <Fade in>
      <Grid
        width="100%"
        templateColumns={
          isLargerThan1280
            ? 'repeat(12, 1fr)'
            : isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(5, 1fr)'
        }
        padding={
          isMobile
            ? '10px'
            : isLargerThan1280
            ? '40px 40px 20px 40px'
            : '40px 20px 20px 20px'
        }
      >
        <GridItem
          colSpan={isLargerThan1280 ? 3 : 1}
          display="flex"
          justifyContent="flex-start"
        ></GridItem>
        {children}
      </Grid>
    </Fade>
  )
}
