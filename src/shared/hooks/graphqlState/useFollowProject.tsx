import { useSetAtom } from 'jotai'
import React from 'react'

import { followedProjectsAtom, useFollowedProjectsValue } from '../../../modules/auth/state'
import { Project, useProjectFollowMutation, useProjectUnfollowMutation } from '../../../types'
import { toInt } from '../../../utils'

export const useFollowProject = (project: Pick<Project, 'id' | 'name' | 'title'>) => {
  const followedProjects = useFollowedProjectsValue()

  const setFollowedProjects = useSetAtom(followedProjectsAtom)

  const [followProject, { loading: followLoading, error: followError }] = useProjectFollowMutation({
    variables: {
      input: {
        projectId: toInt(project.id),
      },
    },
    onCompleted() {
      setFollowedProjects((prev) => [...prev, project])
    },
  })

  const [unFollowProject, { loading: unfollowLoading, error: unfollowError }] = useProjectUnfollowMutation({
    variables: {
      input: {
        projectId: toInt(project.id),
      },
    },
    onCompleted() {
      setFollowedProjects((prev) => prev.filter((p) => toInt(p.id) !== toInt(project.id)))
    },
  })

  const isFollowed = Boolean(followedProjects.find((fp) => toInt(project?.id) === toInt(fp.id)))

  const handleFollow = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
    }

    if (isFollowed) {
      return
    }

    return followProject()
  }

  const handleUnFollow = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
    }

    if (!isFollowed) {
      return
    }

    return unFollowProject()
  }

  return {
    isFollowed,
    handleFollow,
    handleUnFollow,
    loading: followLoading || unfollowLoading,
    error: followError || unfollowError,
    followLoading,
    unfollowLoading,
    followError,
    unfollowError,
  }
}
