import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

export const Landing = () => {
  return (
    <VStack w="full" spacing={4} paddingTop={{ base: 1, lg: 3 }}>
      <Outlet />
    </VStack>
  )
}
