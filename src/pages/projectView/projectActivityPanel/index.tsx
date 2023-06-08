import { Box, useDisclosure } from '@chakra-ui/react'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import { AuthModal } from '../../../components/molecules'
import { fundingStages } from '../../../constants'
import { AuthContext, MobileViews, useProjectContext } from '../../../context'
import { useBtcContext } from '../../../context/btc'
import { IFundForm } from '../../../hooks'
import {
  FundingInput,
  FundingResourceType,
  ProjectFragment,
  ProjectReward,
  RewardFundingInput,
} from '../../../types/generated/graphql'
import { toInt, useMobileMode } from '../../../utils'
import { truthyFilter } from '../../../utils/array'
import {
  InfoPageSkeleton,
  ProjectFundingInitialInfoScreen,
} from './screens/ProjectFundingInitialInfoScreen'
import { ProjectFundingQRScreen } from './screens/ProjectFundingQRScreen'
import { ProjectFundingRewardSelectionScreen } from './screens/ProjectFundingRewardSelectionScreen'
import { ProjectFundingSelectionFormScreen } from './screens/ProjectFundingSelectionFormScreen'
import { SuccessScreen } from './screens/SuccessScreen'
import { useStyles } from './styles'

type Props = {
  project?: ProjectFragment | null
  resourceType: FundingResourceType
  resourceId: number
}

type FilteredReward = { id: number; quantity: number }

export const ProjectActivityPanel = ({ resourceType, resourceId }: Props) => {
  const { user } = useContext(AuthContext)

  const { btcRate } = useBtcContext()
  const isMobile = useMobileMode()

  const { mobileView, setMobileView, project, fundingFlow, fundForm } =
    useProjectContext()

  // required for knowing the rewards and the funds
  const {
    state: formState,
    setTarget,
    setState: setFormState,
    updateReward,
    resetForm,
  } = fundForm

  const {
    fundState,
    setFundState,
    fundingTx,
    resetFundingFlow,
    requestFunding,
  } = fundingFlow

  const {
    isOpen: loginIsOpen,
    onOpen: loginOnOpen,
    onClose: loginOnClose,
  } = useDisclosure()

  const inView = [
    MobileViews.contribution,
    MobileViews.leaderboard,
    MobileViews.funding,
    MobileViews.rewards,
  ].includes(mobileView)

  const classes = useStyles({ isMobile, inView })

  useEffect(() => {
    if (mobileView === MobileViews.funding) {
      setFundState(fundingStages.form)
    } else {
      resetFundingFlow()
      resetForm()
    }
  }, [mobileView, resetForm, resetFundingFlow, setFundState])

  useEffect(() => {
    if (user && user.id) {
      setFormState('anonymous', false)
    }
  }, [setFormState, user])

  useEffect(() => {
    if (!formState.anonymous && (!user || !user.id)) {
      setFormState('anonymous', true)
    }
  }, [formState.anonymous, loginOnOpen, setFormState, user])

  const handleCloseButton = () => {
    setMobileView(MobileViews.contribution)
    resetFundingFlow()
    resetForm()
  }

  const handleQRCloseButton = () => {
    setFundState(fundingStages.form)
  }

  const formatFundingInput = (state: IFundForm) => {
    const {
      donationAmount,
      rewardsCost,
      shippingCost: cost,
      shippingDestination: destination,
      rewardsByIDAndCount,
      email,
      anonymous,
      comment,
      media,
    } = state

    const input: FundingInput = {
      projectId: toInt(project?.id),
      anonymous,
      ...(donationAmount !== 0 && { donationInput: { donationAmount } }),
      metadataInput: {
        ...(email && { email }),
        ...(media && { media }),
        ...(comment && { comment }),
      },
      sourceResourceInput: {
        resourceId: toInt(resourceId) || toInt(project?.id),
        resourceType: resourceType || 'project',
      },
    }

    if (
      state.rewardsByIDAndCount &&
      Object.entries(state.rewardsByIDAndCount).length > 0 &&
      rewardsByIDAndCount
    ) {
      const rewardsArray = Object.keys(rewardsByIDAndCount).map((key) => ({
        id: toInt(key),
        quantity: rewardsByIDAndCount[key as keyof ProjectReward],
      }))
      const filteredRewards = rewardsArray.filter(
        (reward): reward is FilteredReward =>
          reward.quantity !== 0 && reward.quantity !== undefined,
      )
      const rewardInput: RewardFundingInput = {
        shipping: { cost, destination },
        rewards: filteredRewards,
        rewardsCost: Math.round(rewardsCost / btcRate),
      }
      input.rewardInput = rewardInput
    }

    return input
  }

  const handleFund = async () => {
    const input = formatFundingInput(formState)
    requestFunding(input)
  }

  const renderPanelContent = () => {
    if (!project) {
      return <InfoPageSkeleton />
    }

    if (mobileView === MobileViews.rewards) {
      return <ProjectFundingRewardSelectionScreen />
    }

    switch (fundState) {
      case fundingStages.initial:
        return (
          <ProjectFundingInitialInfoScreen
            {...{
              project,
              fundingTx,
              btcRate,
            }}
          />
        )
      case fundingStages.form:
        return (
          <ProjectFundingSelectionFormScreen
            isMobile={isMobile}
            handleCloseButton={handleCloseButton}
            formState={formState}
            setFormState={setFormState}
            setTarget={setTarget}
            updateReward={updateReward}
            handleFund={handleFund}
            rewards={project.rewards?.filter(truthyFilter)}
            type={project.type}
            name={project.name}
          />
        )
      case fundingStages.started:
        return (
          <ProjectFundingQRScreen
            state={formState}
            project={project}
            fundingFlow={fundingFlow}
            handleCloseButton={handleQRCloseButton}
          />
        )
      case fundingStages.completed:
        return (
          <SuccessScreen
            fundingState={formState}
            project={project}
            fundingTx={fundingTx}
            handleCloseButton={handleCloseButton}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      <Box
        className={classNames(classes.container)}
        flex={2}
        maxWidth={isMobile ? 'auto' : '450px'}
        width={isMobile ? '100%' : undefined}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        backgroundColor="neutral.0"
        marginTop={isMobile ? '0px' : '20px'}
        height="calc(100% - 20px)"
        borderTopLeftRadius={isMobile ? 'initial' : '8px'}
        overflow="hidden"
        borderTop={isMobile ? 'none' : '2px solid'}
        borderLeft="2px solid"
        borderColor="neutral.200"
      >
        {renderPanelContent()}
      </Box>

      <AuthModal isOpen={loginIsOpen} onClose={loginOnClose} />
    </>
  )
}
