import { Stack, VStack } from '@chakra-ui/react'

import { getPath } from '../../../../../constants'
import { useProjectContext } from '../../../../../context'
import {
  ActivityComponent,
  ContributorsComponent,
  LearnComponent,
  OverviewHeader,
  StatsComponent,
} from './components'

export const ProjectCreatorOverview = () => {
  const { project } = useProjectContext()

  console.log('checking path', getPath('projectContributors', project?.name))
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      py="20px"
      px={{ base: '10px', lg: '80px' }}
      spacing="40px"
    >
      <VStack w="full" spacing="20px">
        <OverviewHeader />
        <StatsComponent />
        <ContributorsComponent />
        <ActivityComponent />
      </VStack>
      <VStack
        maxWidth={{ base: 'auto', lg: '350px' }}
        width="100%"
        alignItems="start"
      >
        <LearnComponent />
      </VStack>
    </Stack>
  )
}
