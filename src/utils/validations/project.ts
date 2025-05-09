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

export const isInReview = (status?: Maybe<ProjectStatus>) => {
  return status === ProjectStatus.InReview
}

export const isClosed = (status?: Maybe<ProjectStatus>) => {
  return status === ProjectStatus.Closed
}

export const isPrelaunch = (status?: Maybe<ProjectStatus>) => {
  return status === ProjectStatus.PreLaunch
}
