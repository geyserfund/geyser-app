import { User } from '../types/generated/graphql'

export interface IEntryCreateInput {
  projectId?: number
  type: string
  content?: string
  image?: string
  description?: string
  title?: string
}

export interface IEntryUpdateInput {
  entryId: number
  title?: string
  description?: string
  image?: string
  content?: string
}

/**
 * Corresponds to https://github.com/geyserfund/geyser-server/blob/development/src/typeDefs/entry.ts
 */
export type TEntryData = {
  id: number
  title: string
  description: string
  image?: string
  published: string
  content: string
  fundersCount: number
  amountFunded: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  type: string
  creator: User
  project: {
    id: number
    title: string
    name: string
  }
}
