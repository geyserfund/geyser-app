import { VStack } from '@chakra-ui/react'
import { Loader } from '@giphy/react-components'
import { useTranslation } from 'react-i18next'

import { ProjectRewardForm } from '@/modules/project/forms/rewardForm/ProjectRewardForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'

export const RewardCreate = () => {
  const { t } = useTranslation()
  const { loading } = useProjectAtom()

  if (loading) {
    return <Loader />
  }

  return (
    <VStack paddingBottom={'120px'}>
      <CardLayout w="auto">
        <ProjectRewardForm buttonText={t('Publish Product')} titleText={t('Create Product')} isUpdate={false} />
      </CardLayout>
    </VStack>
  )
}
