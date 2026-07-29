import { forwardRef, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'

import { heroCardAtom } from '@/modules/profile/state/heroCardAtom'

import { HeroCard } from './HeroCard'

export const HeroCardDisplay = forwardRef((_, ref) => {
  const heroCard = useAtomValue(heroCardAtom)

  const user = heroCard?.user
  const stats = heroCard?.stats
  const impact = heroCard?.impact
  const trust = heroCard?.trust

  if (!user || (!stats && !impact)) {
    return null
  }

  return (
    <VStack spacing={4}>
      <HeroCard ref={ref} user={user} stats={stats} impact={impact} trust={trust} />
    </VStack>
  )
})
