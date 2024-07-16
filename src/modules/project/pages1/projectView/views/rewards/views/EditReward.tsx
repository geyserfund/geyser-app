import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Loader from '@/components/ui/Loader'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavContainer } from '@/modules/project/navigation/ProjectNavContainer'
import { addUpdateRewardAtom } from '@/modules/project/state/rewardsAtom'
import { getPath } from '@/shared/constants'
import { useProjectRewardQuery, useRewardUpdateMutation } from '@/types'
import { useNotification } from '@/utils'

import { ProjectRewardForm } from '../shared/ProjectRewardForm'

export const EditReward = () => {
  const navigate = useNavigate()

  const { project, loading } = useProjectAtom()

  const updateRewards = useSetAtom(addUpdateRewardAtom)

  const toast = useNotification()

  const { rewardId } = useParams<{ rewardId: string }>()

  const { loading: rewardLoading, data } = useProjectRewardQuery({
    skip: !rewardId,
    variables: {
      getProjectRewardId: rewardId,
    },
  })

  const [updateReward, { loading: updateRewardLoading }] = useRewardUpdateMutation({
    onCompleted(data) {
      updateRewards(data.projectRewardUpdate)
      toast.success({
        title: 'Successfully updated reward!',
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
  const reward = data?.getProjectReward

  if (loading || rewardLoading || !reward) {
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
        buttonText={t('Update Reward')}
        titleText={t('Edit Reward')}
        createOrUpdate="update"
        rewardData={reward}
        rewardSave={updateReward}
        rewardSaving={updateRewardLoading}
      />
    </VStack>
  )
}
