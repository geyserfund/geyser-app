import { Box } from '@chakra-ui/react'
import classNames from 'classnames'
import { Outlet } from 'react-router-dom'

import { MobileViews, useProjectContext } from '../../../context'
import { useMobileMode } from '../../../utils'
import { useProjectLayoutStyles } from '../projectMainBody'

export const ProjectCreatorViews = () => {
  const isMobile = useMobileMode()

  const { mobileView } = useProjectContext()

  const inView = [
    MobileViews.overview,
    MobileViews.insights,
    MobileViews.contributors,
  ].includes(mobileView)

  const classes = useProjectLayoutStyles({ isMobile, inView })

  return (
    <Box
      className={classNames(classes.container)}
      backgroundColor="neutral.50"
      height="100%"
      w="100%"
      flexDirection="column"
      overflow="hidden"
    >
      <Box w="100%" className={classes.detailsContainer}>
        <Outlet />
      </Box>
    </Box>
  )
}
