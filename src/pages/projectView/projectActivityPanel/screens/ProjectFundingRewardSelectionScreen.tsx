import { VStack } from '@chakra-ui/react'

import { useMobileMode } from '../../../../utils'
import { FundingFormRewards } from '../components/FundingFormRewards'

export const ProjectFundingRewardSelectionScreen = () => {
  const isMobile = useMobileMode()
  return (
    <VStack
      padding={isMobile ? '20px 10px' : '20px'}
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
