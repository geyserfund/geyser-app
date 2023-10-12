import { useMutation } from '@apollo/client'
import { GridItem, HStack, Text } from '@chakra-ui/react'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import {
  DeleteConfirmModal,
  RewardCard,
} from '../../../../components/molecules'
import { TitleDivider } from '../../../../components/ui/TitleDivider'
import { fundingStages, ID } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { MUTATION_DELETE_PROJECT_REWARD } from '../../../../graphql/mutations'
import { useModal } from '../../../../hooks/useModal'
import {
  Project,
  ProjectRewardForCreateUpdateFragment,
} from '../../../../types'
import {
  isActive,
  toInt,
  useMobileMode,
  useNotification,
} from '../../../../utils'
import { truthyFilter } from '../../../../utils/array'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { toast } = useNotification()
  const location = useLocation()

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

  const handleClose = () => {
    setSelectedReward(undefined)
    onRewardDeleteClose()
  }

  const [deleteRewardMutation] = useMutation<
    any,
    { input: { projectRewardId: Number } }
  >(MUTATION_DELETE_PROJECT_REWARD, {
    onCompleted() {
      const newRewards = project?.rewards?.filter(
        (reward) => reward?.id !== selectedReward?.id,
      )
      updateProject({ rewards: newRewards || [] } as Project)

      handleClose()

      toast({
        title: 'Successfully removed!',
        description: `${t('Reward')} ${selectedReward?.name} ${t(
          'was successfully removed',
        )}`,
        status: 'success',
      })
    },
    onError(error) {
      handleClose()
      toast({
        title: 'Failed to remove reward',
        description: `${error}`,
        status: 'error',
      })
    },
  })

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

  const handleRemoveReward = async () => {
    if (!selectedReward?.id) {
      return
    }

    deleteRewardMutation({
      variables: {
        input: {
          projectRewardId: selectedReward.id,
        },
      },
    })
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
        <Text>{t('There are no rewards available.')}</Text>
      </GridItem>
    )
  }

  const isRewardTitleFixed = location.pathname.includes('rewards') && isMobile

  if (!project.rewards.length) {
    return null
  }

  return (
    <>
      <CardLayout
        ref={ref}
        id={ID.project.rewards.container}
        width="100%"
        flexDirection="column"
        alignItems="flex-start"
        spacing="25px"
        mobileDense
      >
        <TitleDivider
          badge={project.rewards.length}
          isFixed={isRewardTitleFixed}
        >
          {t('Rewards')}
        </TitleDivider>

        <HStack width="100%" flexWrap="wrap" justifyContent="center">
          {renderRewards()}
        </HStack>
      </CardLayout>
      <DeleteConfirmModal
        isOpen={isRewardDeleteOpen}
        onClose={handleClose}
        title={`${t('Delete reward')} ${selectedReward?.name}`}
        description={t('Are you sure you want to remove the reward')}
        confirm={handleRemoveReward}
      />
    </>
  )
})
