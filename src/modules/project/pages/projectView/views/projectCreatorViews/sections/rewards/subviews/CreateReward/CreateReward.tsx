import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../../../../../../../../../constants'
import { defaultProjectReward } from '../../../../../../../../../../defaults'
import { useProjectRewardCreateMutation } from '../../../../../../../../../../types/generated/graphql'
import { useNotification } from '../../../../../../../../../../utils'
import { useProjectContext } from '../../../../../../../../context'
import { ProjectRewardForm } from '../Shared/ProjectRewardForm'

export const ProjectCreateReward = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const navigate = useNavigate()
  const { project, updateProject } = useProjectContext()

  const [createReward, { loading: createRewardLoading }] = useProjectRewardCreateMutation({
    onCompleted(data) {
      const existingRewards = project?.rewards || []
      updateProject({ rewards: [...existingRewards, data.projectRewardCreate] })
      toast({
        title: 'Successfully created reward!',
        status: 'success',
      })
      if (!project) return
      navigate(getPath('projectManageRewards', project?.name))
    },
    onError(error) {
      toast({
        title: 'Failed to create reward',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  if (!project) {
    return null
  }

  return (
    <ProjectRewardForm
      buttonText={t('Publish Reward')}
      titleText={t('Create Reward')}
      rewardSave={createReward}
      rewardSaving={createRewardLoading}
      rewardData={defaultProjectReward}
      createOrUpdate="create"
    />
  )
}