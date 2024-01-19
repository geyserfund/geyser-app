import { VStack } from '@chakra-ui/react'

import { RewardByStatus } from './RewardByStatus'
import { RewardStatus } from './RewardTable'

export default function Rewards() {
  return (
    <VStack>
      <RewardByStatus status={RewardStatus.todo} />
      <RewardByStatus status={RewardStatus.shipped} />
      <RewardByStatus status={RewardStatus.delivered} />
    </VStack>
  )
}
