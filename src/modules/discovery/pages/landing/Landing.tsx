import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { useMobileMode } from '@/utils'

import { FilterComponent } from './components/FilterComponent.tsx'
import { TitleBar } from './views/mainView/defaultView/sections/TitleBar.tsx'

export const Landing = () => {
  const isMobileMode = useMobileMode()

  return (
    <VStack w="full" spacing={4} paddingTop={8}>
      <TitleBar />

      {isMobileMode && <FilterComponent />}
      <Outlet />
    </VStack>
  )
}
