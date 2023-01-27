import { User } from '../types/generated/graphql'

export interface IParticipant {
  user: User
  confirmed: boolean
}

export interface IFunder {
  id: number
  amountFunded: number
  timesFunded: number
  user?: User
  badges: IBadge[]
  confirmedAt: string
}

export interface IBadge {
  badge: string
  description: string
}

export interface ISponsor {
  id: number
  name: string
  user?: User
  image?: string
  url?: string
  confirmed: boolean
}

export interface IGrantee {
  id: number
  url: string
  name: string
}

export interface IAvatarMetadata {
  username?: string
  appName?: string
  image?: string
  link?: string
}
