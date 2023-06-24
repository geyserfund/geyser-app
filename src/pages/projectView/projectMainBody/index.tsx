import { Box } from '@chakra-ui/react'
import classNames from 'classnames'
import { useRef } from 'react'
import { createUseStyles } from 'react-jss'

import { CardsStackLayout } from '../../../components/layouts'
import { MobileViews, useProjectContext } from '../../../context'
import { useMobileMode } from '../../../utils'
import { ProjectMobileNavigation } from '../projectNavigation/components/ProjectMobileNavigation'
import { ProjectNavigation } from '../projectNavigation/components/ProjectNavigation'
import { useProjectAnchors } from '../projectNavigation/hooks/useProjectAnchors'
import {
  Entries,
  Header,
  LaunchProjectNotice,
  Milestones,
  Rewards,
  Story,
} from './sections'
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
    alignItems: 'center',
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
        <Box
          w="100%"
          className={classes.detailsContainer}
          id="project-scroll-container"
        >
          <CardsStackLayout>
            <Header ref={headerRef} />

            {project && isProjectOwner ? (
              <LaunchProjectNotice project={project} />
            ) : null}

            <CreatorSocial />

            <Story />

            {projectAnchors.entriesLength && <Entries ref={entriesRef} />}
            {projectAnchors.rewardsLength && <Rewards ref={rewardsRef} />}
            {projectAnchors.milestonesLength && (
              <Milestones ref={milestonesRef} />
            )}
          </CardsStackLayout>
        </Box>
      </Box>
    </>
  )
}
