import { Maybe, ProjectStatus } from '../../types/generated/graphql'

export const isActive = (status?: Maybe<ProjectStatus>) => {
  return status === ProjectStatus.Active
}

export const isDraft = (status?: Maybe<ProjectStatus>) => {
  return status === ProjectStatus.Draft
}

export const isInactive = (status?: Maybe<ProjectStatus>) => {
  return status === ProjectStatus.Inactive
}
