import { useMutation } from '@apollo/client'
import { GridItem, HStack, Text } from '@chakra-ui/react'
import { forwardRef, useState } from 'react'

import { CardLayout } from '../../../../components/layouts'
import {
  DeleteConfirmModal,
  ProjectSectionBar,
  RewardCard,
} from '../../../../components/molecules'
import { fundingStages } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { MUTATION_UPDATE_PROJECT_REWARD } from '../../../../graphql/mutations'
import { useModal } from '../../../../hooks/useModal'
import {
  Project,
  ProjectRewardForCreateUpdateFragment,
  RewardCurrency,
} from '../../../../types'
import {
  isActive,
  toInt,
  useMobileMode,
  useNotification,
} from '../../../../utils'
import { truthyFilter } from '../../../../utils/array'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()

  const {
    project,
    setMobileView,
    updateProject,
    isProjectOwner,
    onRewardsModalOpen,
    fundingFlow: { fundState },
    fundForm: { updateReward },
  } = useProjectContext()

  const [selectedReward, setSelectedReward] =
    useState<ProjectRewardForCreateUpdateFragment>()

  const {
    isOpen: isRewardDeleteOpen,
    onClose: onRewardDeleteClose,
    onOpen: openRewardDelete,
  } = useModal()

  const [updateRewardMutation] = useMutation(MUTATION_UPDATE_PROJECT_REWARD)

  if (!project) {
    return null
  }

  const triggerRewardRemoval = (id?: number) => {
    const currentReward = project.rewards?.find((reward) => reward?.id === id)
    if (!currentReward) {
      return
    }

    setSelectedReward(currentReward)
    openRewardDelete()
  }

  const handleRemoveReward = async (id?: number) => {
    if (!id) {
      return
    }

    try {
      const currentReward = project.rewards?.find((reward) => reward?.id === id)

      await updateRewardMutation({
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
      const newRewards = project.rewards?.filter((reward) => reward?.id !== id)
      updateProject({ rewards: newRewards || [] } as Project)

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

  const renderRewards = () => {
    if (project.rewards && project.rewards.length > 0) {
      return project.rewards.filter(truthyFilter).map((reward) => {
        return (
          <HStack
            key={reward.id}
            pb={6}
            px={2}
            alignSelf="stretch"
            alignItems="stretch"
            justifySelf="stretch"
            justifyContent="stretch"
            maxWidth="350px"
            flexWrap="wrap"
          >
            <RewardCard
              key={reward.id}
              width="100%"
              reward={reward}
              isSatoshi={false}
              handleEdit={
                isProjectOwner
                  ? () => {
                      setSelectedReward(reward)
                      onRewardsModalOpen({ reward })
                    }
                  : undefined
              }
              handleRemove={
                isProjectOwner
                  ? () => triggerRewardRemoval(reward.id)
                  : undefined
              }
              onClick={() => {
                if (
                  fundState === fundingStages.initial &&
                  isActive(project.status)
                ) {
                  updateReward({ id: toInt(reward.id), count: 1 })
                  setMobileView(MobileViews.funding)
                }
              }}
            />
          </HStack>
        )
      })
    }

    return (
      <GridItem colSpan={isMobile ? 2 : 1}>
        <Text>There are no rewards available.</Text>
      </GridItem>
    )
  }

  if (!project.rewards.length) {
    return null
  }

  return (
    <>
      <CardLayout
        ref={ref}
        width="100%"
        flexDirection="column"
        alignItems="flex-start"
        spacing="25px"
        padding="24px"
      >
        <ProjectSectionBar name={'Rewards'} number={project.rewards.length} />

        <HStack width="100%" flexWrap="wrap" justifyContent="center">
          {renderRewards()}
        </HStack>
      </CardLayout>
      <DeleteConfirmModal
        isOpen={isRewardDeleteOpen}
        onClose={onRewardDeleteClose}
        title={`Delete reward ${selectedReward?.name}`}
        description={'Are you sure you want to remove the reward'}
        confirm={() => handleRemoveReward(selectedReward?.id)}
      />
    </>
  )
})
