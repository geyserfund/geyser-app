import { VStack } from '@chakra-ui/react'

import { GeyserHeroes } from './components/GeyserHeroes'
import { HallOfFameTitle } from './components/HallOfFameTitle'

export const HallOfFame = () => {
  return (
    <VStack w="full" h="full" overflowY={'hidden'} spacing={4}>
      <HallOfFameTitle />
      <GeyserHeroes />
    </VStack>
  )
}
