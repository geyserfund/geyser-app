import { gql } from '@apollo/client';

export const MUTATION_CREATE_PROJECT = gql`
  mutation Mutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      title
      name
      description
      active
      draft
      type
    }
  }
`;

export const MUTATION_UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      title
      name
      description
      active
      draft
      type
    }
  }
`;

export const MUTATION_CREATE_PROJECT_REWARD = gql`
  mutation CreateProjectReward($input: CreateProjectRewardInput) {
    createProjectReward(input: $input) {
      id
      name
      description
      cost
      image
      deleted
    }
  }
`;

export const MUTATION_UPDATE_PROJECT_REWARD = gql`
  mutation CreateProjectReward($input: UpdateProjectRewardInput) {
    updateProjectReward(input: $input) {
      id
      name
      description
      cost
      image
      deleted
    }
  }
`;

export const MUTATION_CREATE_PROJECT_MILESTONE = gql`
  mutation CreateProjectMilestone($input: CreateProjectMilestoneInput) {
    createProjectMilestone(input: $input) {
      id
      name
      description
      amount
    }
  }
`;

export const MUTATION_UPDATE_PROJECT_MILESTONE = gql`
  mutation UpdateProjectMilestone($input: UpdateProjectMilestoneInput) {
    updateProjectMilestone(input: $input) {
      id
      name
      description
      amount
    }
  }
`;

export const MUTATION_DELETE_PROJECT_MILESTONE = gql`
  mutation DeleteProjectMilestone($projectMilestoneId: BigInt!) {
    deleteProjectMilestone(projectMilestoneId: $projectMilestoneId)
  }
`;
