import { gql } from '@apollo/client'

export const QUERY_TAGS = gql`
  query TagsGet {
    tagsGet {
      label
      id
      count
    }
  }
`

export const QUERY_COUNTRIES = gql`
  query ProjectCountriesGet {
    projectCountriesGet {
      count
      country {
        code
        name
      }
    }
  }
`

export const QUERY_REGION = gql`
  query ProjectRegionsGet {
    projectRegionsGet {
      count
      region
    }
  }
`
