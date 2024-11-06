import { Box, Button, Checkbox, CheckboxGroup, Divider, HStack, VStack } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PiPlus } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { useProjectGoalsAPI } from '@/modules/project/API/useProjectGoalsAPI'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useGoalsAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Modal, SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { standardPadding } from '@/shared/styles'
import { ProjectGoalsFragment, ProjectRewardFragment } from '@/types'

import { useGoalsModal } from '../../../hooks'
import { PostFormType } from '../hooks/usePostForm'

type Props = {
  postId: number
  setValue: UseFormSetValue<PostFormType>
  projectRewardUUIDs: string[]
  projectGoalIds: any[]
  projectName: string
}

export const LinkGoalsAndRewardsModal = ({
  postId,
  setValue,
  projectRewardUUIDs,
  projectGoalIds,
  projectName,
}: Props) => {
  const { t } = useTranslation()

  const { isOpen, onClose, onOpen } = useModal()

  const { queryProjectRewards } = useProjectRewardsAPI(true)
  const { rewards } = useRewardsAtom()

  const { queryInProgressGoals, queryCompletedGoals } = useProjectGoalsAPI(true)
  const { inProgressGoals, completedGoals } = useGoalsAtom()

  const [existingProjectRewardUUIDs, setExistingProjectRewardUUIDs] = useState<string[]>(projectRewardUUIDs)
  const [existingProjectGoalIds, setExistingProjectGoalIds] = useState<number[]>(projectGoalIds)

  const handleClose = () => {
    setExistingProjectGoalIds(projectGoalIds)
    setExistingProjectRewardUUIDs(projectRewardUUIDs)
    onClose()
  }

  const handleLink = () => {
    if (existingProjectRewardUUIDs !== projectRewardUUIDs) {
      setValue('projectRewardUUIDs', existingProjectRewardUUIDs, { shouldDirty: true })
    }

    if (existingProjectGoalIds !== projectGoalIds) {
      setValue('projectGoalIds', existingProjectGoalIds, { shouldDirty: true })
    }

    onClose()
  }

  const totalLinks = existingProjectGoalIds.length + existingProjectRewardUUIDs.length

  const hasGoals = inProgressGoals.length > 0 || completedGoals.length > 0
  const hasRewards = rewards.length > 0

  return (
    <>
      <Button size="md" variant={'soft'} colorScheme="neutral1" rightIcon={<PiPlus />} onClick={onOpen}>
        {t('Linked goals and rewards')}
        {totalLinks ? <Body as="span" color="primary1.11" paddingLeft="3px">{` (${totalLinks})`}</Body> : null}
      </Button>

      <Modal
        title={t('Link Goals and Rewards')}
        isOpen={isOpen}
        onClose={handleClose}
        bodyProps={{
          gap: 4,
          as: VStack,
          paddingX: 0,
        }}
      >
        {!hasGoals && !hasRewards ? (
          <NoGoalsAndRewards projectName={projectName} />
        ) : (
          <>
            <Body size="sm" paddingX={standardPadding}>
              {t('Using links enables you to highlight a specific reward or goal, helping you direct people to it.')}
            </Body>
            {hasRewards && (
              <>
                <Rewards
                  projectRewardUUIDs={existingProjectRewardUUIDs}
                  updateRewardUUIDs={setExistingProjectRewardUUIDs}
                  queryProjectRewards={queryProjectRewards}
                  rewards={rewards}
                />
                {hasGoals && (
                  <HStack w="full" paddingX={standardPadding}>
                    <Divider />
                  </HStack>
                )}
              </>
            )}

            {hasGoals && (
              <Goals
                projectGoalIds={existingProjectGoalIds}
                updateGoalIds={setExistingProjectGoalIds}
                queryInProgressGoals={queryInProgressGoals}
                queryCompletedGoals={queryCompletedGoals}
                inProgressGoals={inProgressGoals}
                completedGoals={completedGoals}
              />
            )}

            <HStack w="full" paddingX={standardPadding}>
              <Button flex={1} variant="soft" colorScheme="neutral1" onClick={handleClose}>
                {t('Cancel')}
              </Button>
              <Button flex={1} variant="solid" colorScheme="primary1" onClick={handleLink}>
                {t('Link')}
              </Button>
            </HStack>
          </>
        )}
      </Modal>
    </>
  )
}

const Rewards = ({
  projectRewardUUIDs,
  updateRewardUUIDs,
  queryProjectRewards,
  rewards,
}: {
  projectRewardUUIDs: string[]
  updateRewardUUIDs: (rewardIds: string[]) => void
  queryProjectRewards: any
  rewards: ProjectRewardFragment[]
}) => {
  const { t } = useTranslation()

  return (
    <VStack w="full" alignItems="flex-start">
      <Body size="md" medium paddingX={standardPadding}>
        {t('Rewards')}
      </Body>
      <VStack w="full" alignItems="start" maxHeight={'200px'} overflowY={'scroll'} paddingX={standardPadding}>
        {queryProjectRewards.loading ? (
          [1, 2].map((i) => {
            return <RewardItemSkeleton key={i} />
          })
        ) : (
          <CheckboxGroup value={projectRewardUUIDs} onChange={updateRewardUUIDs}>
            {rewards.map((reward) => (
              <RewardItem key={reward.id} reward={reward} />
            ))}
          </CheckboxGroup>
        )}
      </VStack>
    </VStack>
  )
}

const RewardItem = ({ reward }: { reward: ProjectRewardFragment }) => {
  return (
    <HStack spacing={2} w="full" justifyContent={'start'}>
      <Checkbox size="lg" value={reward.uuid}>
        <ImageWithReload
          src={reward.images[0]}
          alt={reward.name}
          minWidth={'32px'}
          width="32px"
          height={'32px'}
          borderRadius={'8px'}
        />
      </Checkbox>

      <Body size="sm" isTruncated>
        {reward.name}
      </Body>
    </HStack>
  )
}

const RewardItemSkeleton = () => {
  return (
    <HStack spacing={2}>
      <SkeletonLayout height={'24px'} width="24px" />
      <SkeletonLayout height={'32px'} width="32px" />
      <SkeletonLayout height={'24px'} width="130px" />
    </HStack>
  )
}

const Goals = ({
  projectGoalIds,
  updateGoalIds,
  queryInProgressGoals,
  queryCompletedGoals,
  inProgressGoals,
  completedGoals,
}: {
  projectGoalIds: any[]
  updateGoalIds: (goalIds: number[]) => void
  queryInProgressGoals: any
  queryCompletedGoals: any
  inProgressGoals: ProjectGoalsFragment[]
  completedGoals: ProjectGoalsFragment[]
}) => {
  const { t } = useTranslation()

  return (
    <VStack w="full" alignItems="flex-start">
      <Body size="md" medium paddingX={standardPadding}>
        {t('Goals')}
      </Body>
      <VStack w="full" alignItems="start" paddingX={standardPadding} maxHeight={'200px'} overflowY={'auto'}>
        {queryInProgressGoals.loading || queryCompletedGoals.loading ? (
          [1, 2].map((i) => {
            return <RewardItemSkeleton key={i} />
          })
        ) : (
          <CheckboxGroup value={projectGoalIds} onChange={updateGoalIds}>
            {[...inProgressGoals, ...completedGoals].map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))}
          </CheckboxGroup>
        )}
      </VStack>
    </VStack>
  )
}

const GoalItem = ({ goal }: { goal: ProjectGoalsFragment }) => {
  return (
    <HStack w="full" spacing={2}>
      <Checkbox size="lg" value={goal.id}>
        {goal.emojiUnifiedCode && (
          <Box>
            <Emoji size={24} unified={goal.emojiUnifiedCode} emojiStyle={EmojiStyle.NATIVE} />
          </Box>
        )}
      </Checkbox>

      <Body size="sm">{goal.title}</Body>
    </HStack>
  )
}

const NoGoalsAndRewards = ({ projectName }: { projectName: string }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { onGoalModalOpen } = useGoalsModal()

  const handleCreateReward = () => {
    navigate(getPath('projectRewardCreate', projectName))
  }

  const handleCreateGoal = () => {
    navigate(getPath('projectGoals', projectName))
    onGoalModalOpen()
  }

  return (
    <>
      <Body size="sm" paddingX={standardPadding}>
        {t('No goals or rewards found')}
      </Body>

      <HStack w="full" paddingX={standardPadding}>
        <Button flex={1} variant="solid" colorScheme="primary1" onClick={handleCreateReward}>
          {t('Create a reward')}
        </Button>
        <Button flex={1} variant="solid" colorScheme="primary1" onClick={handleCreateGoal}>
          {t('Create a goal')}
        </Button>
      </HStack>
    </>
  )
}
