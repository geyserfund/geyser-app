import { ShippingDestination } from '../types'
import { IFunder } from './participant'
import { IProject, IProjectListEntryItem } from './project'

export interface IFundingTx {
  id: number
  uuid: string
  invoiceId: string
  comment: string
  media?: string
  status: string
  amount: number
  paymentRequest: string
  address: string
  canceled: boolean
  funder: IFunder
  paidAt: string
  onChain: boolean
  source: string
  sourceResource: IProject | IProjectListEntryItem
}

export interface IFundingReward {
  projectRewardId: number
  cost: number
  quantity: number
}

export interface IFundingAmounts {
  total: number
  shippingCost: number
  rewardsCost: number
  donationAmount: number
}

interface IFundingRewardWithoutCost {
  id: number
  quantity: number
}

interface ISourceResourceInput {
  resourceId: number
  resourceType: string
}

export interface IFundingInput {
  projectId: number
  anonymous: boolean
  donationInput?: IDonationFundingInput
  rewardInput?: IRewardFundingInput
  metadataInput?: IMetadataFundingInput
  sourceResourceInput: ISourceResourceInput
}

export interface IDonationFundingInput {
  donationAmount: number
}

export interface IRewardFundingInput {
  rewardsCost: number
  rewards: IFundingRewardWithoutCost[]
  shipping: IShippingFundingInput
}

export interface IShippingFundingInput {
  destination: ShippingDestination
  cost: number
}

export interface IMetadataFundingInput {
  comment?: string
  email?: string
  media?: string
}
