import { useRewardBuy } from '../../../hooks'
import { RewardCard, RewardCardProps } from './RewardCard'

type RewardCardWithBuyProps = Omit<RewardCardProps, 'buyReward' | 'count'>

/** This must be used inside a funding context */
export const RewardCardWithBuy = (props: RewardCardWithBuyProps) => {
  const { buyReward, count } = useRewardBuy(props.reward)

  return <RewardCard {...props} buyReward={buyReward} count={count} />
}
