import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT, FRAGMENT_PROJECT_NOSTR_KEYS } from '../fragments/project'
import { FRAGMENT_FUNDER_WITH_USER } from '../fragments/user'

export const QUERY_PROJECT_BY_NAME_OR_ID = gql`
  ${FRAGMENT_PROJECT}
  query ProjectByNameOrId($where: UniqueProjectQueryInput!, $input: ProjectEntriesGetInput) {
    projectGet(where: $where) {
      ...Project
    }
  }
`

export const QUERY_PROJECTS = gql`
  query Projects($input: ProjectsGetQueryInput) {
    projectsGet(input: $input) {
      projects {
        id
        title
        name
        description
        balance
        createdAt
        status
        image
      }
    }
  }
`

export const QUERY_PROJECTS_FULL = gql`
  query ProjectsFull($input: ProjectsGetQueryInput) {
    projectsGet(input: $input) {
      projects {
        id
        title
        name
        type
        shortDescription
        description
        balance
        createdAt
        updatedAt
        thumbnailImage
        image
        status
        owners {
          id
          user {
            id
            username
            imageUrl
          }
        }
        funders {
          id
          user {
            id
            username
            imageUrl
          }
          confirmed
        }
        wallets {
          state {
            status
            statusCode
          }
        }
      }
    }
  }
`

export const QUERY_PROJECTS_SUMMARY = gql`
  query ProjectsSummary {
    projectsSummary {
      fundedTotal
      fundersCount
      projectsCount
    }
  }
`

export const QUERY_PROJECT_FUNDERS = gql`
  ${FRAGMENT_FUNDER_WITH_USER}
  query ProjectFunders($input: GetFundersInput!) {
    fundersGet(input: $input) {
      ...FunderWithUser
    }
  }
`

export const QUERY_PROJECT_NOSTR_KEYS = gql`
  ${FRAGMENT_PROJECT_NOSTR_KEYS}
  query ProjectNostrKeys($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectNostrKeys
    }
  }
`
