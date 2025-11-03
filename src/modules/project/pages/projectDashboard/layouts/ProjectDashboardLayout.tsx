import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { useMobileMode } from '@/utils'

import { DashboardMenuDesktop } from '../navigation'

export const ProjectDashboardLayout = () => {
  const isMobile = useMobileMode()

  return (
    <VStack w={'full'} h="full" paddingBottom={8}>
      <CardLayout
        dense
        noborder={isMobile}
        w="full"
        direction="row"
        spacing={0}
        height="100%"
        backgroundColor="utils.pbg"
      >
        {!isMobile && <DashboardMenuDesktop />}
        <Outlet />
      </CardLayout>
    </VStack>
  )
}
