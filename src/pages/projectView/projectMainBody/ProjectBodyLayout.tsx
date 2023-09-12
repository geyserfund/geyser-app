import { Box } from '@chakra-ui/react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Outlet } from 'react-router-dom'

import { CardsStackLayout } from '../../../components/layouts'
import { MobileViews, useProjectContext } from '../../../context'
import { FundingResourceType } from '../../../types'
import { useMobileMode } from '../../../utils'
import { ProjectActivityPanel } from '../projectActivityPanel'

type Rules = string

type Styles = {
  isMobile?: boolean
  inView: boolean
  fadeStarted?: boolean
}

export const useProjectLayoutStyles = createUseStyles<Rules, Styles>({
  container: ({ isMobile, inView, fadeStarted }: Styles) => ({
    display: !isMobile || inView || fadeStarted ? 'flex' : 'none',
    position: fadeStarted ? 'absolute' : 'relative',
    top: fadeStarted ? 0 : undefined,
    left: fadeStarted ? 0 : undefined,
  }),
  twitter: {
    maxWidth: 450,
    '.twitter-widget-0': {
      width: '200px !important',
    },
  },
  aboutText: {
    width: '100%',
    fontSize: '14px',
  },
  detailsContainer: {
    height: '100%',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})

export const ProjectBodyLayout = () => {
  const isMobile = useMobileMode()

  const { mobileView, project } = useProjectContext()

  const inView = mobileView === MobileViews.description

  const classes = useProjectLayoutStyles({ isMobile, inView })

  return (
    <>
      <Box
        className={classNames(classes.container)}
        backgroundColor="neutral.50"
        flex={!isMobile ? 3 : undefined}
        height="100%"
        w="100%"
        flexDirection="column"
        overflow="hidden"
      >
        <Box w="100%" className={classes.detailsContainer}>
          <CardsStackLayout>
            <Outlet />
          </CardsStackLayout>
        </Box>
      </Box>
      <ProjectActivityPanel
        resourceType={FundingResourceType.Project}
        resourceId={project?.id}
      />
    </>
  )
}
