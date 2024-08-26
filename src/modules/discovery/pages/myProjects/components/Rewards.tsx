import { Box, Divider, HStack, Image, Skeleton, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiBag } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { getPath, NoRewardsSoldUrl } from '@/shared/constants'

import { Reward, useRewards } from '../hooks/useRewards'

interface RewardsProps {
  projectId: string
  projectName: string
}

const Rewards = ({ projectId, projectName }: RewardsProps) => {
  const { rewards, totalRewardsCount, isLoading } = useRewards(projectId)

  if (isLoading) return <RewardsSkeleton />

  return (
    <Box
      as={Link}
      to={getPath('projectRewards', projectName)}
      minHeight="269px"
      borderWidth={1}
      borderRadius="lg"
      p={4}
      flex={1}
    >
      <Header rewardsSold={totalRewardsCount} />
      <Divider my={4} />
      <RewardsList rewards={rewards} />
    </Box>
  )
}

export default Rewards

const Header = ({ rewardsSold }: { rewardsSold: number | undefined }) => {
  const { t } = useTranslation()

  const noRewardsSold = rewardsSold === 0

  return (
    <VStack w="100%" align="stretch" spacing={0.5}>
      <HStack w="100%" justifyContent="center">
        <PiBag />
        <Body fontSize={'14px'} regular muted>
          {t('Rewards Sold')}
        </Body>
      </HStack>

      {noRewardsSold ? (
        <HStack w="100%" justifyContent="center">
          <Body fontSize={'20px'} bold>
            {t('No rewards sold')}
          </Body>
        </HStack>
      ) : (
        <HStack w="100%" justifyContent="center">
          <Body fontSize={'20px'} bold>
            {rewardsSold}
          </Body>
        </HStack>
      )}
    </VStack>
  )
}

const RewardsList = ({ rewards }: { rewards: Reward[] }) => {
  const noRewardsSold = rewards.length === 0

  if (noRewardsSold) {
    return (
      <VStack w="100%" align="center" spacing={0.5} px={4} py={8}>
        <Image maxHeight="150px" src={NoRewardsSoldUrl} alt="No rewards sold" />
      </VStack>
    )
  }

  return (
    <VStack w="100%" align="stretch" spacing={0.5}>
      {rewards.map((reward) => (
        <RewardItem key={reward.id} reward={reward} />
      ))}
    </VStack>
  )
}

const RewardItem = ({ reward }: { reward: Reward }) => {
  const { t } = useTranslation()
  return (
    <HStack w="100%" justifyContent="flex-start">
      {reward.image && <Image src={reward.image} borderRadius="lg" width="20px" height="20px" alt={reward.name} />}
      <Body fontSize={'16px'} medium>
        {reward.name}
        <Body as="span" color={'neutralAlpha.11'}>
          {' '}
          {t('sold')}{' '}
        </Body>
        {reward.count}
        <Body as="span" color={'neutralAlpha.11'}>
          {' '}
          {reward.count > 1 ? t('times.') : t('time.')}
        </Body>
      </Body>
    </HStack>
  )
}

const RewardsSkeleton = () => (
  <Box minHeight="269px" borderWidth={1} borderRadius="lg" p={4} flex={1}>
    <HeaderSkeleton />
    <Divider my={4} />
    <RewardsListSkeleton />
  </Box>
)

const HeaderSkeleton = () => (
  <VStack w="100%" align="stretch" spacing={0.5}>
    <HStack w="100%" justifyContent="center">
      <Skeleton width="24px" height="24px" />
      <Skeleton width="100px" height="20px" />
    </HStack>
    <HStack w="100%" justifyContent="center">
      <Skeleton width="150px" height="28px" />
    </HStack>
  </VStack>
)

const RewardsListSkeleton = () => (
  <VStack w="100%" align="stretch" spacing={4}>
    {[...Array(3)].map((_, index) => (
      <Skeleton key={index} width="100%" height="24px" />
    ))}
  </VStack>
)
