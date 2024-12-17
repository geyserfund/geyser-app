import { forwardRef, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'

import { heroCardAtom } from '@/modules/profile/state/heroCardAtom'

import { HeroCard } from './HeroCard'

export const HeroCardDisplay = forwardRef((_, ref) => {
  const [heroCard] = useAtom(heroCardAtom)

  const user = heroCard?.user
  const stats = heroCard?.stats

  if (!user || !stats) {
    return null
  }

  return (
    <VStack spacing={4}>
      <HeroCard ref={ref} user={user} stats={stats} />
    </VStack>
  )
})
