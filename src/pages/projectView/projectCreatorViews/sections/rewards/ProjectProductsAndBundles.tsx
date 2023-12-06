import { Stack, VStack, HStack, useControllableState } from '@chakra-ui/react'
import { RewardsHeader, RewardsTabs, RewardsTable, ItemsTable } from './components'
import {
  CardLayout
} from '../../../../../components/layouts'

export const ProjectProductsAndBundles = () => {

  const [tabState, setTabState] = useControllableState({ defaultValue: 'rewards' })

  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      pt={{ base: '10px', lg: '20px' }}
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '10px', lg: '80px' }}
      spacing={{ base: '10px', lg: '20px' }}
    >
      <CardLayout h="auto" padding="30px 30px" minWidth="100%">
        <RewardsHeader />
        <RewardsTabs tabState={tabState} setTabState={setTabState} />
        {tabState == 'rewards' && <RewardsTable /> }
        {tabState != 'rewards' && <ItemsTable /> }
      </CardLayout>
    </VStack>
  )
}
