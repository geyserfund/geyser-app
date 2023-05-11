import {
  ProjectStatus,
  ProjectType,
  RewardCurrency,
} from '../../types/generated/graphql'
import { Satoshis } from '../../types/types'

export type ProjectCreationVariables = {
  title: string
  name: string
  image?: string
  thumbnailImage?: string
  shortDescription: string
  description: string
  email: string
  expiresAt?: string
  fundingGoal?: number
  rewardCurrency?: RewardCurrency
  type?: ProjectType
}

export type ProjectUpdateVariables = {
  projectId: number
  title?: string
  name?: string
  image?: string
  thumbnailImage?: string
  shortDescription?: string
  description?: string
  expiresAt?: string
  type?: ProjectType
  rewardCurrency?: RewardCurrency
  fundingGoal?: number
  status?: ProjectStatus
}

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
