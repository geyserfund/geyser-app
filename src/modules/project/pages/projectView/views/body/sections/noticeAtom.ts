import { atomWithStorage } from 'jotai/utils'

export const firstFundingLimitAlmostReachedNoticeClosedAtom = atomWithStorage(
  'firstFundingLimitAlmostReachedNoticeClosed',
  false,
)
export const secondFundingLimitAlmostReachedNoticeClosedAtom = atomWithStorage(
  'secondFundingLimitAlmostReachedNoticeClosed',
  false,
)
export const becomeVerifiedNoticeAtom = atomWithStorage('becomeVerifiedNotice', false)
export const promotionsNoticeClosedByProjectAtom = atomWithStorage<Record<string, boolean>>(
  'promotionsNoticeClosedByProject',
  {},
)
