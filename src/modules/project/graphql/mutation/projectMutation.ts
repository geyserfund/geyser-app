import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_PAGE_BODY, FRAGMENT_PROJECT_UPDATE } from '../fragments/projectFragment'
import { FRAGMENT_PROJECT_REWARD } from '../fragments/rewardsFragment'

export const MUTATION_UPDATE_PROJECT_CURRENCY = gql`
  ${FRAGMENT_PROJECT_REWARD}
  mutation ProjectRewardCurrencyUpdate($input: ProjectRewardCurrencyUpdate!) {
    projectRewardCurrencyUpdate(input: $input) {
      ...ProjectReward
    }
  }
`

export const MUTATION_CREATE_PROJECT = gql`
  ${FRAGMENT_PROJECT_PAGE_BODY}
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      ...ProjectPageBody
    }
  }
`

export const MUTATION_UPDATE_PROJECT = gql`
  ${FRAGMENT_PROJECT_UPDATE}
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      ...ProjectUpdate
    }
  }
`

export const MUTATION_UPDATE_PROJECT_STATUS = gql`
  mutation ProjectStatusUpdate($input: ProjectStatusUpdate!) {
    projectStatusUpdate(input: $input) {
      id
      status
    }
  }
`

export const MUTATION_PROJECT_PRE_LAUNCH = gql`
  mutation ProjectPreLaunch($input: ProjectPreLaunchMutationInput!) {
    projectPreLaunch(input: $input) {
      id
      name
      status
    }
  }
`

export const MUTATION_PROJECT_PUBLISH = gql`
  mutation ProjectPublish($input: ProjectPublishMutationInput!) {
    projectPublish(input: $input) {
      id
      status
    }
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

export const MUTATION_PROJECT_RSK_EOA_SET = gql`
  mutation ProjectRskEoaSet($input: ProjectRskEoaSetInput!) {
    projectRskEoaSet(input: $input) {
      id
      rskEoa
    }
  }
`
