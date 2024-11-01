import { PiFlagBannerFold, PiHandbag, PiMegaphoneSimple, PiMeteor, PiSiren, PiUserSound } from 'react-icons/pi'

import { PostType } from '@/types'

export const postTypeOptions = [
  { label: 'Reward Update', value: PostType.RewardUpdate, icon: PiHandbag },
  { label: 'Goal Update', value: PostType.GoalUpdate, icon: PiFlagBannerFold },
  { label: 'Goal Reached', value: PostType.GoalReached, icon: PiFlagBannerFold },
  { label: 'Announcement', value: PostType.Announcement, icon: PiMegaphoneSimple },
  { label: 'Behind the scenes', value: PostType.BehindTheScenes, icon: PiSiren },
  { label: 'Feedback Request', value: PostType.FeedbackRequest, icon: PiUserSound },
  { label: 'New Goal', value: PostType.NewGoal, icon: PiFlagBannerFold },
  { label: 'New Reward', value: PostType.NewReward, icon: PiHandbag },
  { label: 'Impact', value: PostType.Impact, icon: PiMeteor },
]
