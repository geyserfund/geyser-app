import {
  Grant3AnnouncementImageUrl,
  Grant3AnnouncementTwitterUrl,
  Grant14AnnouncementImageUrl,
  Grant14AnnouncementTwitterUrl,
} from '../../shared/constants'
import { GrantStatusEnum } from '../../types'

export const GRANT_STATUS_MAP: Record<GrantStatusEnum, string> = {
  [GrantStatusEnum.ApplicationsOpen]: 'APPLICATIONS ARE NOW OPEN ⚡️',
  [GrantStatusEnum.Closed]: 'Closed',
  [GrantStatusEnum.FundingOpen]: 'Active',
}

export const GrantHasVoting: { [key: string]: boolean } = {
  'grant-round-001': false,
  'grant-round-002': false,
  'grant-round-003': true,
  'grant-round-004': true,
  'grant-round-005': false,
  'grant-round-006': true,
  'grant-round-007': true,
  'grant-round-008': false,
  'grant-round-009': true,
  'grant-round-010': true,
  'grant-round-011': true,
  'grant-round-012': true,
  'grant-round-013': false,
  'grant-round-014': false,
  'grant-round-015': false,
  'grant-round-016': false,
}

export const GrantBalanceCurrency: { [key: string]: string } = {
  'grant-round-014': 'USDCENT',
  'grant-round-015': 'USDCENT',
  'grant-round-016': 'USDCENT',
}

export const NoContributionInGrant = ['grant-round-008', 'grant-round-014', 'grant-round-016']

export const GrantSubscribeSegment: {
  [key: string]: { title: string; description: string; modalTitle: string; segmentId: string }
} = {
  'grant-round-014': {
    title: 'Subscribe',
    description: 'Get updates on NWC Hackathon Grant',
    modalTitle: 'Subscribe to NWC Grants',
    segmentId: '681b2095a76b1971e0153274',
  },
}

export type GrantAnnouncement = {
  linkUrl: string
  imageUrl: string
}

export const GrantAnnouncements: { [key: string]: GrantAnnouncement } = {
  'grant-round-003': {
    linkUrl: Grant3AnnouncementTwitterUrl,
    imageUrl: Grant3AnnouncementImageUrl,
  },
  'grant-round-014': {
    linkUrl: Grant14AnnouncementTwitterUrl,
    imageUrl: Grant14AnnouncementImageUrl,
  },
}

export const GRANT_STATUS_COUNTDOWN_TITLES = {
  [GrantStatusEnum.ApplicationsOpen]: 'Countdown to grant going live',
  [GrantStatusEnum.FundingOpen]: 'Time left to vote',
  [GrantStatusEnum.Closed]: 'Time left to vote',
}

export const GRANT_STATUS_COUNTDOWN_TITLES_NON_VOTE = {
  [GrantStatusEnum.ApplicationsOpen]: 'Time remaining to submit application',
  [GrantStatusEnum.FundingOpen]: 'Time left',
  [GrantStatusEnum.Closed]: 'Time left',
}

export const GrantProjectNameMap: { [key: string]: string } = {
  'grant-round-004': 'bitcoingaminggrant',
  'grant-round-013': 'satsnfacts',
  'grant-round-016': 'time2build',
}

export const GrantWithCustomApplicationForm: { [key: string]: boolean } = {
  'grant-round-016': true,
}

export const GrantHasHowToApply: { [key: string]: boolean } = {
  'grant-round-016': true,
}
