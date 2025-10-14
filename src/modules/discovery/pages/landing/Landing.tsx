import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { TitleBar } from './views/mainView/defaultView/sections/TitleBar.tsx'

export const Landing = () => {
  return (
    <VStack w="full" spacing={4} paddingTop={8}>
      <TitleBar />

      <Outlet />
    </VStack>
  )
}
