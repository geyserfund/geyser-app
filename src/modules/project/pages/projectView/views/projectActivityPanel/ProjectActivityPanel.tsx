import { Box } from '@chakra-ui/react'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import { FundFormType } from '@/modules/project/funding/state/fundingFormAtom'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'

import { AuthContext } from '../../../../../../context'
import { useBtcContext } from '../../../../../../context/btc'
import { useAuthModal } from '../../../../../../pages/auth/hooks'
import {
  FundingInput,
  FundingResourceType,
  OrderItemInput,
  OrderItemType,
  ProjectFragment,
  ProjectReward,
  QuoteCurrency,
} from '../../../../../../types'
import { toInt, useCustomTheme, useMobileMode } from '../../../../../../utils'
import { useFundingContext } from '../../../../context/FundingProvider'
import { FundingStages, useFundingStage } from '../../../../funding/state'
import { standardProjectPageSideMargin } from '../../constants'
import { FundingFormScreen, InfoScreen, InfoScreenSkeleton, QRScreen, SuccessScreen } from './screens'
import { useStyles } from './styles'

type Props = {
  project?: ProjectFragment | null
  resourceType: FundingResourceType
  resourceId: number
}

export const ProjectActivityPanel = ({ resourceType, resourceId }: Props) => {
  const { user } = useContext(AuthContext)
  const { colors } = useCustomTheme()
  const { usdRate } = useBtcContext()
  const isMobile = useMobileMode()

  const {
    // mobileView,

    project,
  } = useProjectAtom()

  const { rewards } = useRewardsAtom()

  const { resetFundingFlow, requestFunding, fundForm } = useFundingContext()

  const { state: formState, setState: setFormState, resetForm, hasSelectedRewards } = fundForm

  const {
    fundingStage,
    // setFundingStage
  } = useFundingStage()

  const { loginOnOpen } = useAuthModal()

  // const inView = [MobileViews.contribution, MobileViews.leaderboard, MobileViews.funding].includes(mobileView)

  const classes = useStyles({ isMobile })

  // useEffect(() => {
  //   if (mobileView === MobileViews.funding) {
  //     setFundingStage(FundingStages.form)
  //   }
  // }, [mobileView, resetForm, resetFundingFlow, setFundingStage])

  useEffect(() => {
    if (user && user.id) {
      setFormState('anonymous', false)
    }
  }, [setFormState, user])

  useEffect(() => {
    if (!user || !user.id) {
      setFormState('anonymous', true)
    }
  }, [loginOnOpen, setFormState, user])

  // useEffect(() => {
  //   if (fundingStage === FundingStages.completed) {
  //     refetch()
  //   }
  // }, [fundingStage, refetch])

  const handleCloseButton = () => {
    // setMobileView(MobileViews.contribution)
    resetFundingFlow()
    resetForm()
  }

  const formatFundingInput = (state: FundFormType) => {
    const { donationAmount, rewardsByIDAndCount, email, comment, media } = state

    const orderItemInputs: OrderItemInput[] = []
    if (hasSelectedRewards && rewardsByIDAndCount) {
      Object.keys(rewardsByIDAndCount).map((key) => {
        const rewardQuantity = rewardsByIDAndCount[key as keyof ProjectReward]
        if (rewardQuantity && rewardQuantity > 0) {
          orderItemInputs.push({
            itemId: toInt(key),
            itemType: OrderItemType.ProjectReward,
            quantity: rewardQuantity,
          })
        }
      })
    }

    const input: FundingInput = {
      projectId: toInt(project?.id),
      anonymous: !user || !user.id,
      donationAmount: toInt(donationAmount),
      metadataInput: {
        ...(email && { email }),
        ...(media && { media }),
        ...(comment && { comment }),
      },
      orderInput: {
        bitcoinQuote: {
          quote: usdRate,
          quoteCurrency: QuoteCurrency.Usd,
        },
        items: orderItemInputs,
      },
      sourceResourceInput: {
        resourceId: toInt(resourceId) || toInt(project?.id),
        resourceType: resourceType || 'project',
      },
    }

    return input
  }

  const handleFund = async () => {
    const input = formatFundingInput(formState)
    requestFunding(input)
  }

  const renderPanelContent = () => {
    if (!project) {
      return <InfoScreenSkeleton />
    }

    switch (fundingStage) {
      case FundingStages.initial:
        return <InfoScreen />
      case FundingStages.form:
        return (
          <FundingFormScreen
            handleCloseButton={handleCloseButton}
            handleFund={handleFund}
            rewards={rewards}
            name={project.name}
          />
        )
      case FundingStages.started:
        return <QRScreen project={project} onCloseClick={handleCloseButton} />
      case FundingStages.completed:
        return <SuccessScreen onCloseClick={handleCloseButton} />

      default:
        return null
    }
  }

  return (
    <Box
      className={classNames(classes.container)}
      flex={2}
      maxWidth={isMobile ? 'auto' : '490px'}
      width={isMobile ? '100%' : undefined}
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      backgroundColor="neutral.0"
      marginY={{ base: '0px', lg: '20px' }}
      mr={standardProjectPageSideMargin}
      height={'calc(100% - 40px)'}
      borderRadius={isMobile ? 'initial' : '8px'}
      overflowX="hidden"
      border={{ base: 'none', lg: `2px solid ${colors.neutral[200]}` }}
    >
      {renderPanelContent()}
    </Box>
  )
}
