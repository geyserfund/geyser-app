import { VStack } from '@chakra-ui/react'

import { DashboardLayout } from '../../common'
import { ProjectDeleteUpdate } from './views/ProjectDeleteUpdate'
import { ProjectEmailUpdate } from './views/ProjectEmailUpdate'
import { ProjectRewardDenominationUpdate } from './views/ProjectGoalDenominationUpdate'
import { ProjectStatusUpdate } from './views/ProjectStatusUpdate'

export const ProjectDashboardSettings = () => {
  return (
    <DashboardLayout desktopTitle="Settings">
      <VStack flexGrow={1} spacing={6} paddingX={{ base: 0, lg: 6 }}>
        <ProjectEmailUpdate />
        <ProjectRewardDenominationUpdate />
        <ProjectStatusUpdate />
        <ProjectDeleteUpdate />
      </VStack>
    </DashboardLayout>
  )
}
