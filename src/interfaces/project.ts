import {
  EntryForProjectFragment,
  ProjectStatus,
} from '../types/generated/graphql'
import { IFundingTx } from './funding'
import { IFunder, IParticipant, ISponsor } from './participant'

export type IProjectType = 'reward' | 'grant' | 'donation'

export interface IProject {
  id: string
  title: string
  name: string
  description: string
  type: IProjectType
  balance: number
  fundingGoal: number
  createdAt: string
  updatedAt: string
  expiresAt: string
  image?: string
  status?: ProjectStatus
  ownerConfirmed: string
  fundsClaimed: string
  media: string[]
  owners: IParticipant[]
  ambassadors: IParticipant[]
  funders: IFunder[]
  sponsors: ISponsor[]
  fundingTxs: IFundingTx[]
  rewards?: IProjectReward[]
  milestones?: IProjectMilestone[]
  entries?: EntryForProjectFragment[]
  wallets?: IProjectWallet[]
}

export interface IProjectWallet {
  id: number
  name: string
  connectionDetails: {
    macaroon: string
    tlsCertificate: string
    hostname: string
    grpcPort: string
    lndNodeType: string
    pubkey: string
  }
}

export interface IProjectReward {
  id: number
  currency: string
  cost: number
  name: string
  description?: string
  sold: number
  image?: string
}

export interface IProjectDetail {
  problem: string
  idea: string
  blocks: IProjectBlock[]
  ownerIntro: string
  images?: string[]
}

export interface IProjectBlock {
  key: string
  title: string
  body: string[]
  tweet?: string
  images?: number[]
  youtube?: string
  podcast?: string
  vimeo?: string
  link?: string[]
  blockType: string
}

export interface IProjectUpdate {
  updateTitle: string
  date: number
  tweet?: string
  type: string
  bodyTitle?: string
  body?: string[]
  images?: number[]
  youtube?: string
}

export interface IProjectMilestone {
  id: number
  name: string
  description: string
  amount: number
}

export interface IRewardCount {
  id: number
  count: number
}
