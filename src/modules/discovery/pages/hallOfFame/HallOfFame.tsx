import { VStack } from '@chakra-ui/react'

import { GeyserHeroes } from './components/GeyserHeroes'
import { HallOfFameTitle } from './components/HallOfFameTitle'
import { TopProjects } from './components/TopProjects'

export const HallOfFame = () => {
  return (
    <VStack w="full" spacing={4}>
      <HallOfFameTitle />
      <TopProjects />
      <GeyserHeroes />
    </VStack>
  )
}
