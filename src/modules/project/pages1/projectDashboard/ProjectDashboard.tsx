import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { CardLayout } from '@/shared/components/layouts'
import { useMobileMode } from '@/utils'

import { DashboardMenuDesktop, DashboardNavLayout } from './navigation'

export const ProjectDashboard = () => {
  const isMobile = useMobileMode()

  return (
    <VStack w={'full'} h="full" paddingBottom={8}>
      <CardLayout dense noborder={isMobile} w="full" direction="row" spacing={0} height="100%">
        {!isMobile && <DashboardMenuDesktop />}
        <DashboardNavLayout>
          <Outlet />
        </DashboardNavLayout>
      </CardLayout>
    </VStack>
  )
}
