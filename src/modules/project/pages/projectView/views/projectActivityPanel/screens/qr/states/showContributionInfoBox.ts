import { atom, useAtomValue, useSetAtom } from 'jotai'

export const showContributionInfoBoxAtom = atom(true)
export const useShowContributionInfoBoxValue = () => useAtomValue(showContributionInfoBoxAtom)
export const useShowContributionInfoBoxSet = () => useSetAtom(showContributionInfoBoxAtom)
