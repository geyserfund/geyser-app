import { VStack } from '@chakra-ui/react'

import { GeyserHeroes } from '../components/GeyserHeroes'
import { HeroesMainPageTitle } from '../components/HeroesMainPageTitle'

export const HeroesMainPage = () => {
  return (
    <VStack w="full" h="full" overflowY={'hidden'} spacing={4}>
      <HeroesMainPageTitle />
      <GeyserHeroes />
    </VStack>
  )
}
