import { GridItem } from '@chakra-ui/react'

import { LandingCardBaseSkeleton } from '@/shared/components/layouts/index.ts'

export const LoadingProjectGridItems = ({ length = 15 }: { length?: number }) => {
  return [...Array(length)].map((_, index) => (
    <GridItem key={index}>
      <LandingCardBaseSkeleton />
    </GridItem>
  ))
}
