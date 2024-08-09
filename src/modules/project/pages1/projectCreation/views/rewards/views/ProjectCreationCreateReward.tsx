import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { defaultProjectReward } from '@/defaults'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectRewardForm } from '@/modules/project/pages1/projectView/views/rewards/shared'
import { useNotification } from '@/utils'

export const ProjectCreationCreateReward = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  const navigate = useNavigate()
  const location = useLocation()
  const { project } = useProjectAtom()

  const { createReward } = useProjectRewardsAPI()

  const category = location.state?.category

  const handleCreateReward = (props: any) => {
    createReward.execute({
      ...props,
      onCompleted() {
        toast.success({
          title: 'Successfully created reward!',
        })
        if (!project) return

        navigate(-1)
      },
      onError(error) {
        toast.error({
          title: 'Failed to create reward',
          description: `${error}`,
        })
      },
    })
  }

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
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      spacing={{ base: '10px', lg: '20px' }}
    >
      <ProjectRewardForm
        buttonText={t('Save reward')}
        titleText={t('Create Reward')}
        rewardSave={handleCreateReward}
        rewardSaving={createReward.loading}
        rewardData={defaultProjectReward}
        createOrUpdate="create"
        isLaunch={true}
      />
    </VStack>
  )
}
