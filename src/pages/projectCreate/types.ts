import { Project, ProjectType, RewardCurrency, Satoshis } from '../../types'

export type ProjectCreationVariables = {
  title: string
  name: string
  image?: string
  thumbnailImage?: string
  shortDescription: string
  description: string
  email: string
  rewardCurrency?: RewardCurrency | null
  type?: ProjectType
}

export type ProjectUpdateVariables = Partial<
  Pick<
    Project,
    | 'title'
    | 'name'
    | 'image'
    | 'thumbnailImage'
    | 'shortDescription'
    | 'description'
    | 'type'
    | 'rewardCurrency'
    | 'status'
  >
>

export type ProjectRewardCreationVariables = {
  projectId: number
  name: string
  description: string
  cost: number
  costCurrency: RewardCurrency
  image?: string
  stock?: number
}

export type ProjectRewardUpdateVariables = {
  projectRewardId: number
  name: string
  description?: string
  cost: number
  costCurrency: RewardCurrency
  image?: string
  deleted?: boolean
  stock?: number
}

export type TMilestone = {
  id?: number
  name: string
  projectId?: number
  description: string
  amount: Satoshis
}

export type TRewards = {
  id?: number
  name: string
  description: string
  projectId?: number
  cost: number
  image?: string
  sold?: number
}

export type TNodeInput = {
  name: string
  isVoltage?: boolean
  hostname: string
  publicKey: string
  invoiceMacaroon: string
  tlsCert: string
  grpc: string
}
