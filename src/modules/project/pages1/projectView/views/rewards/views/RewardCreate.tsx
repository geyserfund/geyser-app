import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'

import Loader from '@/components/ui/Loader'
import { defaultProjectReward } from '@/defaults'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProjectRewardForm } from '../shared/ProjectRewardForm'
import { ProjectRewardFormFinal } from '../shared/ProjectRewardFormFinal'

export const RewardCreate = () => {
  const navigate = useNavigate()
  const toast = useNotification()

  const { project, loading } = useProjectAtom()

  const { createReward } = useProjectRewardsAPI()

  const handleCreateReward = (props: any) => {
    createReward.execute({
      ...props,
      onCompleted(data) {
        toast.success({
          title: 'Successfully created reward!',
        })
        navigate(getPath('projectRewardView', project.name, data.projectRewardCreate.id))
      },
      onError(error) {
        toast.error({
          title: 'Failed to create reward',
          description: `${error}`,
        })
      },
    })
  }

  if (loading) {
    return <Loader />
  }

  return (
    <VStack w="full" paddingBottom="120px">
      <ProjectRewardFormFinal buttonText={t('Publish Reward')} titleText={t('Create Reward')} createOrUpdate="create" />

      <ProjectRewardForm
        hideBackbutton
        buttonText={t('Publish Reward')}
        titleText={t('Create Reward')}
        createOrUpdate="create"
        rewardData={defaultProjectReward}
        rewardSave={handleCreateReward}
        rewardSaving={createReward.loading}
      />
    </VStack>
  )
}
