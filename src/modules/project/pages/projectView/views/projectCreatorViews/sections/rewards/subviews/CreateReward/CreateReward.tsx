import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

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
  const location = useLocation()
  const { project, updateProject } = useProjectContext()

  const isLaunch = location.pathname.includes('launch')
  const category = location.state?.category

  const [createReward, { loading: createRewardLoading }] = useProjectRewardCreateMutation({
    onCompleted(data) {
      const existingRewards = project?.rewards || []
      updateProject({ rewards: [...existingRewards, data.projectRewardCreate] })
      toast({
        title: 'Successfully created reward!',
        status: 'success',
      })
      if (!project) return

      if (isLaunch) {
        navigate(-1)
      } else {
        navigate(getPath('projectManageRewards', project?.name))
      }
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

  if (category) {
    defaultProjectReward.category = category
  }

  return (
    <ProjectRewardForm
      buttonText={isLaunch ? t('Save reward') : t('Publish Reward')}
      titleText={t('Create Reward')}
      rewardSave={createReward}
      rewardSaving={createRewardLoading}
      rewardData={defaultProjectReward}
      createOrUpdate="create"
    />
  )
}
