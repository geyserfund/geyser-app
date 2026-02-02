import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

export const Landing = () => {
  return (
    <VStack w="full" spacing={4} paddingTop={{ base: 2, lg: 6 }}>
      <Outlet />
    </VStack>
  )
}
