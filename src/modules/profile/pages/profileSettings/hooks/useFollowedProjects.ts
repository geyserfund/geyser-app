import { useState } from 'react'

import { Project, useMeProjectFollowsQuery } from '@/types'

export const useFollowedProjects = () => {
  const [followedProjects, setFollowedProjects] = useState<Project[]>([])

  useMeProjectFollowsQuery({
    onCompleted(data) {
      setFollowedProjects(data.me?.projectFollows as Project[])
    },
  })

  return {
    followedProjects,
  }
}
