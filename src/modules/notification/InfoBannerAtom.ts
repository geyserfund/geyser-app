import { atomWithStorage } from 'jotai/utils'

export const InfoBannerLocalStorageKey = 'infoBannerData'

export type InfoBannerHistoryDataType = string[]

export const InfoBannerHistoryDataAtom = atomWithStorage<InfoBannerHistoryDataType>(InfoBannerLocalStorageKey, [])
