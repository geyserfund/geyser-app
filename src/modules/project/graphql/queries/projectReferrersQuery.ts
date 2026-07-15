import { gql } from '@apollo/client'

export const QUERY_PROJECT_REFERRERS_SEARCH = gql`
  query ProjectReferrersSearch($input: ProjectReferrersSearchInput) {
    projectReferrersSearch(input: $input) {
      fieldPartners {
        id
        username
        heroId
        imageUrl
        isFieldPartner
      }
      others {
        id
        username
        heroId
        imageUrl
        isFieldPartner
      }
    }
  }
`
