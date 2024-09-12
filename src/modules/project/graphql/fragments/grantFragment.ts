import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_GRANT_APPLICANT = gql`
  fragment ProjectGrantApplicant on GrantApplicant {
    id
    status
    grant {
      ... on CommunityVoteGrant {
        id
        votingSystem
        type
        name
        title
        status
      }
    }
  }
`
