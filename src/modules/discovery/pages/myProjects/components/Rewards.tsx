import { Box, Button, Divider, HStack, Image, Skeleton, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiBag } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { getPath, NoRewardsSoldUrl } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { Reward, useRewards } from '../hooks/useRewards'

interface RewardsProps {
  projectId: string
  projectName: string
}

export const Rewards = ({ projectId, projectName }: RewardsProps) => {
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
      <RewardsList rewards={rewards} projectName={projectName} />
    </Box>
  )
}

const Header = ({ rewardsSold }: { rewardsSold: number | undefined }) => {
  const { t } = useTranslation()

  const noRewardsSold = rewardsSold === 0

  return (
    <VStack w="100%" align="stretch" spacing={0.5}>
      <HStack w="100%" justifyContent="center" color="neutralAlpha.11">
        <PiBag />
        <Body size={'sm'} regular>
          {t('Products Sold')}
        </Body>
      </HStack>

      {noRewardsSold ? (
        <HStack w="100%" justifyContent="center">
          <Body size={'xl'} bold>
            {t('No products sold')}
          </Body>
        </HStack>
      ) : (
        <HStack w="100%" justifyContent="center">
          <Body size={'xl'} bold>
            {rewardsSold}
          </Body>
        </HStack>
      )}
    </VStack>
  )
}

const RewardsList = ({ rewards, projectName }: { rewards: Reward[]; projectName: string }) => {
  const noRewardsSold = rewards.length === 0

  if (noRewardsSold) {
    return (
      <VStack w="100%" align="center" spacing={0.5} px={4} py={8}>
        <Image maxHeight="150px" src={NoRewardsSoldUrl} alt="No products sold" />
      </VStack>
    )
  }

  return (
    <VStack w="100%" align="stretch" spacing={0.5}>
      {rewards.map((reward) => (
        <RewardItem key={reward.id} reward={reward} projectName={projectName} />
      ))}
    </VStack>
  )
}

const RewardItem = ({ reward, projectName }: { reward: Reward; projectName: string }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isMobile = useMobileMode()

  const { isSoldOut } = reward

  const Direction = isMobile ? VStack : HStack

  const soldOutStyle = {
    bg: 'neutralAlpha.2',
    borderRadius: '8px',
    p: 2,
  }

  return (
    <Direction w="100%" justifyContent="space-between" {...(isSoldOut && soldOutStyle)}>
      <HStack w="100%" justifyContent="flex-start">
        {reward.image && <Image src={reward.image} borderRadius="lg" width="20px" height="20px" alt={reward.name} />}

        <Body size="md" medium>
          {reward.name}
          {!isSoldOut ? (
            <>
              <Body as="span" light>
                {' '}
                {t('sold')}{' '}
              </Body>
              {reward.count}
              <Body as="span" light>
                {' '}
                {reward.count > 1 ? t('times.') : t('time.')}
              </Body>
            </>
          ) : (
            <Body as="span" size="md" light>
              {' '}
              {t('sold out!')}
            </Body>
          )}
        </Body>
      </HStack>

      {isSoldOut && (
        <Button
          variant="surface"
          size="sm"
          colorScheme="primary1"
          w={isMobile ? 'full' : 'auto'}
          minWidth="150px"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            navigate(`${getPath('projectPostCreate', projectName)}?rewardUuid=${reward.uuid}`)
          }}
        >
          {t('Update your community')}
        </Button>
      )}
    </Direction>
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
