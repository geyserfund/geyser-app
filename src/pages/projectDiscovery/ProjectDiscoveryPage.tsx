import { Box } from '@chakra-ui/react'

import { AppFooter } from '../../components/molecules'
import { TopBanner } from '../landing/components'
import { ProjectDiscoveryPageGridSection } from './components'

export const ProjectDiscoveryPage = () => {
  return (
    <Box position="relative" width="full" height="full">
      <TopBanner />

      <ProjectDiscoveryPageGridSection />

      <AppFooter />
    </Box>
  )
}
