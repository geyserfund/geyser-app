import { PostType } from '@/types'

export const postTypeOptions = [
  { label: 'Reward Update', value: PostType.RewardUpdate },
  { label: 'Goal Update', value: PostType.GoalUpdate },
  { label: 'Goal Reached', value: PostType.GoalReached },
  { label: 'Announcement', value: PostType.Announcement },
  { label: 'Behind the scenes', value: PostType.BehindTheScenes },
  { label: 'Feedback Request', value: PostType.FeedbackRequest },
  { label: 'New Goal', value: PostType.NewGoal },
  { label: 'New Reward', value: PostType.NewReward },
  { label: 'Impact', value: PostType.Impact },
]
