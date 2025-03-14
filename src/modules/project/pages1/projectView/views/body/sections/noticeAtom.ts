import { atomWithStorage } from 'jotai/utils'

export const firstFundingLimitAlmostReachedAtom = atomWithStorage('firstFundingLimitAlmostReached', false)
export const secondFundingLimitAlmostReachedAtom = atomWithStorage('secondFundingLimitAlmostReached', false)
export const becomeVerifiedNoticeAtom = atomWithStorage('becomeVerifiedNotice', false)
