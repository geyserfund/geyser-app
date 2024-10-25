import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_POST, FRAGMENT_PROJECT_POST_VIEW } from '../fragments/postFragment'

export const QUERY_PROJECT_POSTS = gql`
  ${FRAGMENT_PROJECT_POST}
  query ProjectPosts($where: UniqueProjectQueryInput!, $input: ProjectPostsGetInput) {
    projectGet(where: $where) {
      id
      posts(input: $input) {
        ...ProjectPost
      }
    }
  }
`

export const QUERY_PROJECT_UNPUBLISHED_POSTS = gql`
  ${FRAGMENT_PROJECT_POST}
  query ProjectUnplublishedPosts($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      id
      posts: posts(input: { where: { published: false } }) {
        ...ProjectPost
      }
    }
  }
`

export const QUERY_POST = gql`
  ${FRAGMENT_PROJECT_POST_VIEW}
  query ProjectPost($postId: BigInt!) {
    post(id: $postId) {
      ...ProjectPostView
    }
  }
`

export const QUERY_EMAIL_COUNT_FOR_EMAIL_SEND_SEGMENT = gql`
  query PostEmailSegmentSizeGet($input: PostEmailSegmentSizeGetInput!) {
    postEmailSegmentSizeGet(input: $input)
  }
`
