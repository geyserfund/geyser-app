import { atom } from 'jotai'

import { ActivityFeedFragmentFragment } from '@/types'

/** Activity feed for followed projects */
export const activityFeedFollowedProjectsAtom = atom<ActivityFeedFragmentFragment[]>([])

/** Activity feed for global feed */
export const activityFeedGlobalAtom = atom<ActivityFeedFragmentFragment[]>([])
