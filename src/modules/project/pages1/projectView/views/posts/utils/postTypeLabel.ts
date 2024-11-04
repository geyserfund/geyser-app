import { PiFlagBannerFold, PiHandbag, PiMegaphoneSimple, PiMeteor, PiSiren, PiUserSound } from 'react-icons/pi'

import { PostType } from '@/types'

export const postTypeOptions = [
  { label: 'Announcement', value: PostType.Announcement, icon: PiMegaphoneSimple },
  { label: 'Behind the scenes', value: PostType.BehindTheScenes, icon: PiSiren },
  { label: 'Feedback request', value: PostType.FeedbackRequest, icon: PiUserSound },
  { label: 'Goal - New', value: PostType.NewGoal, icon: PiFlagBannerFold },
  { label: 'Goal - Update', value: PostType.GoalUpdate, icon: PiFlagBannerFold },
  { label: 'Goal - Reached', value: PostType.GoalReached, icon: PiFlagBannerFold },
  { label: 'Impact', value: PostType.Impact, icon: PiMeteor },
  { label: 'Reward - New', value: PostType.NewReward, icon: PiHandbag },
  { label: 'Reward - Update', value: PostType.RewardUpdate, icon: PiHandbag },
]
