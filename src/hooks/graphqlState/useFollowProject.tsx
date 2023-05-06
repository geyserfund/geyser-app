import React from 'react'

import { useAuthContext } from '../../context'
import { QUERY_ME_PROJECT_FOLLOWS } from '../../graphql'
import {
  useProjectFollowMutation,
  useProjectUnfollowMutation,
} from '../../types'
import { toInt } from '../../utils'

export const useFollowProject = (projectId: number) => {
  const { followedProjects } = useAuthContext()

  const [followProject, { loading: followLoading }] = useProjectFollowMutation({
    variables: {
      input: {
        projectId: toInt(projectId),
      },
    },
    refetchQueries: [QUERY_ME_PROJECT_FOLLOWS],
  })

  const [unFollowProject, { loading: unfollowLoading }] =
    useProjectUnfollowMutation({
      variables: {
        input: {
          projectId: toInt(projectId),
        },
      },
      refetchQueries: [QUERY_ME_PROJECT_FOLLOWS],
    })

  const isFollowed = Boolean(
    followedProjects.find((project) => toInt(project?.id) === toInt(projectId)),
  )

  const handleFollow = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
    }

    followProject()
  }

  const handleUnFollow = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
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
