import { VStack } from '@chakra-ui/react'

import { CardLayout } from '../../../../../../../../components/layouts'
import { useMobileMode } from '../../../../../../../../utils'
import { RewardsHeader, RewardsTable } from './components'

export const ProjectManageRewards = () => {
  const isMobile = useMobileMode()
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
      <CardLayout h="auto" padding={isMobile ? '10px 10px' : '20px 20px'} minWidth="100%" noMobileBorder>
        <RewardsHeader />
        <RewardsTable />
      </CardLayout>
    </VStack>
  )
}
