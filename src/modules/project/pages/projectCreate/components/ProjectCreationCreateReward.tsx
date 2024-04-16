import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { defaultProjectReward } from '../../../../../defaults'
import { useProjectRewardCreateMutation } from '../../../../../types/generated/graphql'
import { useNotification } from '../../../../../utils'
import { useProjectContext } from '../../../context'
import { ProjectRewardForm } from '../../projectView/views/projectCreatorViews/sections/rewards/subviews/Shared/ProjectRewardForm'

export const ProjectCreationCreateReward = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const { project, updateProject, refetch } = useProjectContext()

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

      navigate(-1)
      refetch()
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
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      height="100%"
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      spacing={{ base: '10px', lg: '20px' }}
    >
      <ProjectRewardForm
        buttonText={t('Save reward')}
        titleText={t('Create Reward')}
        rewardSave={createReward}
        rewardSaving={createRewardLoading}
        rewardData={defaultProjectReward}
        createOrUpdate="create"
        isLaunch={true}
      />
    </VStack>
  )
}
