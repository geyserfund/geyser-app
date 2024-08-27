import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '@/components/ui/Loader'
import { defaultProjectReward } from '@/defaults'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProjectRewardForm } from '../shared/ProjectRewardForm'

export const RewardCreate = () => {
  const navigate = useNavigate()
  const toast = useNotification()

  const { project, loading } = useProjectAtom()

  const { rewards } = useRewardsAtom()

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

  const hasRewards = rewards.length > 0

  return (
    <VStack w="full" paddingBottom="120px">
      <TopNavContainerBar>
        <Button
          as={Link}
          to={hasRewards ? getPath('projectRewards', project?.name) : getPath('project', project?.name)}
          size="lg"
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {hasRewards ? t('Back to rewards') : t('Back to project')}
        </Button>
      </TopNavContainerBar>

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
