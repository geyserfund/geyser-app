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
  OrderItemInput,
  OrderItemType,
  ProjectFragment,
  ProjectReward,
  QuoteCurrency,
} from '../../../types'
import { toInt, useCustomTheme, useMobileMode } from '../../../utils'
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
  const { btcRate } = useBtcContext()
  const isMobile = useMobileMode()

  const { mobileView, setMobileView, project, fundingFlow, fundForm } = useProjectContext()

  const { state: formState, setState: setFormState, resetForm, hasSelectedRewards } = fundForm

  const { fundState, setFundState, resetFundingFlow, requestFunding } = fundingFlow

  const { isOpen: loginIsOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure()

  const inView = [MobileViews.contribution, MobileViews.leaderboard, MobileViews.funding].includes(mobileView)

  const classes = useStyles({ isMobile, inView })

  useEffect(() => {
    if (mobileView === MobileViews.funding) {
      setFundState(fundingStages.form)
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
    const { donationAmount, rewardsByIDAndCount, email, anonymous, comment, media } = state

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
      anonymous,
      donationAmount: toInt(donationAmount),
      metadataInput: {
        ...(email && { email }),
        ...(media && { media }),
        ...(comment && { comment }),
      },
      orderInput: {
        bitcoinQuote: {
          quote: btcRate,
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

    switch (fundState) {
      case fundingStages.initial:
        return <InfoScreen />
      case fundingStages.form:
        return (
          <FundingFormScreen
            handleCloseButton={handleCloseButton}
            handleFund={handleFund}
            rewards={project.rewards}
            name={project.name}
          />
        )
      case fundingStages.started:
        return (
          <QRScreen
            state={formState}
            project={project}
            fundingFlow={fundingFlow}
            handleCloseButton={handleQRCloseButton}
          />
        )
      case fundingStages.completed:
        return <SuccessScreen onCloseClick={handleCloseButton} />

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
        overflowX="hidden"
        borderTop={{ base: 'none', lg: `2px solid ${colors.neutral[200]}` }}
        borderLeft={{ base: 'none', lg: `2px solid ${colors.neutral[200]}` }}
      >
        {renderPanelContent()}
      </Box>

      <AuthModal isOpen={loginIsOpen} onClose={loginOnClose} />
    </>
  )
}
