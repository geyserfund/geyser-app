import { Maybe, ProjectStatus } from '../../types/generated/graphql'

export const isActive = (status?: Maybe<ProjectStatus>) => {
  return status ? status === ProjectStatus.Active : false
}

export const isDraft = (status?: Maybe<ProjectStatus>) => {
  return status ? status === ProjectStatus.Draft : false
}
