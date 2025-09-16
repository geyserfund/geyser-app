import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_FOR_OWNER = gql`
  fragment ProjectForOwner on Project {
    id
    name
    images
    thumbnailImage
    title
    status
    createdAt
    lastCreationStep
  }
`
