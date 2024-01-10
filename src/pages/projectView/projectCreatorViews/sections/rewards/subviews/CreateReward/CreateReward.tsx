import { ProjectRewardForm } from '../Shared/ProjectRewardForm'
import { useTranslation } from 'react-i18next'
import {
  useProjectRewardCreateMutation,
} from '../../../../../../../types/generated/graphql'
import {useNotification} from '../../../../../../../utils'
import { useProjectContext } from '../../../../../../../context'
import { defaultProjectReward } from '../../../../../../../defaults'
import { useNavigate } from 'react-router-dom'
import { getPath } from '../../../../../../../constants'

export const ProjectCreateReward = () => {

  const { t } = useTranslation()
  const { toast } = useNotification()
  const navigate = useNavigate()
  const {project, updateProject} = useProjectContext();

  if(!project) {
    return null;
  }

  const [createReward, { loading: createRewardLoading }] =
    useProjectRewardCreateMutation({
      onCompleted(data) {
        const existingRewards = project.rewards || []
        updateProject({ rewards: [...existingRewards, data.projectRewardCreate] })
        toast({
          title: 'Successfully created reward!',
          status: 'success',
        })
        navigate(getPath('projectManageRewards', project.name))
      },
      onError(error) {
        toast({
          title: 'Failed to create reward',
          description: `${error}`,
          status: 'error',
        })
      },
    })

  return (
    <ProjectRewardForm 
      buttonText={t('Publish Reward')}
      titleText={t('Create Reward')}
      rewardSave={createReward}
      rewardSaving={createRewardLoading}
      rewardData={defaultProjectReward}
    />
  )
}