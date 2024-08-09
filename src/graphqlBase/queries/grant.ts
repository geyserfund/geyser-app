import { gql } from '@apollo/client'

import {
  FRAGMENT_BOARD_VOTE_GRANT,
  FRAGMENT_BOARD_VOTE_GRANTS,
  FRAGMENT_COMMUNITY_VOTE_GRANT,
  FRAGMENT_COMMUNITY_VOTE_GRANTS,
} from '../fragments/grants'

export const QUERY_GRANTS = gql`
  ${FRAGMENT_BOARD_VOTE_GRANTS}
  ${FRAGMENT_COMMUNITY_VOTE_GRANTS}
  query Grants {
    grants {
      ...BoardVoteGrantsFragment
      ...CommunityVoteGrantsFragment
    }
  }
`

export const QUERY_GRANT = gql`
  ${FRAGMENT_BOARD_VOTE_GRANT}
  ${FRAGMENT_COMMUNITY_VOTE_GRANT}
  query Grant($input: GrantGetInput!) {
    grant(input: $input) {
      ...BoardVoteGrantFragment
      ...CommunityVoteGrantFragment
    }
  }
`

export const QUERY_GRANT_STATISTICS = gql`
  query GrantStatistics {
    grantStatistics {
      grants {
        amountFunded
        amountGranted
        count
      }
      applicants {
        countFunded
      }
    }
  }
`

export const QUERY_GRANT_GET = gql`
  query GrantGet($input: GrantGetInput!) {
    grant(input: $input) {
      ... on BoardVoteGrant {
        applicants {
          project {
            name
            id
          }
        }
      }
      ... on CommunityVoteGrant {
        applicants {
          project {
            name
            id
          }
        }
      }
    }
  }
`
