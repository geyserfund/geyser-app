import { Box, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'

import { AppFooter } from '../../../components/molecules'
import { IFundingStages } from '../../../constants'
import {
  MobileViews,
  useAuthContext,
  useProjectContext,
} from '../../../context'
import { UpdateReward } from '../../../hooks'
import { Project } from '../../../types/generated/graphql'
import { useDarkMode, useMobileMode } from '../../../utils'
import { NoWallet } from './components'
import { Entries, Summary } from './sections'
import { Milestones } from './sections/Milestones'
import { Rewards } from './sections/Rewards'
import { SectionNav } from './sections/SectionNav'

type Rules = string

type Styles = {
  isMobile: boolean
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

type Props = {
  project: Project
  fundState: IFundingStages
  setFundState: React.Dispatch<React.SetStateAction<IFundingStages>>
  updateReward: UpdateReward
}

export const ProjectMainBody = ({
  project,
  fundState,
  setFundState,
  updateReward,
}: Props) => {
  const isMobile = useMobileMode()
  const isDark = useDarkMode()

  const { mobileView } = useProjectContext()

  const inView = mobileView === MobileViews.description

  const classes = useStyles({ isMobile, inView })

  const { user, navigationContext } = useAuthContext()

  const isViewerTheProjectOwner = navigationContext.projectOwnerIDs.includes(
    Number(user.id),
  )

  return (
    <Box
      className={classNames(classes.container)}
      backgroundColor={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey4'}
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
            padding={isMobile ? '20px 10px 50px 10px' : '0px 40px 70px 40px'}
          >
            <Summary />

            {isViewerTheProjectOwner && <NoWallet project={project} />}

            <SectionNav />

            <Entries />

            <Rewards {...{ fundState, updateReward }} />

            <Milestones />
          </VStack>
        </VStack>
        <AppFooter />
      </Box>
    </Box>
  )
}
