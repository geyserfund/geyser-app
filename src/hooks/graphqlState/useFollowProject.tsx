import React from 'react'

import { useAuthContext } from '../../context'
import { useFollowedProjectsValue } from '../../pages/auth/state'
import { useProjectFollowMutation, useProjectUnfollowMutation } from '../../types'
import { toInt } from '../../utils'

export const useFollowProject = (projectId: number) => {
  const followedProjects = useFollowedProjectsValue()
  const { queryFollowedProjects } = useAuthContext()

  const [followProject, { loading: followLoading }] = useProjectFollowMutation({
    variables: {
      input: {
        projectId: toInt(projectId),
      },
    },
    onCompleted() {
      queryFollowedProjects()
    },
  })

  const [unFollowProject, { loading: unfollowLoading }] = useProjectUnfollowMutation({
    variables: {
      input: {
        projectId: toInt(projectId),
      },
    },
    onCompleted() {
      queryFollowedProjects()
    },
  })

  const isFollowed = Boolean(followedProjects.find((project) => toInt(project?.id) === toInt(projectId)))

  const handleFollow = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
    }

    if (isFollowed) {
      return
    }

    followProject()
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

    unFollowProject()
  }

  return {
    isFollowed,
    handleFollow,
    handleUnFollow,
    followLoading,
    unfollowLoading,
  }
}
