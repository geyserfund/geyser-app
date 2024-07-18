import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_REWARD_FOR_CREATE_UPDATE } from '../fragments/project'

export const MUTATION_PROJECT_PUBLISH = gql`
  mutation ProjectPublish($input: ProjectPublishMutationInput!) {
    projectPublish(input: $input) {
      id
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
    }
  }
`

export const MUTATION_DELETE_PROJECT_REWARD = gql`
  mutation ProjectRewardDelete($input: DeleteProjectRewardInput!) {
    projectRewardDelete(input: $input)
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
