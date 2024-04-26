import { Box, Divider, VStack } from '@chakra-ui/react'
import { useRef } from 'react'

import { useFundCalc } from '../../../../../../../../helpers/fundingCalculation'
import { standardPadding } from '../../../../../../../../styles'
import { ProjectRewardForCreateUpdateFragment } from '../../../../../../../../types/generated/graphql'
import { useMobileMode, useNotification, validateEmail } from '../../../../../../../../utils'
import { useFundingContext } from '../../../../../../context'
import { ProjectFundingSummaryCard } from './components/ProjectFundingSummaryCard'
import { FundingFormSection } from './views/FundingFormSection'
import { FundingFormUserInfoSection } from './views/FundingFormUserInfoSection'

type Props = {
  handleCloseButton: () => void
  handleFund: () => void
  rewards?: ProjectRewardForCreateUpdateFragment[]
  name: string
}

export const FundingFormScreen = ({ handleCloseButton, handleFund, rewards, name }: Props) => {
  const isMobile = useMobileMode()
  const summaryCardRef = useRef<any>(null)

  const {
    fundForm: { state: formState, hasSelectedRewards, setState },
  } = useFundingContext()

  const { getTotalAmount } = useFundCalc(formState)
  const { toast } = useNotification()

  const handleSubmit = {
    contribution() {
      const valid = validateFundingAmount()
      if (valid) {
        setState('step', 'info')
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
        title: 'Email is required when purchasing a reward.',
        description: 'Please enter an email.',
        status: 'error',
      })
      return false
    }

    if (hasSelectedRewards && !validateEmail(formState.email)) {
      toast({
        title: 'A valid email is required.',
        description: 'Please enter a valid email.',
        status: 'error',
      })
      return false
    }

    return true
  }

  const validateFundingAmount = () => {
    // const isException = isProjectAnException(name)

    // if (!isException && getTotalAmount('dollar', name) >= MAX_FUNDING_AMOUNT_USD) {
    //   toast({
    //     title: `Payment above ${MAX_FUNDING_AMOUNT_USD} is not allowed at the moment.`,
    //     description: 'Please update the amount, or contact us for donating a higher amount.',
    //     status: 'error',
    //   })
    //   return false
    // }

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
      width="100%"
      height="100%"
      position="relative"
      alignItems="flex-start"
      backgroundColor="neutral.0"
      spacing={0}
      marginBottom={isMobile && summaryCardRef.current ? `${summaryCardRef.current.offsetHeight}px` : undefined}
    >
      <Box width="100%" overflowY="auto" flex={1} px={{ base: '10px', lg: '20px' }} pt={standardPadding}>
        {formState.step === 'contribution' ? (
          <FundingFormSection onBackClick={handleCloseButton} />
        ) : (
          <FundingFormUserInfoSection onBackClick={() => setState('step', 'contribution')} />
        )}
      </Box>
      <VStack
        backgroundColor="neutral.50"
        position={isMobile ? 'fixed' : 'relative'}
        bottom={0}
        width={'100%'}
        spacing={0}
      >
        <Divider borderTopWidth="2px" borderBottomWidth="0px" orientation="horizontal" marginTop="0px !important" />

        <ProjectFundingSummaryCard ref={summaryCardRef} onSubmit={handleSubmit[formState.step]} />
      </VStack>
    </VStack>
  )
}
