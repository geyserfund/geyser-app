import { useMutation, useQuery } from '@apollo/client'
import { HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
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
import { getPath } from '../../../constants'
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
import {
  defaultMilestone,
  MilestoneAdditionModal,
  RewardAdditionModal,
} from './components'
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
    isOpen: isMilestoneOpen,
    onClose: onMilestoneClose,
    onOpen: openMilestone,
  } = useDisclosure()

  const {
    isOpen: isRewardOpen,
    onClose: onRewardClose,
    onOpen: openReward,
  } = useDisclosure()

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

  const handleMilestoneSubmit = (milestones: ProjectMilestone[]) => {
    setMilestones(milestones)
    onMilestoneClose()
  }

  const handleRewardUpdate = (addReward: ProjectReward) => {
    const findReward = rewards.find((reward) => reward.id === addReward.id)

    if (findReward) {
      const newRewards = rewards.map((reward) => {
        if (reward.id === addReward.id) {
          return addReward
        }

        return reward
      })
      setRewards(newRewards)
    } else {
      setRewards([...rewards, addReward])
    }
  }

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
    >
      {milestones.length > 0 && (
        <>
          <HStack justifyContent="space-between" width="100%">
            <Text fontSize="18px" fontWeight={500}>
              Milestones
            </Text>
            <IconButtonComponent aria-label="edit" onClick={openMilestone}>
              <BiPencil />
            </IconButtonComponent>
          </HStack>

          {milestones.map((milestone, index) => (
            <VStack
              key={index}
              width="100%"
              border="1px solid"
              borderColor={colors.gray300}
              borderRadius="4px"
              alignItems="flex-start"
              padding="10px"
            >
              <Text>{milestone.name}</Text>
              <SatoshiAmount>{milestone.amount}</SatoshiAmount>
            </VStack>
          ))}
        </>
      )}

      {rewards.length > 0 ? (
        <>
          <HStack justifyContent="space-between" width="100%">
            <Text fontSize="18px" fontWeight={500}>
              Rewards
            </Text>
          </HStack>

          <VStack width="100%">
            {rewards.map((reward, index) => (
              <RewardCard
                key="index"
                width="100%"
                reward={reward}
                isSatoshi={isSatoshiRewards}
                handleEdit={() => {
                  setSelectedReward(reward)
                  openReward()
                }}
                handleRemove={() => triggerRewardRemoval(reward.id)}
              />
            ))}
          </VStack>
        </>
      ) : null}
    </VStack>
  )

  return (
    <>
      <ProjectCreateLayout
        handleBack={handleBack}
        sideView={sideView}
        title="Milestones & Rewards"
        subtitle="Step 2 of 3"
        percentage={67}
      >
        <VStack width="100%" alignItems="flex-start" spacing="40px">
          <ProjectLinks
            links={links}
            setLinks={setLinks}
            linkError={linkError}
          />
          <VStack width="100%" alignItems="flex-start">
            <Text>Project Milestones (optional)</Text>
            <ButtonComponent w="full" onClick={openMilestone}>
              Add a Milestone
            </ButtonComponent>
            <Text fontSize="12px">
              Milestones help you and your community keep track of your progress
              and set your expectations. You can edit Milestones later.
            </Text>
          </VStack>
          <VStack width="100%" alignItems="flex-start">
            <Text>Rewards (optional)</Text>
            <ButtonComponent
              w="full"
              onClick={() => {
                setSelectedReward(undefined)
                openReward()
              }}
            >
              Add a Reward
            </ButtonComponent>
            <Text fontSize="12px">
              Rewards are a powerful way of exchanging value with your
              community. Check here our list of prohibited items. You can edit
              or add Rewards later.
            </Text>
          </VStack>
          <ButtonComponent primary w="full" onClick={handleNext}>
            Continue
          </ButtonComponent>
        </VStack>
      </ProjectCreateLayout>

      {isMilestoneOpen && (
        <MilestoneAdditionModal
          isOpen={isMilestoneOpen}
          onClose={onMilestoneClose}
          availableMilestones={
            milestones.length > 0 ? milestones : [defaultMilestone]
          }
          onSubmit={handleMilestoneSubmit}
          projectId={data?.project?.id}
        />
      )}

      {isRewardOpen && (
        <RewardAdditionModal
          isOpen={isRewardOpen}
          onClose={onRewardClose}
          reward={selectedReward}
          onSubmit={handleRewardUpdate}
          isSatoshi={isSatoshiRewards}
          projectId={data?.project?.id}
        />
      )}
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
