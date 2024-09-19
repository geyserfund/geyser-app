import { useEffect, useState } from 'react'

import { Project, useMeProjectFollowsQuery, useProjectUnfollowMutation } from '@/types'
import { useNotification } from '@/utils'

export const useFollowedProjects = () => {
  const [followedProjects, setFollowedProjects] = useState<Project[]>([])
  const toast = useNotification()

  const { refetch } = useMeProjectFollowsQuery({
    onCompleted(data) {
      setFollowedProjects(data.me?.projectFollows as Project[])
    },
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  const [unfollowProjectMutation] = useProjectUnfollowMutation()

  const unfollowProject = (projectId: string) => {
    unfollowProjectMutation({
      variables: { input: { projectId } },
      onCompleted() {
        toast.success({
          title: 'Unfollowed project',
          description: 'You will no longer receive updates for this project.',
        })
      },
    })
  }

  return {
    followedProjects,
    unfollowProject,
  }
}
