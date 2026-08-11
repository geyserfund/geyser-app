import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Navigate } from 'react-router'

import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI.ts'
import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { ProjectRewards } from '../../projectView/views/rewards/ProjectRewards.tsx'
import { DashboardLayout } from '../common/DashboardLayout.tsx'

export const ProjectDashboardRewards = () => {
  const { project } = useProjectAtom()
  useProjectRewardsAPI(true)
  const stripeConfigured = Boolean(project.paymentMethods?.fiat?.stripe)

  if (isManagedRecoverableGrantProject(project) || (TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && !stripeConfigured)) {
    return <Navigate to={getPath('dashboardInfo', project.name)} replace />
  }

  return (
    <DashboardLayout desktopTitle={t('Products')} width="full" overflow="hidden">
      <VStack width="100%" alignItems="flex-start" px={standardPadding}>
        <ProjectRewards />
      </VStack>
    </DashboardLayout>
  )
}
