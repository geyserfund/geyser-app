import type {
  ContributionsSummary,
  PostForLandingPageFragment,
  ProjectForLandingPageFragment,
} from '@/types/index.ts'

export type LandingProjectCardProject = Pick<
  ProjectForLandingPageFragment,
  | 'category'
  | 'fundersCount'
  | 'fundingSummary'
  | 'id'
  | 'launchedAt'
  | 'location'
  | 'name'
  | 'owners'
  | 'shortDescription'
  | 'status'
  | 'subCategory'
  | 'thumbnailImage'
  | 'title'
>

export type LandingProjectDisplayItem = LandingProjectCardProject & {
  contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  statusPillLabel?: string
}

export type LandingPostCardPost = Pick<
  PostForLandingPageFragment,
  'description' | 'id' | 'image' | 'postType' | 'project' | 'publishedAt' | 'title'
>

export type LandingMostFundedGroup = {
  category?: string | null
  subCategory?: string | null
  projects: Array<{
    project: LandingProjectCardProject
    contributionsSummary?: Pick<ContributionsSummary, 'contributionsTotal' | 'contributionsTotalUsd'> | null
  }>
}

export type LandingAboveFoldQueryData = {
  projectsGet: {
    projects: LandingProjectCardProject[]
  }
}

export type LandingAnnouncementsQueryData = {
  acelerandoVipLeaderboard: {
    endAt?: string | null
  }
  geyserAnnouncements: LandingPostCardPost[]
}
