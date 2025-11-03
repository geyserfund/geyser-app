import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useParams } from 'react-router'

import Loader from '@/components/ui/Loader'
import { ProjectRewardForm } from '@/modules/project/forms/rewardForm/ProjectRewardForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'

export const RewardEdit = () => {
  const { loading } = useProjectAtom()

  const { rewardUUID } = useParams<{ rewardUUID: string }>()

  if (loading) {
    return <Loader />
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
