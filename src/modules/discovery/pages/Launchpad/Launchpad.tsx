import { VStack } from '@chakra-ui/react'

import { LaunchpadTitle } from './components/LaunchpadTitle.tsx'

export const Launchpad = () => {
  return (
    <VStack w="full" spacing={4}>
      <LaunchpadTitle />
    </VStack>
  )
}
