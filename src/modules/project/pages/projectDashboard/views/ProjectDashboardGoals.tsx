import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { ProjectGoals } from '../../projectView/index.ts'
import { DashboardLayout } from '../common/DashboardLayout.tsx'

export const ProjectDashboardGoals = () => {
  useProjectRewardsAPI(true)
  return (
    <DashboardLayout desktopTitle={t('Goals')} width="full" overflow="hidden">
      <VStack width="100%" alignItems="flex-start" px={standardPadding}>
        <ProjectGoals onNoGoalsProp={() => {}} />
      </VStack>
    </DashboardLayout>
  )
}
