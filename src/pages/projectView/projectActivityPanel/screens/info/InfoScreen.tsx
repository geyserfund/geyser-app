import { VStack } from '@chakra-ui/layout'

import { ActivityBrief } from './ActivityBrief'
import { InfoScreenFeed } from './InfoScreenFeed'

export const InfoScreen = () => {
  return (
    <VStack
      py={{ base: '0px', lg: '10px' }}
      spacing={4}
      width="100%"
      height="100%"
      overflowY="hidden"
      position="relative"
    >
      <ActivityBrief px={{ base: '10px', lg: '20px' }} />
      <InfoScreenFeed />
    </VStack>
  )
}
