import { useMutation, useQuery } from '@apollo/client'
import { HStack, Link, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router'

import { DeleteConfirmModal, RewardCard } from '../../../components/molecules'
import {
  ButtonComponent,
  IconButtonComponent,
  SatoshiAmount,
} from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { getPath, GeyserProhibitedItemsUrl } from '../../../constants'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql'
import { MUTATION_UPDATE_PROJECT_REWARD } from '../../../graphql/mutations'
import { useProjectLinksState } from '../../../hooks/graphqlState'
import { colors } from '../../../styles'
import type {
  Project,
  ProjectMilestone,
  ProjectReward,
} from '../../../types/generated/graphql'
import { RewardCurrency } from '../../../types/generated/graphql'
import { toInt, useNotification } from '../../../utils'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectLinks } from './components/ProjectLinks'

export const MilestoneAndRewards = () => {
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { toast } = useNotification()

  const [milestones, setMilestones] = useState<ProjectMilestone[]>([])
  const [rewards, setRewards] = useState<ProjectReward[]>([])
  const [selectedReward, setSelectedReward] = useState<ProjectReward>()

  const {
    isOpen: isRewardDeleteOpen,
    onClose: onRewardDeleteClose,
    onOpen: openRewardDelete,
  } = useDisclosure()

  const [isSatoshiRewards, setIsSatoshiRewards] = useState(false)

  const [updateReward] = useMutation(MUTATION_UPDATE_PROJECT_REWARD)

  const { loading, data } = useQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
    variables: { where: { id: toInt(params.projectId) } },
    fetchPolicy: 'network-only',
    onError() {
      toast({
        title: 'Error fetching project',
        status: 'error',
      })
    },
    onCompleted(data) {
      const { project }: { project: Project } = data
      if (project?.rewardCurrency) {
        setIsSatoshiRewards(project.rewardCurrency !== RewardCurrency.Usdcent)
      }

      if (Number(project?.milestones?.length) > 0) {
        setMilestones(data.project.milestones)
      }

      if (Number(project?.rewards?.length) > 0) {
        setRewards(data.project.rewards)
      }
    },
  })

  const { links, setLinks, handleLinks, linkError } = useProjectLinksState({
    project: data?.project,
  })

  const handleNext = async () => {
    if (linkError.includes(true)) {
      toast({
        status: 'error',
        title: 'Invalid link provided',
        description: 'Please update the link before proceding',
      })
      return
    }

    await handleLinks()
    navigate(getPath('launchProjectWithNode', params.projectId || ''))
  }

  const handleBack = () => {
    navigate(`/launch/${params.projectId}`)
  }

  const handleRemoveReward = async (id?: number) => {
    if (!id) {
      return
    }

    try {
      const currentReward = rewards.find((reward) => reward.id === id)
      await updateReward({
        variables: {
          input: {
            projectRewardId: toInt(id),
            deleted: true,
            name: currentReward?.name,
            cost: currentReward?.cost,
            costCurrency: RewardCurrency.Usdcent,
          },
        },
      })
      const newRewards = rewards.filter((reward) => reward.id !== id)
      setRewards(newRewards)
      onRewardDeleteClose()
      toast({
        title: 'Successfully removed!',
        description: `Reward ${currentReward?.name} was successfully removed`,
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Failed to remove reward',
        description: `${error}`,
        status: 'error',
      })
    }
  }

  const triggerRewardRemoval = (id?: number) => {
    const currentReward = rewards.find((reward) => reward.id === id)
    if (!currentReward) {
      return
    }

    setSelectedReward(currentReward)
    openRewardDelete()
  }

  if (loading) {
    return <Loader />
  }

  const sideView = (
    <VStack
      alignItems="flex-start"
      maxWidth="370px"
      spacing="10px"
      width="100%"
    ></VStack>
  )

  return (
    <>
      <ProjectCreateLayout
        handleBack={handleBack}
        sideView={sideView}
        title="Project details"
        subtitle="Step 2 of 3"
        percentage={67}
      >
        <VStack width="100%" alignItems="flex-start" spacing="40px">
          <ProjectLinks
            links={links}
            setLinks={setLinks}
            linkError={linkError}
          />

          <ButtonComponent primary w="full" onClick={handleNext}>
            Continue
          </ButtonComponent>
        </VStack>
      </ProjectCreateLayout>

      <DeleteConfirmModal
        isOpen={isRewardDeleteOpen}
        onClose={onRewardDeleteClose}
        title={`Delete reward ${selectedReward?.name}`}
        description={'Are you sure you want to remove the reward'}
        confirm={() => handleRemoveReward(selectedReward?.id)}
      />
    </>
  )
}
