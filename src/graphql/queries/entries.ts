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
      status
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

export const QUERY_GET_ENTRY_WITH_OWNERS = gql`
  query EntryWithOwners($id: BigInt!) {
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
      status
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
        owners {
          user {
            id
          }
        }
      }
    }
  }
`

/**
 * @returns `Entry`
 */
export const QUERY_ALL_GEYSER_PROJECT_ENTRIES = gql`
  query AllEntries($input: GetEntriesInput!) {
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
