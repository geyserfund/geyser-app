import { gql } from '@apollo/client'

export const MUTATION_CREATE_ENTRY = gql`
  mutation CreateEntry($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
      status
      createdAt
      type
      title
      description
      image
      content
      publishedAt
      project {
        id
        title
        name
      }
    }
  }
`

export const MUTATION_UPDATE_ENTRY = gql`
  mutation UpdateEntry($input: UpdateEntryInput!) {
    updateEntry(input: $input) {
      id
      status
      createdAt
      type
      title
      description
      image
      content
      publishedAt
      project {
        id
        title
        name
      }
    }
  }
`

export const MUTATION_PUBLISH_ENTRY = gql`
  mutation PublishEntry($id: BigInt!) {
    publishEntry(id: $id) {
      id
      status
      createdAt
      type
      title
      description
      image
      content
      publishedAt
      project {
        id
        title
        name
      }
    }
  }
`
