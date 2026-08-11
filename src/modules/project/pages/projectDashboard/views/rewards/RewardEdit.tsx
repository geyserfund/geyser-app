import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Navigate, useParams } from 'react-router'

import Loader from '@/components/ui/Loader'
import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { ProjectRewardForm } from '@/modules/project/forms/rewardForm/ProjectRewardForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { getPath } from '@/shared/constants/index.ts'

export const RewardEdit = () => {
  const { loading, project } = useProjectAtom()
  const stripeConfigured = Boolean(project.paymentMethods?.fiat?.stripe)

  const { rewardUUID } = useParams<{ rewardUUID: string }>()

  if (loading) {
    return <Loader />
  }

  if (isManagedRecoverableGrantProject(project) || (TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && !stripeConfigured)) {
    return <Navigate to={getPath('dashboardInfo', project.name)} replace />
  }

  return (
    <VStack w="full" paddingBottom={'120px'} minHeight="100%">
      <CardLayout minHeight="100%">
        <ProjectRewardForm
          buttonText={t('Update Product')}
          titleText={t('Edit Product')}
          isUpdate={true}
          isLaunch={false}
          rewardUUID={rewardUUID}
        />
      </CardLayout>
    </VStack>
  )
}
