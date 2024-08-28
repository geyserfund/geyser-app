import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Loader from '@/components/ui/Loader'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'
import { useProjectRewardQuery } from '@/types'
import { useNotification } from '@/utils'

import { ProjectRewardForm } from '../shared/ProjectRewardForm'

export const RewardEdit = () => {
  const navigate = useNavigate()
  const toast = useNotification()

  const { project, loading } = useProjectAtom()

  const { rewardId } = useParams<{ rewardId: string }>()

  const { loading: rewardLoading, data } = useProjectRewardQuery({
    skip: !rewardId,
    variables: {
      getProjectRewardId: rewardId,
    },
  })

  const { updateReward } = useProjectRewardsAPI()

  const handleUpdateReward = (props: any) => {
    updateReward.execute({
      ...props,
      onCompleted(data) {
        toast.success({
          title: 'Successfully updated!',
          description: `Reward ${data.projectRewardUpdate.name} was successfully updated`,
        })
        navigate(getPath('projectRewardView', project.name, data.projectRewardUpdate.id))
      },
      onError(error) {
        toast.error({
          title: 'Failed to update reward',
          description: `${error}`,
        })
      },
    })
  }

  const reward = data?.getProjectReward

  if (loading || rewardLoading || !reward) {
    return <Loader />
  }

  return (
    <VStack w="full" paddingBottom="120px">
      <TopNavContainerBar>
        <Button
          as={Link}
          to={getPath('projectRewards', project?.name)}
          size="lg"
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('Back to rewards')}
        </Button>
        {/* <Button size={{ base: 'md', lg: 'lg' }} variant="solid" colorScheme="primary1">
          {t('Publish')}
        </Button> */}
      </TopNavContainerBar>

      <ProjectRewardForm
        hideBackbutton
        buttonText={t('Update Reward')}
        titleText={t('Edit Reward')}
        createOrUpdate="update"
        rewardData={reward}
        rewardSave={handleUpdateReward}
        rewardSaving={updateReward.loading}
      />
    </VStack>
  )
}
