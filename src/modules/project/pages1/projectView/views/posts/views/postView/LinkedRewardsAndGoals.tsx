import { Box, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { PostPageProjectRewardFragment, ProjectPostViewFragment, RewardCurrency, Satoshis, USDCents } from '@/types'

import { GoalInProgress } from '../../../goals/components'

export const LinkedRewardsAndGoals = ({ post }: { post: ProjectPostViewFragment }) => {
  const goalsToRender = post.projectGoals.inProgress
  const rewardsToRender = post.projectRewards
  const { project } = useProjectAtom()
  return (
    <VStack w="full" alignItems={'start'} mt={20}>
      <Body size="xl" bold>
        {t('Linked rewards and goals')}
      </Body>
      {goalsToRender.map((goal) => (
        <GoalInProgress
          noborder={false}
          key={goal.id}
          padding={3}
          goal={goal}
          onOpenGoalModal={() => {}}
          backgroundColor="neutral1.1"
          hover
          w="full"
        />
      ))}
      {rewardsToRender.map((reward) => (
        <RewardCardForPost key={reward.id} rewardCurrency={project.rewardCurrency as RewardCurrency} reward={reward} />
      ))}
    </VStack>
  )
}

const RewardCardForPost = ({
  rewardCurrency,
  reward,
}: {
  rewardCurrency: RewardCurrency
  reward: PostPageProjectRewardFragment
}) => {
  const { project } = useProjectAtom()

  const { formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const renderAmountComponent = () => {
    if (rewardCurrency === RewardCurrency.Usdcent)
      return (
        <Body size="sm" bold dark>
          {`$${reward.cost / 100} `}
          <Box as="span" color={'neutral1.9'}>
            {`(${formatSatsAmount(reward.cost as USDCents)})`}
          </Box>
        </Body>
      )

    return (
      <Body size="sm" bold dark>
        {`${reward.cost.toLocaleString()}`}
        <Box as="span" color={'neutral1.9'}>
          {' '}
          sats
          {` (${formatUsdAmount(reward.cost as Satoshis)})`}
        </Box>
      </Body>
    )
  }

  return (
    <CardLayout
      as={Link}
      to={getPath('projectRewardView', project.name, reward.id)}
      hover
      w="full"
      overflow={'hidden'}
      direction="row"
      dense
      spacing={0}
    >
      <Box height="148px" width="148px" overflow="hidden">
        <ImageWithReload width="100%" height="100%" src={reward.images[0]} alt={reward.name} />
      </Box>
      <VStack flex={1} alignItems="start" spacing={0} p={4}>
        <Body size="md" medium>
          {reward.name}
        </Body>
        <Body size="sm" light noOfLines={3}>
          {reward.shortDescription}
        </Body>
        {renderAmountComponent()}
      </VStack>
    </CardLayout>
  )
}
