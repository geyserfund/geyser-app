import { useMutation } from '@apollo/client'
import { GridItem, HStack, Text, useDisclosure } from '@chakra-ui/react'
import { forwardRef, useState } from 'react'

import { CardLayout } from '../../../../components/layouts'
import {
  DeleteConfirmModal,
  ProjectSectionBar,
  RewardCard,
} from '../../../../components/molecules'
import { fundingStages, IFundingStages } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { MUTATION_UPDATE_PROJECT_REWARD } from '../../../../graphql/mutations'
import { UpdateReward } from '../../../../hooks'
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
import { RewardAdditionModal } from '../components'

type Props = {
  rewardsLength: number
  updateReward: UpdateReward
  fundState: IFundingStages
}

export const Rewards = forwardRef<HTMLDivElement, Props>(
  ({ fundState, updateReward, rewardsLength }, ref) => {
    const isMobile = useMobileMode()
    const { toast } = useNotification()

    const { project, setMobileView, updateProject, isProjectOwner } =
      useProjectContext()
    const [selectedReward, setSelectedReward] =
      useState<ProjectRewardForCreateUpdateFragment>()

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

    const handleRewardUpdate = (
      updateReward: ProjectRewardForCreateUpdateFragment,
    ) => {
      const findReward = project.rewards?.find(
        (reward) => reward?.id === updateReward.id,
      )

      if (findReward) {
        const newRewards = project.rewards?.map((reward) => {
          if (reward?.id === updateReward.id) {
            return updateReward
          }

          return reward
        })
        updateProject({ rewards: newRewards } as Project)
      }
    }

    const handleRemoveReward = async (id?: number) => {
      if (!id) {
        return
      }

      try {
        const currentReward = project.rewards?.find(
          (reward) => reward?.id === id,
        )

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
        const newRewards = project.rewards?.filter(
          (reward) => reward?.id !== id,
        )
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
              height="100%"
              spacing="20px"
              alignItems="stretch"
              justifyContent="stretch"
            >
              <RewardCard
                maxWidth="350px"
                key={reward.id}
                width="100%"
                mx={2}
                reward={reward}
                isSatoshi={false}
                handleEdit={
                  isProjectOwner
                    ? () => {
                        setSelectedReward(reward)
                        openReward()
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

    if (!rewardsLength) {
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
          <ProjectSectionBar name={'Rewards'} number={rewardsLength} />

          <HStack width="100%" justifyContent="center">
            {renderRewards()}
          </HStack>
        </CardLayout>
        {isRewardOpen && (
          <RewardAdditionModal
            isOpen={isRewardOpen}
            onClose={onRewardClose}
            reward={selectedReward}
            onSubmit={handleRewardUpdate}
            isSatoshi={false}
            projectId={parseInt(`${project.id}`, 10)}
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
  },
)
