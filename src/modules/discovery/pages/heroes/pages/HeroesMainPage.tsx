import { VStack } from '@chakra-ui/react'

import { GeyserHeroes } from '../components/GeyserHeroes'

export const HeroesMainPage = () => {
  return (
    <VStack w="full" h="full" overflowY={'hidden'} spacing={4}>
      <GeyserHeroes />
    </VStack>
  )
}
