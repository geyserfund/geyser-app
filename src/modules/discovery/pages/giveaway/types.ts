export type BigIntScalar = string | number

export type AcelerandoVipLeaderboardEntry = {
  rank: number
  userId: BigIntScalar
  displayName: string
  avatarUrl?: string | null
  scoreSats: BigIntScalar
  eligibleContributionsCount: number
  uniqueProjectsBacked: number
}

export type AcelerandoVipLeaderboardResponse = {
  giveawayId: string
  updatedAt: string
  startAt: string
  endAt: string
  timezone: string
  leaderboardSize: number
  topCutoffScore: BigIntScalar
  entries: AcelerandoVipLeaderboardEntry[]
}

export type AcelerandoVipMyPositionResponse = {
  userId: BigIntScalar
  rank?: number | null
  scoreSats: BigIntScalar
  inTop3: boolean
  top3CutoffScore: BigIntScalar
  distanceToTop3Sats: BigIntScalar
  distanceToNextRankSats?: BigIntScalar | null
  progressToTop3: number
  eligibleContributionsCount: number
  uniqueProjectsBacked: number
  excludedSelfContributionsCount: number
}

export type AcelerandoVipLeaderboardQueryData = {
  acelerandoVipLeaderboard: AcelerandoVipLeaderboardResponse
}

export type AcelerandoVipMyPositionQueryData = {
  acelerandoVipMyPosition: AcelerandoVipMyPositionResponse | null
}
