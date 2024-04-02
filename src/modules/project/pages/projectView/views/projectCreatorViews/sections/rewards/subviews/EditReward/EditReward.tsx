import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../../../../../../../../../constants'
import { useProjectContext } from '../../../../../../../../../../context'
import { ProjectReward, useProjectRewardUpdateMutation } from '../../../../../../../../../../types/generated/graphql'
import { useNotification } from '../../../../../../../../../../utils'
import { ProjectRewardForm } from '../Shared/ProjectRewardForm'

export const ProjectEditReward = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { project, updateProject, isProjectOwner } = useProjectContext()
  const params = useParams<{ rewardId: string; projectId: string }>()
  const navigate = useNavigate()

  const [updateReward, { loading: updateRewardLoading }] = useProjectRewardUpdateMutation({
    onCompleted(data) {
      const newRewards = project?.rewards?.map((pr) => {
        if (pr.id === params.rewardId) {
          return data.projectRewardUpdate
        }

        return pr
      })
      updateProject({ rewards: newRewards })
      toast({
        title: 'Successfully updated!',
        description: `Reward ${data.projectRewardUpdate.name} was successfully updated`,
        status: 'success',
      })
      navigate(getPath('projectManageRewards', project?.name || ''))
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
    <ProjectRewardForm
      buttonText={t('Update Reward')}
      titleText={t('Edit Reward')}
      rewardSave={updateReward}
      rewardSaving={updateRewardLoading}
      rewardData={reward}
      createOrUpdate="update"
    />
  )
}
