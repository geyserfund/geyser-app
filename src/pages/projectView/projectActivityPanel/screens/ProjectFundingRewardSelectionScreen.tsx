import { VStack } from '@chakra-ui/react'

import { FundingFormRewards } from '../components/FundingFormRewards'

export const ProjectFundingRewardSelectionScreen = () => {
  return (
    <VStack
      py={4}
      px={{ base: 2, lg: 4 }}
      width="100%"
      height="100%"
      position="relative"
      alignItems="flex-start"
      backgroundColor="neutral.0"
    >
      <FundingFormRewards />
    </VStack>
  )
}
