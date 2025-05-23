import { atom } from 'jotai'

import { projectCreationRoutesThatNeedStory, routeMatchForAtom } from '@/config/routes/routeGroups.ts'

export const creationRouteThatNeedsStory = atom(routeMatchForAtom(projectCreationRoutesThatNeedStory))
