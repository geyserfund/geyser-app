import { Box, Checkbox, Divider, HStack, VStack } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { useTranslation } from 'react-i18next'

import { ImageWithReload } from '@/components/ui'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type RewardItemType = {
  id: string
  uuid: string
  title: string
  image: string
}

type GoalItemType = {
  id: string
  title: string
  emojiUnifiedCode: string
}

export const LinkGoalsAndRewardsModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VStack alignItems="flex-start" p={4}>
        <Body size="md" bold>
          {t('Link Goals and Rewards')}
        </Body>
        <Body size="sm">
          {t('Using links enables you to highlight a specific reward or goal, helping you direct people to it.')}
        </Body>
        <Rewards />
        <Divider />
        <Goals />
      </VStack>
    </Modal>
  )
}

const Rewards = () => {
  const { t } = useTranslation()

  return (
    <VStack w="full" alignItems="flex-start">
      <Body size="md" medium>
        {t('Rewards')}
      </Body>
      <VStack>
        <RewardItem
          reward={{ id: '1', uuid: '1', title: 'Bitcoin Reward', image: 'https://via.placeholder.com/150' }}
        />
      </VStack>
    </VStack>
  )
}

const RewardItem = ({ reward }: { reward: RewardItemType }) => {
  return (
    <HStack spacing={2}>
      <Checkbox />
      <ImageWithReload src={reward.image} alt={reward.title} width={'32px'} height={'32px'} borderRadius={'8px'} />
      <Body size="sm">{reward.title}</Body>
    </HStack>
  )
}

const Goals = () => {
  const { t } = useTranslation()

  return (
    <VStack w="full" alignItems="flex-start">
      <Body size="md" medium>
        {t('Goals')}
      </Body>
      <VStack>
        <GoalItem goal={{ id: '1', title: 'Goal 1', emojiUnifiedCode: '1f970' }} />
      </VStack>
    </VStack>
  )
}

const GoalItem = ({ goal }: { goal: GoalItemType }) => {
  return (
    <HStack spacing={2}>
      <Checkbox />
      <Box>
        <Emoji size={24} unified={goal.emojiUnifiedCode} emojiStyle={EmojiStyle.NATIVE} />
      </Box>
      <Body size="sm">{goal.title}</Body>
    </HStack>
  )
}
