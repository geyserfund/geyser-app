import { ProjectType, RewardCurrency, Satoshis } from '../../../../types'

export type ProjectCreationVariables = {
  title: string
  name: string
  images: string[]
  thumbnailImage?: string
  shortDescription: string
  description: string
  rewardCurrency?: RewardCurrency | null
  type?: ProjectType
  category: string
  subCategory: string
  location: string
  links: string[]
  tags: number[]
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

const RewardCategories = [
  'Membership',
  'Gift',
  'Ticket',
  'Nostr Badge',
  'Collectible',
  'Book',
  'Course',
  'Game',
  'Merch',
  'Raffle',
  'Sponsorship',
  'Service',
  'Shoutout',
  'Digital Content',
  'Artwork',
  'Physical Product',
  'Experience',
  'Event',
  'Song',
] as const

export type RewardCategory = (typeof RewardCategories)[number]

export type RewardTemplateType = {
  title: string
  category: RewardCategory
  description: string
  image: string
}
