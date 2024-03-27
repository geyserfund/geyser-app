import { atom } from 'jotai'

export enum FundingStages {
  loading = 'loading',
  initial = 'initial',
  form = 'form',
  started = 'started',
  completed = 'completed',
  canceled = 'canceled',
}

const fundStateAtom = atom<FundingStages>(FundingStages.initial)
