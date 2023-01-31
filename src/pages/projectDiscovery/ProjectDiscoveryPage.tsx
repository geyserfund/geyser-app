import { VStack } from '@chakra-ui/react'

import { AppFooter } from '../../components/molecules'
import { TopBanner } from '../landing/components'
import { ProjectDiscoveryPageGridSection } from './components'

export const ProjectDiscoveryPage = () => {
  return (
    <VStack
      position="relative"
      width="100%"
      height="100%"
      justifyContent="space-between"
    >
      <TopBanner />

      <ProjectDiscoveryPageGridSection />

      <AppFooter />
    </VStack>
  )
}
