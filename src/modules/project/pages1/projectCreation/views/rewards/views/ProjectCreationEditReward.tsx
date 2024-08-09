import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectRewardForm } from '@/modules/project/pages1/projectView/views/rewards/shared'
import { ProjectReward } from '@/types'
import { useNotification } from '@/utils'

export const ProjectCreationEditReward = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  const { project, isProjectOwner } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  const params = useParams<{ rewardId: string; projectId: string }>()
  const navigate = useNavigate()

  const { updateReward } = useProjectRewardsAPI()

  const handleUpdateReward = (props: any) => {
    updateReward.execute({
      ...props,
      onCompleted(data) {
        if (!project) return

        navigate(-1)
        toast.success({
          title: 'Successfully updated!',
          description: `Reward ${data.projectRewardUpdate.name} was successfully updated`,
        })
      },
      onError(error) {
        toast.error({
          title: 'Failed to update reward',
          description: `${error}`,
        })
      },
    })
  }

  if (!project || !isProjectOwner) {
    return null
  }

  const reward = rewards?.find((pr) => {
    if (pr.id === params.rewardId) {
      return { ...pr, projectRewardId: pr.id }
    }
  }) as ProjectReward

  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      spacing={{ base: '10px', lg: '20px' }}
    >
      <ProjectRewardForm
        buttonText={t('Update Reward')}
        titleText={t('Edit Reward')}
        rewardSave={handleUpdateReward}
        rewardSaving={updateReward.loading}
        rewardData={reward}
        createOrUpdate="update"
        isLaunch={true}
      />
    </VStack>
  )
}
