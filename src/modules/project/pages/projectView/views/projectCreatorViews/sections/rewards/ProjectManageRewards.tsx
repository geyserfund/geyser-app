import { VStack } from '@chakra-ui/react'

import { CardLayout } from '../../../../../../../../components/layouts'
import { RewardsHeader, RewardsTable } from './components'

export const ProjectManageRewards = () => {
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
      <CardLayout h="auto" padding="30px 30px" minWidth="100%">
        <RewardsHeader />
        <RewardsTable />
      </CardLayout>
    </VStack>
  )
}
