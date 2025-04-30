import { VStack } from '@chakra-ui/react'
import { Loader } from '@giphy/react-components'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { ProjectRewardForm } from '../shared'

export const RewardCreate = () => {
  const { t } = useTranslation()
  const { loading } = useProjectAtom()

  if (loading) {
    return <Loader />
  }

  return (
    <VStack w="full" paddingBottom="120px">
      <ProjectRewardForm buttonText={t('Publish Product')} titleText={t('Create Product')} isUpdate={false} />
    </VStack>
  )
}
