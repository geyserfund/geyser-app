import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  usePostCreateMutation,
  usePostDeleteMutation,
  usePostPublishMutation,
  usePostUpdateMutation,
  useProjectPostsLazyQuery,
  useProjectUnplublishedPostsLazyQuery,
} from '@/types'

import { useProjectAtom } from '../hooks/useProjectAtom'
import {
  addUpdatePostAtom,
  initialPostsLoadAtom,
  postDeleteAtom,
  postsAtom,
  unpublishedPostsAtom,
} from '../state/postsAtom'
import { isProjectOwnerAtom, updateProjectItemCountsAtom } from '../state/projectAtom'
import { updateProjectItemCountCache } from './cache/projectBodyCache'
import { postUpdateCache, removeProjectPostsCache, updateProjectPostsCache } from './cache/projectPostCache'
import { useCustomMutation } from './custom/useCustomMutation'

/**
 * Query, Create, Update, Delete, Publish project posts for current Project context
 * @param load - Load posts on mount
 */
export const useProjectPostsAPI = (load?: boolean) => {
  const isProjectOwner = useAtomValue(isProjectOwnerAtom)

  const { project, loading } = useProjectAtom()

  const setposts = useSetAtom(postsAtom)
  const setunpublishedPosts = useSetAtom(unpublishedPostsAtom)
  const [initialPostsLoad, setInitialPostsLoad] = useAtom(initialPostsLoadAtom)
  const addUpdatePost = useSetAtom(addUpdatePostAtom)
  const removePost = useSetAtom(postDeleteAtom)

  const updateProjectItemCounts = useSetAtom(updateProjectItemCountsAtom)

  const [queryProjectPosts, queryProjectPostsOptions] = useProjectPostsLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        id: project.id,
      },
    },
    onCompleted(data) {
      const posts = data?.projectGet?.posts || []
      setposts(posts)
      setInitialPostsLoad(true)
    },
  })

  const [queryUnpublishedProjectPosts, queryUnpublishedProjectPostsOptions] = useProjectUnplublishedPostsLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        id: project.id,
      },
    },
    onCompleted(data) {
      const unpublishedPosts = data?.projectGet?.posts || []
      setunpublishedPosts(unpublishedPosts)
    },
  })

  useEffect(() => {
    if (project.id && !loading && load) {
      if (!initialPostsLoad) {
        queryProjectPosts()
      }

      if (isProjectOwner) {
        queryUnpublishedProjectPosts()
      }
    }
  }, [project.id, loading, load, initialPostsLoad, queryUnpublishedProjectPosts, queryProjectPosts, isProjectOwner])

  const [postCreate, postCreateOptions] = useCustomMutation(usePostCreateMutation, {
    onCompleted(data) {
      if (data.postCreate) {
        addUpdatePost(data.postCreate)
        updateProjectItemCounts({ addPost: true })
      }
    },
    update(cache, { data }) {
      if (data?.postCreate) {
        postUpdateCache(cache, data.postCreate)
        updateProjectPostsCache(cache, data.postCreate)
        updateProjectItemCountCache(cache, {
          projectName: project.name,
          addPost: true,
        })
      }
    },
  })

  const [postUpdate, postUpdateOptions] = useCustomMutation(usePostUpdateMutation, {
    onCompleted(data) {
      if (data.postUpdate) {
        addUpdatePost(data.postUpdate)
      }
    },
    update(cache, { data }) {
      if (data?.postUpdate) {
        postUpdateCache(cache, data.postUpdate)
        updateProjectPostsCache(cache, data.postUpdate)
      }
    },
  })

  const [postPublish, postPublishOptions] = useCustomMutation(usePostPublishMutation, {
    onCompleted(data) {
      addUpdatePost(data.postPublish)
    },
    update(cache, { data }) {
      if (data?.postPublish) {
        postUpdateCache(cache, data.postPublish)
        updateProjectPostsCache(cache, data.postPublish)
      }
    },
  })

  const [postDelete, postDeleteOptions] = useCustomMutation(usePostDeleteMutation, {
    onCompleted(data) {
      removePost(data.postDelete.id)
      updateProjectItemCounts({ removePost: true })
    },
    update(cache, { data }) {
      if (data?.postDelete) {
        removeProjectPostsCache(cache, data?.postDelete.id)
        updateProjectItemCountCache(cache, {
          projectName: project.name,
          removePost: true,
        })
      }
    },
  })

  return {
    queryProjectPosts: {
      execute: queryProjectPosts,
      ...queryProjectPostsOptions,
    },
    queryUnpublishedProjectPosts: {
      execute: queryUnpublishedProjectPosts,
      ...queryUnpublishedProjectPostsOptions,
    },
    postCreate: {
      execute: postCreate,
      ...postCreateOptions,
    },
    postUpdate: {
      execute: postUpdate,
      ...postUpdateOptions,
    },
    postPublish: {
      execute: postPublish,
      ...postPublishOptions,
    },
    postDelete: {
      execute: postDelete,
      ...postDeleteOptions,
    },
  }
}
