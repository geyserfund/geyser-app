import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_POST_VIEW } from '../fragments/postFragment'

export const MUTATION_POST_DELETE = gql`
  mutation PostDelete($postDeleteId: BigInt!) {
    postDelete(id: $postDeleteId) {
      id
      title
    }
  }
`

export const MUTATION_POST_CREATE = gql`
  ${FRAGMENT_PROJECT_POST_VIEW}
  mutation PostCreate($input: PostCreateInput!) {
    postCreate(input: $input) {
      ...ProjectPostView
    }
  }
`

export const MUTATION_POST_UPDATE = gql`
  ${FRAGMENT_PROJECT_POST_VIEW}
  mutation PostUpdate($input: PostUpdateInput!) {
    postUpdate(input: $input) {
      ...ProjectPostView
    }
  }
`

export const MUTATION_POST_PUBLISH = gql`
  ${FRAGMENT_PROJECT_POST_VIEW}
  mutation PostPublish($input: PostPublishInput!) {
    postPublish(input: $input) {
      ...ProjectPostView
    }
  }
`

export const MUTATION_POST_SEND_VIA_EMAIL = gql`
  mutation PostSendByEmail($input: PostSendByEmailInput!) {
    postSendByEmail(input: $input) {
      recipientCount
    }
  }
`
