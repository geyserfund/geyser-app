import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectRewardForm } from '@/modules/project/pages1/projectView/views/rewards/shared'

import { ProjectReward, useRewardUpdateMutation } from '../../../../../types/generated/graphql'
import { useNotification } from '../../../../../utils'

export const ProjectCreationEditReward = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { project, isProjectOwner } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  const params = useParams<{ rewardId: string; projectId: string }>()
  const navigate = useNavigate()

  const [updateReward, { loading: updateRewardLoading }] = useRewardUpdateMutation({
    onCompleted(data) {
      const newRewards = rewards?.map((pr) => {
        if (pr.id === params.rewardId) {
          return data.projectRewardUpdate
        }

        return pr
      })
      // updateProject({ rewards: newRewards })
      toast({
        title: 'Successfully updated!',
        description: `Reward ${data.projectRewardUpdate.name} was successfully updated`,
        status: 'success',
      })
      navigate(-1)
      // refetch()
    },
    onError(error) {
      toast({
        title: 'Failed to update reward',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  if (!project || !isProjectOwner) {
    return null
  }

  const reward = project.rewards?.find((pr) => {
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
        rewardSave={updateReward}
        rewardSaving={updateRewardLoading}
        rewardData={reward}
        createOrUpdate="update"
        isLaunch={true}
      />
    </VStack>
  )
}
