import { HStack, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'

export const ProjectCreationLayout = ({ children }: PropsWithChildren) => {
  return (
    <VStack width="100%" height="100%" paddingX={standardPadding} alignItems="center">
      <HStack w="100%" height="100%" maxWidth={dimensions.maxWidth}>
        <VStack w="200px">
          <Body>THis is the space ofr the side bar</Body>
        </VStack>
        <VStack flex={1}>{children}</VStack>
      </HStack>
    </VStack>
  )
}
