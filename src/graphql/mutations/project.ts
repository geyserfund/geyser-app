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
/*
{
  "input": {
    "title": null,
    "image": null,
    "name": null,
    "description": null,
    "type": null,
    "expiresAt": null,
    "fundingGoal": null,
    "rewardCurrency": null
  }
}
*/

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
/*
{
  "input": {
    "projectId": null,
    "title": null,
    "image": null,
    "description": null,
    "active": null,
    "draft": null,
    "expiresAt": null,
    "fundingGoal": null
  }
}
*/

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
/*
{
  "input": {
    "projectId": null,
    "name": null,
    "description": null,
    "cost": null,
    "image": null,
    "stock": null
  }
}
*/

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

/*
{
  "input": {
    "projectRewardId": null,
    "name": null,
    "description": null,
    "cost": null,
    "image": null,
    "deleted": null,
    "stock": null
  }
}
*/

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
/*
{
  "input": {
    "name": null,
    "description": null,
    "amount": null,
    "projectId": null
  }
}
*/

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
/*
{
  "input": {
    "projectMilestoneId": null,
    "name": null,
    "description": null,
    "amount": null
  }
}
*/

export const MUTATION_DELETE_PROJECT_MILESTONE = gql`
  mutation DeleteProjectMilestone($projectMilestoneId: BigInt!) {
    deleteProjectMilestone(projectMilestoneId: $projectMilestoneId)
  }
`;
