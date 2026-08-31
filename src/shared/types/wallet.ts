export enum LNAddressEvaluationState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  FAILED = 'FAILED',
  SUCCEEDED = 'SUCCEEDED',
}

export type LightingWalletForm = {
  error: string | null
  state: LNAddressEvaluationState
  value: string
  setValue: (lightningAddress: string) => void
  evaluating: boolean
  validate: () => void
}

export type Limits = {
  max?: number | null
  min?: number | null
}
