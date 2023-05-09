import { useMutation } from '@apollo/client'
import {
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { useState } from 'react'

import { CardLayout } from '../../../../components/layouts'
import {
  DeleteConfirmModal,
  ProjectSectionBar,
  RewardCard,
} from '../../../../components/molecules'
import { fundingStages, ID, IFundingStages } from '../../../../constants'
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
import { RewardAdditionModal } from '../components'

type Props = {
  updateReward: UpdateReward
  fundState: IFundingStages
}

export const Rewards = ({ fundState, updateReward }: Props) => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()

  const { project, setMobileView, updateProject, isProjectOwner } =
    useProjectContext()
  const [isSmallerThan1302] = useMediaQuery('(max-width: 1302px)')
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

  const rewardsLength = project.rewards ? project.rewards.length : 0
  const isRewardBased = project.rewards && project.rewards.length > 0

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
      return project.rewards.map((reward) => {
        if (reward) {
          return (
            <GridItem key={reward.id} colSpan={isSmallerThan1302 ? 2 : 1}>
              <RewardCard
                maxWidth="350px"
                key={reward.id}
                width="100%"
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
            </GridItem>
          )
        }
      })
    }

    return (
      <GridItem colSpan={isMobile ? 2 : 1}>
        <Text>There are no rewards available.</Text>
      </GridItem>
    )
  }

  if (!isRewardBased) {
    return null
  }

  return (
    <>
      <CardLayout
        id={ID.project.view.rewards}
        width="100%"
        flexDirection="column"
        alignItems="flex-start"
        spacing="25px"
        padding="24px"
      >
        <ProjectSectionBar name={'Rewards'} number={rewardsLength} />

        <HStack width="100%" justifyContent="center">
          <SimpleGrid
            columns={isSmallerThan1302 ? 1 : 2}
            spacingX="20px"
            spacingY="20px"
          >
            {renderRewards()}
          </SimpleGrid>
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
}
