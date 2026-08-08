import { VStack } from '@chakra-ui/react'
import { Loader } from '@giphy/react-components'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router'

import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { ProjectRewardForm } from '@/modules/project/forms/rewardForm/ProjectRewardForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants/index.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'

export const RewardCreate = () => {
  const { t } = useTranslation()
  const { loading, project } = useProjectAtom()
  const stripeConfigured = Boolean(project.paymentMethods?.fiat?.stripe)

  if (loading) {
    return <Loader />
  }

  if (TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && !stripeConfigured) {
    return <Navigate to={getPath('dashboardInfo', project.name)} replace />
  }

  return (
    <VStack paddingBottom={'120px'}>
      <CardLayout w="auto">
        <ProjectRewardForm buttonText={t('Publish Product')} titleText={t('Create Product')} isUpdate={false} />
      </CardLayout>
    </VStack>
  )
}
