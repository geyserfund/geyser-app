import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_FOR_LANDING_PAGE = gql`
  fragment ProjectForLandingPage on Project {
    id
    name
    balance
    balanceUsdCent
    fundersCount
    thumbnailImage
    shortDescription
    title
    status
  }
`
