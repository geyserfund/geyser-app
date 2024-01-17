import { Stack, VStack } from '@chakra-ui/react'

import { useProjectContext } from '../../../../../context'
import { MobileDivider } from '../../../../grants/components'
import { LaunchProjectNotice } from '../../../projectMainBody'
import {
  HistoricalComponent,
  InsightsHeader,
  InsightsStatsComponent,
  TransactionMethodComponent,
} from './components'
import { RewardSoldComponent } from './components/RewardSoldComponent'
import { TransactionRegionComponent } from './components/TransactionRegionComponent'

export const ProjectCreatorInsights = () => {
  const { project } = useProjectContext()
  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      pt={{ base: '10px', lg: '20px' }}
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '10px', lg: '40px' }}
      spacing={{ base: '10px', lg: '20px' }}
    >
      <InsightsHeader />
      <InsightsStatsComponent />
      <MobileDivider />
      <HistoricalComponent />
      <MobileDivider />
      <Stack w="full" direction={{ base: 'column', lg: 'row' }}>
        <TransactionMethodComponent flex={1} />
        <MobileDivider />
        <TransactionRegionComponent flex={1} />
      </Stack>
      <MobileDivider />
      <RewardSoldComponent />
      {project && <LaunchProjectNotice project={project} />}
    </VStack>
  )
}
