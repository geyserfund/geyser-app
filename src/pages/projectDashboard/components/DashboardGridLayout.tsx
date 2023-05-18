import { Fade, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'

export const DashboardGridLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const isMobile = useBreakpointValue({ lg: false, base: true })
  const isViewXL = useBreakpointValue({ xl: true, base: false })
  return (
    <Fade in>
      <Grid
        width="100%"
        templateColumns={
          isViewXL
            ? 'repeat(12, 1fr)'
            : isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(5, 1fr)'
        }
        padding={
          isMobile
            ? '10px'
            : isViewXL
            ? '40px 40px 20px 40px'
            : '40px 20px 20px 20px'
        }
      >
        <GridItem
          colSpan={isViewXL ? 3 : 1}
          display="flex"
          justifyContent="flex-start"
        ></GridItem>
        {children}
      </Grid>
    </Fade>
  )
}
