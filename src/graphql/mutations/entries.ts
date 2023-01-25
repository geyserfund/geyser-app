import { gql } from '@apollo/client'

export const MUTATION_CREATE_ENTRY = gql`
  mutation Mutation($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
      published
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
      published
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
  mutation Mutation($id: BigInt!) {
    publishEntry(id: $id) {
      id
      published
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

export const MUTATION_DELETE_ENTRY = gql`
  mutation DeleteEntry($deleteEntryId: BigInt!) {
    deleteEntry(id: $deleteEntryId) {
      id
      title
    }
  }
`
