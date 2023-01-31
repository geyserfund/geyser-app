import { gql } from '@apollo/client'

export const QUERY_GET_ENTRY = gql`
  query Entry($id: BigInt!) {
    entry(id: $id) {
      id
      title
      description
      image
      published
      content
      createdAt
      updatedAt
      publishedAt
      fundersCount
      type
      creator {
        id
        username
        imageUrl
      }
      project {
        id
        title
        name
      }
    }
  }
`

/**
 * @returns `Entry`
 */
export const QUERY_ALL_GEYSER_PROJECT_ENTRIES = gql`
  query GetEntries($input: GetEntriesInput!) {
    getEntries(input: $input) {
      id
      title
      description
      image
      fundersCount
      amountFunded
      type
      published

      project {
        title
        name
        image
      }
    }
  }
`

export const QUERY_GET_SIGNED_URL = gql`
  query GetSignedUploadUrl($input: FileUploadInput!) {
    getSignedUploadUrl(input: $input) {
      uploadUrl
      distributionUrl
    }
  }
`
