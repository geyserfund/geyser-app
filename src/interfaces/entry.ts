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
  image?: string | null
  content?: string | null
}
