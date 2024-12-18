import { atomWithStorage } from 'jotai/utils'

export const NoticeBannerLocalStorageKey = 'noticeBannerData'

export type NoticeBannerHistoryDataType = string[]

export const NoticeBannerHistoryDataAtom = atomWithStorage<NoticeBannerHistoryDataType>(NoticeBannerLocalStorageKey, [])
