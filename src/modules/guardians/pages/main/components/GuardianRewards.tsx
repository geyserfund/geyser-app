import { VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'

import { guardianRewardsPhysicalItemsAtom } from '@/modules/guardians/state/guardianRewards.ts'

import { GuardianItemDisplay } from './GuardianItemDisplay.tsx'

export const GuardianRewards = () => {
  const guardianPhysicalRewards = useAtomValue(guardianRewardsPhysicalItemsAtom)
  return (
    <VStack w="full" spacing={{ base: 20, lg: 32 }}>
      {guardianPhysicalRewards.map((value) => {
        if (!value) return null
        return <GuardianItemDisplay key={value.details.title} {...value} />
      })}
    </VStack>
  )
}
