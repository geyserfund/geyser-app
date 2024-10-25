import { atom } from 'jotai'

import { PostStatus, ProjectPostFragment, ProjectPostViewFragment } from '../../../types'
import { isProjectOwnerAtom } from './projectAtom'

/** Published Posts for Project in context */
export const postsAtom = atom<ProjectPostFragment[]>([])

/** Unpublished Posts for Project in context */
export const unpublishedPostsAtom = atom<ProjectPostFragment[]>([])

/** Initial load for posts, set to true after loaded */
export const initialPostsLoadAtom = atom(false)

/** Boolen to see if posts exist */
export const hasPostsAtom = atom((get) => {
  const posts = get(postsAtom)
  const unpublishedPosts = get(unpublishedPostsAtom)
  const isProjectOwner = get(isProjectOwnerAtom)
  return posts.length > 0 || (isProjectOwner && unpublishedPosts.length > 0)
})

/** Delete post by id */
export const postDeleteAtom = atom(null, (get, set, postId: string) => {
  const posts = get(postsAtom)
  const unpublishedPosts = get(unpublishedPostsAtom)

  if (posts.some((post) => post.id === postId)) {
    const newPosts = posts.filter((post) => post.id !== postId)
    set(postsAtom, newPosts)
  } else if (unpublishedPosts.some((post) => post.id === postId)) {
    const newPosts = unpublishedPosts.filter((post) => post.id !== postId)
    set(unpublishedPostsAtom, newPosts)
  }
})

/** add new post or update existing post  */
export const addUpdatePostAtom = atom(null, (get, set, post: ProjectPostFragment | ProjectPostViewFragment) => {
  const allPosts = get(postsAtom)
  const allUnpublishedPosts = get(unpublishedPostsAtom)

  const isPostExist = allPosts.some((e) => e.id === post.id)
  const isPostExistInUnpublished = allUnpublishedPosts.some((e) => e.id === post.id)

  if (isPostExistInUnpublished) {
    /** If post status is update to publish, move post from unpublished to publish */
    if (post.status === PostStatus.Published) {
      const newUnpublishedPosts = allUnpublishedPosts.filter((e) => e.id !== post.id)
      set(unpublishedPostsAtom, newUnpublishedPosts)

      const newPosts = [post, ...allPosts]
      set(postsAtom, newPosts)
      return
    }

    /** If post status is update to unpublished, update post in unpublished */
    const newUnpublishedPosts = allUnpublishedPosts.map((e) => (e.id === post.id ? post : e))
    set(unpublishedPostsAtom, newUnpublishedPosts)
    return
  }

  /** If post is already published, update post in published */
  if (isPostExist) {
    const newPosts = allPosts.map((e) => (e.id === post.id ? post : e))
    set(postsAtom, newPosts)
    return
  }

  /** If post is new and status is published, add post to published */
  if (post.status === PostStatus.Published) {
    const newPosts = [post, ...allPosts]
    set(postsAtom, newPosts)
    return
  }

  /** If post is new and status is unpublished, add post to unpublished */
  const newUnpublishedPosts = [post, ...allUnpublishedPosts]
  set(unpublishedPostsAtom, newUnpublishedPosts)
})

/** Reset all real-atoms in this file to it's initial State */
export const postsAtomReset = atom(null, (get, set) => {
  set(postsAtom, [])
  set(unpublishedPostsAtom, [])
  set(initialPostsLoadAtom, false)
})
