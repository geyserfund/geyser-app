import { Box, Divider, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'

import { MAX_FUNDING_AMOUNT_USD } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { useFundCalc } from '../../../../helpers/fundingCalculation'
import { ProjectRewardForCreateUpdateFragment } from '../../../../types/generated/graphql'
import { useMobileMode, useNotification } from '../../../../utils'
import { FundingFormSection } from '../components/FundingFormSection'
import { FundingFormUserInfoSection } from '../components/FundingFormUserInfoSection'
import { ProjectFundingSummaryCard } from '../components/ProjectFundingSummaryCard'

type Props = {
  handleCloseButton: () => void
  handleFund: () => void
  rewards?: ProjectRewardForCreateUpdateFragment[]
  name: string
}

export const ProjectFundingSelectionFormScreen = ({
  handleCloseButton,
  handleFund,
  rewards,
  name,
}: Props) => {
  const isMobile = useMobileMode()
  const summaryCardRef = useRef<any>(null)

  const [step, setStep] = useState<'contribution' | 'info'>('contribution')

  const {
    fundForm: { state: formState, hasSelectedRewards },
  } = useProjectContext()

  const { getTotalAmount } = useFundCalc(formState)
  const { toast } = useNotification()

  const hasRewards = rewards && rewards.length > 0

  const handleSubmit = {
    contribution() {
      const valid = validateFundingAmount()
      if (valid) {
        setStep('info')
      }
    },
    info() {
      const valid = validateFundingUserInfo()
      if (valid) {
        handleFund()
      }
    },
  }

  const validateFundingUserInfo = () => {
    if (hasSelectedRewards && !formState.email) {
      toast({
        title: 'Email is a required field when donating for a reward.',
        description: 'Please enter an email.',
        status: 'error',
      })
      return false
    }

    return true
  }

  const validateFundingAmount = () => {
    const isException = name === 'bitcoinizepos'
    if (
      !isException &&
      getTotalAmount('dollar', name) >= MAX_FUNDING_AMOUNT_USD
    ) {
      toast({
        title: `Payment above ${MAX_FUNDING_AMOUNT_USD} is not allowed at the moment.`,
        description:
          'Please update the amount, or contact us for donating a higher amount.',
        status: 'error',
      })
      return false
    }

    if (getTotalAmount('sats', name) < 1) {
      toast({
        title: 'The payment minimum is 1 satoshi.',
        description: 'Please update the amount.',
        status: 'error',
      })
      return false
    }

    return true
  }

  return (
    <VStack
      padding={isMobile ? '20px 10px' : '20px'}
      width="100%"
      height="100%"
      position="relative"
      alignItems="flex-start"
      backgroundColor="neutral.0"
      marginBottom={
        isMobile && summaryCardRef.current
          ? `${summaryCardRef.current.offsetHeight}px`
          : undefined
      }
    >
      <Box width="100%" overflowY="auto" flex={1}>
        {step === 'contribution' ? (
          <FundingFormSection onBackClick={handleCloseButton} />
        ) : (
          <FundingFormUserInfoSection
            onBackClick={() => setStep('contribution')}
          />
        )}
      </Box>
      <VStack
        backgroundColor="neutral.0"
        position={isMobile ? 'fixed' : 'relative'}
        bottom={isMobile ? '60px' : '0px'}
        paddingBottom="5px"
        width={isMobile ? 'calc(100% - 20px)' : '100%'}
      >
        {hasRewards && (
          <Divider
            borderTopWidth="3px"
            borderBottomWidth="0px"
            orientation="horizontal"
            marginTop="0px !important"
          />
        )}
        <ProjectFundingSummaryCard onSubmit={handleSubmit[step]} />
      </VStack>
    </VStack>
  )
}
