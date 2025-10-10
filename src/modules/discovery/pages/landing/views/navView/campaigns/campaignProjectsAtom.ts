import { atom } from 'jotai'

import { ProjectForLandingPageFragment } from '@/types/index.ts'

export const campaignProjectsAtom = atom<ProjectForLandingPageFragment[]>([])
