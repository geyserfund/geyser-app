import { VStack } from '@chakra-ui/react'

import { Head } from '@/config/Head.tsx'

import { GeyserHeroes } from '../components/GeyserHeroes'

export const HeroesMainPage = () => {
  return (
    <VStack w="full" h="full" overflowY={'hidden'} spacing={4}>
      <Head
        title="Bitcoin heroes hall of fame"
        description="Explore top Bitcoin contributors, creators, and ambassadors in the Geyser Heroes Hall of Fame."
        type="website"
      />
      <GeyserHeroes />
    </VStack>
  )
}
