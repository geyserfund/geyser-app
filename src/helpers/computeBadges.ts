import { DateTime, Interval } from 'luxon'

import { IBadge } from '../interfaces'
import {
  Funder,
  FundingTxForLandingPageFragment,
  FundingTxFragment,
} from '../types/generated/graphql'

type IBadges<TKey extends string = string> = Record<TKey, IBadge>

type AmountBadges = '21000' | '120000' | '1000000' | '10000000'

const amountBadges: IBadges<AmountBadges> = {
  21000: {
    badge: '🏅',
    description: 'This user funded more than 21,000 sats!',
  },
  120000: {
    badge: '🏆',
    description: 'This user funded more than 120,000 sats!',
  },
  1000000: {
    badge: '👑',
    description: 'This user funded more than 1,000,000 sats!',
  },
  10000000: {
    badge: '⭐️',
    description: 'This user funded more than 10,000,000 sats!',
  },
}

type RoleBadges = 'funder' | 'earlyFunder'

const roleBadges: IBadges<RoleBadges> = {
  funder: {
    badge: 'Funder',
    description: 'The user funded this project!',
  },
  earlyFunder: {
    badge: 'Early Funder',
    description:
      'This user funded within the first 24 hours of the project start!',
  },
}

interface Props {
  useShortForm?: boolean
  creationDateStringOfFundedContent: string
  funder:
    | Funder
    | FundingTxForLandingPageFragment['funder']
    | FundingTxFragment['funder']
}

/**
 * Computes the badges that a funder has earned with
 * respect to their funding history for a specific project
 * or entry.
 */
export const computeFunderBadges = ({
  creationDateStringOfFundedContent,
  funder,
  useShortForm = true,
}: Props): IBadge[] => {
  const { amountFunded, timesFunded } = funder

  if (!amountFunded || amountFunded === 0) {
    return []
  }

  const funderBadges: IBadge[] = []

  // Check if earned amount badge
  const amountBadgeKey: AmountBadges | undefined = Object.keys(amountBadges)
    .reverse()
    .find((threshold) => amountFunded > Number(threshold)) as AmountBadges

  if (amountBadgeKey) {
    const badge = amountBadges[amountBadgeKey]
    if (badge) {
      funderBadges.push(badge)
    }
  }

  // Check if early funder
  if (funder.confirmedAt) {
    const funderConfirmedAt = DateTime.fromMillis(
      parseInt(funder.confirmedAt, 10),
    )
    const projectCreatedAt = DateTime.fromMillis(
      parseInt(creationDateStringOfFundedContent, 10),
    )
    const interval = Interval.fromDateTimes(projectCreatedAt, funderConfirmedAt)

    if (interval.length('hours') < 24) {
      funderBadges.push(roleBadges.earlyFunder)
    }
  }

  // Badge for funding more than once
  if (timesFunded && timesFunded > 1) {
    funderBadges.push({
      badge: `${timesFunded}x`,
      description: `This user funded this project ${timesFunded} times!`,
    })
  }

  if (funderBadges.length === 0 || useShortForm) {
    return funderBadges
  }

  const longFormBadges = funderBadges.map((funderBadge) => ({
    ...funderBadge,
    badge: funderBadge.badge.includes('Funder')
      ? funderBadge.badge
      : funderBadge.badge + ' Funder',
  }))

  return longFormBadges
}
