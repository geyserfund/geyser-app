import { HStack, Stack, VStack } from '@chakra-ui/react'

import {
  ContributorsComponent,
  LearnComponent,
  OverviewHeader,
  StatsComponent,
} from './components'

export const ProjectCreatorOverview = () => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      pt="20px"
      pb="20px"
      px={{ base: '10px', lg: '0px' }}
    >
      <HStack w="full" flex="1" justifyContent="center" alignItems="start">
        <VStack
          w="full"
          maxWidth="1000px"
          spacing="20px"
          px={{ base: '0px', lg: '40px' }}
        >
          <OverviewHeader />
          <StatsComponent />
          <ContributorsComponent />
        </VStack>
      </HStack>

      <VStack
        maxWidth={{ base: '100%', lg: '450px' }}
        width="100%"
        alignItems="start"
      >
        <LearnComponent />
      </VStack>
    </Stack>
  )
}
