import { Box, useDisclosure } from '@chakra-ui/react'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import { AuthModal } from '../../../components/molecules'
import { fundingStages } from '../../../constants'
import { AuthContext, MobileViews, useProjectContext } from '../../../context'
import { useBtcContext } from '../../../context/btc'
import { IFundForm, IFundFormState } from '../../../hooks'
import { IFundingInput, IRewardFundingInput } from '../../../interfaces'
import {
  FundingResourceType,
  Project,
  ProjectReward,
} from '../../../types/generated/graphql'
import { toInt, useMobileMode } from '../../../utils'
import {
  InfoPageSkeleton,
  ProjectFundingInitialInfoScreen,
} from './screens/ProjectFundingInitialInfoScreen'
import { ProjectFundingQRScreen } from './screens/ProjectFundingQRScreen'
import { ProjectFundingSelectionFormScreen } from './screens/ProjectFundingSelectionFormScreen'
import { SuccessScreen } from './screens/SuccessScreen'
import { useStyles } from './styles'

type Props = {
  project: Project
  fundingFlow: any
  resourceType: FundingResourceType
  resourceId: number
  fundForm: IFundFormState
}

export const ProjectActivityPanel = ({
  project,
  fundingFlow,
  fundForm,
  resourceType,
  resourceId,
}: Props) => {
  const { user } = useContext(AuthContext)

  const { btcRate } = useBtcContext()
  const isMobile = useMobileMode()

  const { mobileView, setMobileView } = useProjectContext()
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
    amounts,
    fundingRequestLoading,
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
  ].includes(mobileView)

  const classes = useStyles({ isMobile, inView })

  useEffect(() => {
    if (mobileView === MobileViews.funding) {
      setFundState(fundingStages.form)
    } else {
      resetFundingFlow()
      resetForm()
    }
  }, [mobileView])

  useEffect(() => {
    if (user && user.id) {
      setFormState('anonymous', false)
    }
  }, [user])

  useEffect(() => {
    if (!formState.anonymous && (!user || !user.id)) {
      loginOnOpen()
      setFormState('anonymous', true)
    }
  }, [formState.anonymous])

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

    const input: IFundingInput = {
      projectId: toInt(project.id),
      anonymous,
      ...(donationAmount !== 0 && { donationInput: { donationAmount } }),
      metadataInput: {
        ...(email && { email }),
        ...(media && { media }),
        ...(comment && { comment }),
      },
      sourceResourceInput: {
        resourceId: toInt(resourceId) || toInt(project.id),
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
        (reward) => reward.quantity !== 0,
      )
      const rewardInput: IRewardFundingInput = {
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

  const getActivityHeight = () => {
    return 'calc(100% - 20px)'
  }

  const renderPanelContent = () => {
    if (!project || !project.id) {
      return <InfoPageSkeleton />
    }

    switch (fundState) {
      case fundingStages.initial:
        return (
          <ProjectFundingInitialInfoScreen
            {...{
              project,
              fundingTx,
              btcRate,
              test: false,
            }}
          />
        )
      case fundingStages.form:
        return (
          <ProjectFundingSelectionFormScreen
            {...{
              fundingRequestLoading,
              isMobile,
              handleCloseButton,
              formState,
              setFormState,
              setTarget,
              updateReward,
              handleFund,
              rewards: project.rewards?.filter(
                (reward) => reward !== null,
              ) as ProjectReward[],
              type: project.type,
              name: project.name,
            }}
          />
        )
      case fundingStages.started:
        return (
          <ProjectFundingQRScreen
            state={formState}
            project={project}
            fundingFlow={fundingFlow}
            amounts={amounts}
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
        flex={!isMobile ? 2 : undefined}
        maxWidth={isMobile ? 'auto' : '450px'}
        width={isMobile ? '100%' : undefined}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        backgroundColor="#FFFFFF"
        marginTop={isMobile ? '0px' : '20px'}
        height={getActivityHeight()}
        borderTopLeftRadius={isMobile ? '' : '8px'}
        overflow="hidden"
        borderTop={isMobile ? 'none' : '2px solid'}
        borderLeft="2px solid"
        borderColor="brand.neutral200"
      >
        {renderPanelContent()}
      </Box>

      <AuthModal isOpen={loginIsOpen} onClose={loginOnClose} />
    </>
  )
}
