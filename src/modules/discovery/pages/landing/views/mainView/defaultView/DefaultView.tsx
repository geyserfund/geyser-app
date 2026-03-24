import { VStack } from '@chakra-ui/react'

import { Head } from '@/config/Head.tsx'
import { GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { BitcoinersStatement } from './sections/BitcoinersStatement.tsx'
import { HowItWorks } from './sections/HowItWorks.tsx'
import { JoinOurMailingList } from './sections/JoinOurMailingList.tsx'
import { JoinTheMovement } from './sections/JoinTheMovement.tsx'
import { LandingHero } from './sections/LandingHero.tsx'
import { LandingProjectShowcaseCarousel } from './sections/LandingProjectShowcaseCarousel.tsx'
import { RecentImpactPosts } from './sections/RecentImpactPosts.tsx'
import { SuccessStories } from './sections/SuccessStories.tsx'

export const DefaultView = () => {
  return (
    <VStack w="full" spacing={10} paddingTop={{ base: '8px', lg: '10px' }}>
      <Head image={GeyserMainSeoImageUrl} />
      <VStack w="full" spacing={{ base: 14, lg: 18 }} paddingBottom={40}>
        <LandingHero />
        <LandingProjectShowcaseCarousel />
        <SuccessStories />
        <HeroesMainPage />
        <HowItWorks />
        <BitcoinersStatement />
        <JoinOurMailingList />
        <RecentImpactPosts />
        <JoinTheMovement />
      </VStack>
    </VStack>
  )
}
