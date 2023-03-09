import { useMutation } from '@apollo/client'
import React from 'react'

import { useAuthContext } from '../../context'
import {
  MUTATION_FOLLOW_PROJECT,
  MUTATION_UNFOLLOW_PROJECT,
} from '../../graphql/mutations'
import {
  MutationProjectFollowArgs,
  MutationProjectUnfollowArgs,
} from '../../types'
import { toInt } from '../../utils'

export const useFollowProject = (projectId: number) => {
  const { followedProjects, queryFollowedProjects } = useAuthContext()

  const [followProject, { loading: followLoading }] = useMutation<
    any,
    MutationProjectFollowArgs
  >(MUTATION_FOLLOW_PROJECT, {
    variables: {
      input: {
        projectId: toInt(projectId),
      },
    },
    onCompleted() {
      queryFollowedProjects()
    },
  })

  const [unFollowProject, { loading: unfollowLoading }] = useMutation<
    any,
    MutationProjectUnfollowArgs
  >(MUTATION_UNFOLLOW_PROJECT, {
    variables: {
      input: {
        projectId: toInt(projectId),
      },
    },
    onCompleted() {
      queryFollowedProjects()
    },
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
