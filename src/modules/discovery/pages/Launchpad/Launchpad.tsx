import { VStack } from '@chakra-ui/react'

import { Head } from '@/config/Head.tsx'
import { LaunchpadSeoImageUrl } from '@/shared/constants/index.ts'

import { LaunchpadProjects } from './components/LaunchpadProjects.tsx'
import { LaunchpadTitle } from './components/LaunchpadTitle.tsx'
export const Launchpad = () => {
  return (
    <VStack w="full" spacing={8}>
      <Head title={'Launchpad'} description={'Launchpad'} image={LaunchpadSeoImageUrl} type="article" />
      <LaunchpadTitle />
      <LaunchpadProjects />
    </VStack>
  )
}
