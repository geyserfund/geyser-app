import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_REWARD_FOR_CREATE_UPDATE } from '../fragments/project'

export const MUTATION_PROJECT_STATUS_UPDATE = gql`
  mutation ProjectStatusUpdate($input: ProjectStatusUpdate!) {
    projectStatusUpdate(input: $input) {
      id
      status
    }
  }
`

export const MUTATION_CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      title
      name
      description
      status
      type
      image
      owners {
        id
        user {
          id
          ownerOf {
            owner {
              id
            }
            project {
              id
            }
          }
        }
      }
    }
  }
`

export const MUTATION_UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      title
      name
      shortDescription
      description
      image
      thumbnailImage
      location {
        country {
          name
          code
        }
        region
      }
      status
      links
      expiresAt
    }
  }
`

export const MUTATION_CREATE_PROJECT_REWARD = gql`
  ${FRAGMENT_PROJECT_REWARD_FOR_CREATE_UPDATE}
  mutation ProjectRewardCreate($input: CreateProjectRewardInput!) {
    projectRewardCreate(input: $input) {
      ...ProjectRewardForCreateUpdate
    }
  }
`

export const MUTATION_UPDATE_PROJECT_REWARD = gql`
  ${FRAGMENT_PROJECT_REWARD_FOR_CREATE_UPDATE}
  mutation ProjectRewardUpdate($input: UpdateProjectRewardInput!) {
    projectRewardUpdate(input: $input) {
      ...ProjectRewardForCreateUpdate
    }
  }
`

export const MUTATION_DELETE_PROJECT_REWARD = gql`
  mutation ProjectRewardDelete($input: DeleteProjectRewardInput!) {
    projectRewardDelete(input: $input)
  }
`

export const MUTATION_CREATE_PROJECT_MILESTONE = gql`
  mutation CreateProjectMilestone($input: CreateProjectMilestoneInput) {
    createProjectMilestone(input: $input) {
      id
      name
      description
      amount
    }
  }
`

export const MUTATION_UPDATE_PROJECT_MILESTONE = gql`
  mutation UpdateProjectMilestone($input: UpdateProjectMilestoneInput) {
    updateProjectMilestone(input: $input) {
      id
      name
      description
      amount
    }
  }
`

export const MUTATION_DELETE_PROJECT_MILESTONE = gql`
  mutation DeleteProjectMilestone($projectMilestoneId: BigInt!) {
    deleteProjectMilestone(projectMilestoneId: $projectMilestoneId)
  }
`

export const MUTATION_FOLLOW_PROJECT = gql`
  mutation ProjectFollow($input: ProjectFollowMutationInput!) {
    projectFollow(input: $input)
  }
`

export const MUTATION_UNFOLLOW_PROJECT = gql`
  mutation ProjectUnfollow($input: ProjectFollowMutationInput!) {
    projectUnfollow(input: $input)
  }
`

export const MUTATION_DELETE_PROJECT = gql`
  mutation ProjectDelete($input: DeleteProjectInput!) {
    projectDelete(input: $input) {
      message
      success
    }
  }
`
