import { VStack } from '@chakra-ui/react'

import { Head } from '@/config/Head.tsx'

import { GeyserHeroes } from '../components/GeyserHeroes'

export const HeroesMainPage = () => {
  return (
    <VStack w="full" h="full" overflowY={'hidden'} spacing={4}>
      <Head
        title="Geyser Heroes"
        description="Discover the top Bitcoin creators, contributors and ambassadors on Geyser. Ranked monthly and all-time by funds raised, donated and enabled."
      />
      <GeyserHeroes />
    </VStack>
  )
}
