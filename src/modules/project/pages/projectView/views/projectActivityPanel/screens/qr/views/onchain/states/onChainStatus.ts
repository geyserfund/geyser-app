import { atom, useAtomValue } from 'jotai'

export enum OnChainStatus {
  prompt = 'PROMPT',
}

export const onchainStatusAtom = atom(OnChainStatus.prompt)

export const useOnchainStausValue = () => useAtomValue(onchainStatusAtom)
