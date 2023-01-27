import { Box, Text, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'

import { AppFooter } from '../../components/molecules'
import { ButtonComponent } from '../../components/ui'
import { getPath, IFundingStages } from '../../constants'
import { fundingStages } from '../../constants'
import { useAuthContext } from '../../context'
import { UpdateReward } from '../../hooks'
import { colors } from '../../styles'
import { Project } from '../../types/generated/graphql'
import { useDarkMode, useMobileMode } from '../../utils'
import { ProjectDetailsCard } from './components/ProjectDetailsCard'
import { MobileViews, useProject } from './containers'
import { ProjectDetailsAccessoriesSections } from './ProjectDetailsAccessoriesSections'

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

export const ProjectDetailsMainBodyContainer = ({
  project,
  fundState,
  setFundState,
  updateReward,
}: Props) => {
  const isMobile = useMobileMode()
  const isDark = useDarkMode()

  const { mobileView, setMobileView } = useProject()

  const inView = mobileView === MobileViews.description

  const classes = useStyles({ isMobile, inView })
  const navigate = useNavigate()

  const { user, navigationContext } = useAuthContext()

  const isViewerTheProjectOwner = navigationContext.projectOwnerIDs.includes(
    Number(user.id),
  )

  const handleFundClick = () => {
    setFundState(fundingStages.form)
  }

  const handleFundClickMobile = () => {
    setFundState(fundingStages.form)
    setMobileView(MobileViews.funding)
  }

  const handleConnectNodeClick = () => {
    const nodeConfigurationPath = getPath('launchProjectWithNode', project.id)
    navigate(nodeConfigurationPath)
  }

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
            spacing="20px"
            alignItems="left"
            marginTop={isMobile ? '0px' : '20px'}
            maxWidth="1000px"
            w="100%"
            padding={isMobile ? '20px 10px 50px 10px' : '0px 40px 70px 40px'}
          >
            <ProjectDetailsCard
              project={project}
              fundButtonFunction={
                isMobile ? handleFundClickMobile : handleFundClick
              }
            />

            {isViewerTheProjectOwner && project.wallets.length === 0 && (
              <VStack
                paddingLeft="25%"
                paddingRight="25%"
                paddingBottom="5%"
                paddingTop="5%"
                backgroundColor={colors.primary50}
              >
                <Text color={colors.gray500} paddingBottom="5%">
                  Your project is not live yet as you have not added a wallet
                  where you can receive funds. Head back to the project creation
                  flow to add a wallet.
                </Text>

                <ButtonComponent
                  primary={true}
                  w="full"
                  onClick={handleConnectNodeClick}
                >
                  Connect Wallet
                </ButtonComponent>
              </VStack>
            )}

            <ProjectDetailsAccessoriesSections
              project={project}
              fundState={fundState}
              setFundState={setFundState}
              updateReward={updateReward}
            />
          </VStack>
        </VStack>
        <AppFooter />
      </Box>
    </Box>
  )
}
