import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '@/components/ui/Loader'
import { defaultProjectReward } from '@/defaults'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavContainer } from '@/modules/project/navigation/ProjectNavContainer'
import { getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProjectRewardForm } from '../shared/ProjectRewardForm'

export const RewardCreate = () => {
  const navigate = useNavigate()
  const toast = useNotification()

  const { project, loading } = useProjectAtom()

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

  return (
    <VStack w="full" paddingBottom="120px">
      <ProjectNavContainer>
        <Button
          as={Link}
          to={getPath('projectRewards', project?.name)}
          size={{ base: 'md', lg: 'lg' }}
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('Back to rewards')}
        </Button>
        {/* <Button size={{ base: 'md', lg: 'lg' }} variant="solid" colorScheme="primary1">
          {t('Publish')}
        </Button> */}
      </ProjectNavContainer>

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
