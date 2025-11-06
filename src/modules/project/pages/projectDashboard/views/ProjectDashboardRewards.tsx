import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { ProjectRewards } from '../../projectView/index.ts'
import { DashboardLayout } from '../common/DashboardLayout.tsx'

export const ProjectDashboardRewards = () => {
  useProjectRewardsAPI(true)
  return (
    <DashboardLayout desktopTitle={t('Products')} width="full" overflow="hidden">
      <VStack width="100%" alignItems="flex-start" px={standardPadding}>
        <ProjectRewards />
      </VStack>
    </DashboardLayout>
  )
}
