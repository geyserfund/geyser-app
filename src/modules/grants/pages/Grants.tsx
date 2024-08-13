import { Box, VStack } from '@chakra-ui/react'

import PlatformLayout from '@/components/ui/PlatformLayout'

import GrantsHeader from '../components/GrantsHeader'
import OpenGrants from '../components/OpenGrants'
import { useGrants } from '../hooks/useGrants'

export const Grants = () => {
  const { openGrants } = useGrants()
  return (
    <PlatformLayout>
      <GrantsHeader />
      <VStack mt={10} w="100%" alignItems="center">
        <OpenGrants openGrants={openGrants} />
      </VStack>
      {/* TODO: Add footer and remove padding */}
      <Box height="100px" />
    </PlatformLayout>
  )
}
