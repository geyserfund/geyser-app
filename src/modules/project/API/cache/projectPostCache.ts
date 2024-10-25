import { ApolloCache } from '@apollo/client'

import { PostStatus, ProjectPostViewFragment } from '@/types'

import { QUERY_POST } from '../../graphql/queries/postsQuery'

export const postUpdateCache = (cache: ApolloCache<any>, post: ProjectPostViewFragment) => {
  cache.writeQuery({
    query: QUERY_POST,
    variables: {
      postId: post.id,
    },
    data: {
      post,
    },
  })
}

export const updateProjectPostsCache = (cache: ApolloCache<any>, post: ProjectPostViewFragment) => {
  cache.modify({
    fields: {
      projectPosts(existingPosts = [], { readField }) {
        const isExist = existingPosts.some((val: ProjectPostViewFragment) => readField('id', val) === post.id)

        if (!isExist && post.status === PostStatus.Published) {
          return [...existingPosts, post]
        }

        return existingPosts.map((val: ProjectPostViewFragment) => (readField('id', val) === post.id ? post : val))
      },
      ProjectUnplublishedPosts(existingPosts = [], { readField }) {
        const isExist = existingPosts.some((val: ProjectPostViewFragment) => readField('id', val) === post.id)

        if (!isExist && post.status === PostStatus.Unpublished) {
          return [...existingPosts, post]
        }

        return existingPosts.map((val: ProjectPostViewFragment) => (readField('id', val) === post.id ? post : val))
      },
    },
  })
}

export const removeProjectPostsCache = (cache: ApolloCache<any>, postId: any) => {
  cache.modify({
    fields: {
      projectPosts(existingPosts = [], { readField }) {
        return existingPosts.filter((val: ProjectPostViewFragment) => readField('id', val) !== postId)
      },
      ProjectUnplublishedPosts(existingPosts = [], { readField }) {
        return existingPosts.filter((val: ProjectPostViewFragment) => readField('id', val) !== postId)
      },
    },
  })
}
