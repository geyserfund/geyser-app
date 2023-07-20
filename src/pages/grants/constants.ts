import {
  Grant3AnnouncementImageUrl,
  Grant3AnnouncementTwitterUrl,
} from '../../constants'
import { GrantStatusEnum } from '../../types'

export const CONTRIBUTION_ADDRESS = 'grants@geyser.fund'

export const GRANTS_PROJECT_NAME = 'grants'

export const GRANT_STATUS_MAP: Record<GrantStatusEnum, string> = {
  [GrantStatusEnum.ApplicationsOpen]: 'Applications Open',
  [GrantStatusEnum.Closed]: 'Closed',
  [GrantStatusEnum.FundingOpen]: 'Active',
}

export const GrantHasVoting: { [key: string]: boolean } = {
  'grant-round-001': false,
  'grant-round-002': false,
  'grant-round-003': true,
  'grant-round-004': true,
  'grant-round-005': false,
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
}

export const GRANT_STATUS_COUNTDOWN_TITLES = {
  [GrantStatusEnum.ApplicationsOpen]: 'Countdown to grant going live',
  [GrantStatusEnum.FundingOpen]: 'Time left to vote',
  [GrantStatusEnum.Closed]: 'Time left to vote',
}

export const GRANT_STATUS_COUNTDOWN_TITLES_NON_VOTE = {
  [GrantStatusEnum.ApplicationsOpen]: 'Countdown to grant going live',
  [GrantStatusEnum.FundingOpen]: 'Time left',
  [GrantStatusEnum.Closed]: 'Time left',
}

export const GrantProjectNameMap: { [key: string]: string } = {
  'grant-round-004': 'bitcoingaminggrant',
}
