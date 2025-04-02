import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'

import Loader from '@/components/ui/Loader'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { ProjectRewardForm } from '../shared'

export const RewardEdit = () => {
  const { loading } = useProjectAtom()

  const { rewardUUID } = useParams<{ rewardUUID: string }>()

  if (loading) {
    return <Loader />
  }

  return (
    <VStack w="full" paddingBottom="120px">
      <ProjectRewardForm
        buttonText={t('Update Reward')}
        titleText={t('Edit Reward')}
        isUpdate={true}
        isLaunch={false}
        rewardUUID={rewardUUID}
      />
    </VStack>
  )
}
