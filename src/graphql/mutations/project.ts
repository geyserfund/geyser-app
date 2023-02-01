import { gql } from '@apollo/client'

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
      status
    }
  }
`

export const MUTATION_CREATE_PROJECT_REWARD = gql`
  mutation CreateProjectReward($input: CreateProjectRewardInput) {
    createProjectReward(input: $input) {
      id
      name
      description
      cost
      image
      deleted
      stock
      sold
    }
  }
`

export const MUTATION_UPDATE_PROJECT_REWARD = gql`
  mutation UpdateProjectReward($input: UpdateProjectRewardInput) {
    updateProjectReward(input: $input) {
      id
      name
      description
      cost
      image
      deleted
      stock
      sold
    }
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

export const MUTATION_ADD_PROJECT_LINK = gql`
  mutation ProjectLinkAdd($input: ProjectLinkMutationInput!) {
    projectLinkAdd(input: $input) {
      id
    }
  }
`

export const MUTATION_REMOVE_PROJECT_LINK = gql`
  mutation ProjectLinkRemove($input: ProjectLinkMutationInput!) {
    projectLinkRemove(input: $input) {
      id
    }
  }
`
