import { Box, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { useRef } from 'react'
import { createUseStyles } from 'react-jss'

import { MobileViews, useProjectContext } from '../../../context'
import { useMobileMode } from '../../../utils'
import { ProjectMobileNavigation } from '../projectNavigation/components/ProjectMobileNavigation'
import { ProjectNavigation } from '../projectNavigation/components/ProjectNavigation'
import { useProjectAnchors } from '../projectNavigation/hooks/useProjectAnchors'
import { LaunchProjectNotice } from './components'
import { Entries, Header, Milestones, Rewards, Story } from './sections'
import { CreatorSocial } from './sections/CreatorSocial'

type Rules = string

type Styles = {
  isMobile?: boolean
  inView: boolean
  fadeStarted?: boolean
}

const useStyles = createUseStyles<Rules, Styles>({
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
    flexDirection: 'column',
  },
})

export const ProjectMainBody = () => {
  const isMobile = useMobileMode()

  const { project, isProjectOwner } = useProjectContext()

  const { mobileView } = useProjectContext()

  const headerRef = useRef<HTMLDivElement>(null)
  const entriesRef = useRef<HTMLDivElement>(null)
  const rewardsRef = useRef<HTMLDivElement>(null)
  const milestonesRef = useRef<HTMLDivElement>(null)

  const projectAnchors = useProjectAnchors(project, {
    header: headerRef,
    entries: entriesRef,
    rewards: rewardsRef,
    milestones: milestonesRef,
  })

  const inView = mobileView === MobileViews.description

  const classes = useStyles({ isMobile, inView })

  return (
    <>
      {isMobile ? (
        <ProjectMobileNavigation />
      ) : (
        <ProjectNavigation {...projectAnchors} />
      )}
      <Box
        className={classNames(classes.container)}
        backgroundColor="neutral.50"
        flex={!isMobile ? 3 : undefined}
        height="100%"
        w="100%"
        flexDirection="column"
        overflow="hidden"
      >
        <Box className={classes.detailsContainer} id="project-scroll-container">
          <VStack alignItems="center" width="100%" flex="1">
            <VStack
              spacing="30px"
              alignItems="left"
              marginTop={isMobile ? '0px' : '20px'}
              maxWidth="1000px"
              w="100%"
              padding={isMobile ? '10px 10px 50px 10px' : '0px 40px 70px 40px'}
            >
              <Header ref={headerRef} />

              {project && isProjectOwner && (
                <LaunchProjectNotice project={project} />
              )}

              <CreatorSocial />

              <Story />

              <Entries ref={entriesRef} />

              <Rewards ref={rewardsRef} />

              <Milestones ref={milestonesRef} />
            </VStack>
          </VStack>
        </Box>
      </Box>
    </>
  )
}
