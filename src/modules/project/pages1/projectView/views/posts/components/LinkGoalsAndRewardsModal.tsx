import { Box, Button, Checkbox, CheckboxGroup, Divider, HStack, VStack } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PiPlus } from 'react-icons/pi'

import { ImageWithReload } from '@/components/ui'
import { useProjectGoalsAPI } from '@/modules/project/API/useProjectGoalsAPI'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useGoalsAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Modal, SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { standardPadding } from '@/shared/styles'
import { ProjectGoalsFragment, ProjectRewardFragment } from '@/types'

import { PostFormType } from '../hooks/usePostForm'

type Props = {
  postId: number
  setValue: UseFormSetValue<PostFormType>
  projectRewardUUIDs: string[]
  projectGoalIds: any[]
}

export const LinkGoalsAndRewardsModal = ({ postId, setValue, projectRewardUUIDs, projectGoalIds }: Props) => {
  const { t } = useTranslation()

  const { isOpen, onClose, onOpen } = useModal()

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

  return (
    <>
      <Button size="md" variant={'soft'} colorScheme="neutral1" rightIcon={<PiPlus />} onClick={onOpen}>
        {t('Post links')}
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
        <Body size="sm" paddingX={standardPadding}>
          {t('Using links enables you to highlight a specific reward or goal, helping you direct people to it.')}
        </Body>
        <Rewards projectRewardUUIDs={existingProjectRewardUUIDs} updateRewardUUIDs={setExistingProjectRewardUUIDs} />
        <Divider />
        <Goals projectGoalIds={existingProjectGoalIds} updateGoalIds={setExistingProjectGoalIds} />

        <HStack w="full" paddingX={standardPadding}>
          <Button flex={1} variant="soft" colorScheme="neutral1" onClick={handleClose}>
            {t('Cancel')}
          </Button>
          <Button flex={1} variant="solid" colorScheme="primary1" onClick={handleLink}>
            {t('Link')}
          </Button>
        </HStack>
      </Modal>
    </>
  )
}

const Rewards = ({
  projectRewardUUIDs,
  updateRewardUUIDs,
}: {
  projectRewardUUIDs: string[]
  updateRewardUUIDs: (rewardIds: string[]) => void
}) => {
  const { t } = useTranslation()

  const { queryProjectRewards } = useProjectRewardsAPI(true)
  const { rewards } = useRewardsAtom()

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
      <Checkbox value={reward.uuid}>
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
}: {
  projectGoalIds: any[]
  updateGoalIds: (goalIds: number[]) => void
}) => {
  const { t } = useTranslation()

  const { queryInProgressGoals } = useProjectGoalsAPI(true)

  const { inProgressGoals } = useGoalsAtom()

  return (
    <VStack w="full" alignItems="flex-start">
      <Body size="md" medium paddingX={standardPadding}>
        {t('Goals')}
      </Body>
      <VStack w="full" alignItems="start" paddingX={standardPadding} maxHeight={'200px'} overflowY={'auto'}>
        {queryInProgressGoals.loading ? (
          [1, 2].map((i) => {
            return <RewardItemSkeleton key={i} />
          })
        ) : (
          <CheckboxGroup value={projectGoalIds} onChange={updateGoalIds}>
            {inProgressGoals.map((goal) => (
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
      <Checkbox value={goal.id}>
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
