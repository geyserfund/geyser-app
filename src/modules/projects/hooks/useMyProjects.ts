import { useState } from 'react'

import { ProjectForProfilePageFragment, useUserProfileProjectsQuery } from '@/types'
import { useNotification } from '@/utils'

export const useMyProjects = (userId: number) => {
  const { toast } = useNotification()

  const [isLoading, setLoading] = useState(true)
  const [projects, setProjects] = useState<ProjectForProfilePageFragment[]>([])

  useUserProfileProjectsQuery({
    variables: {
      where: {
        id: userId,
      },
    },
    skip: !userId,
    onCompleted(data) {
      setProjects(data.user.ownerOf?.map((val) => val?.project) as ProjectForProfilePageFragment[])
      setLoading(false)
    },
    onError(error) {
      toast({
        status: 'error',
        title: 'Failed to fetch projects',
        description: `${error.message}`,
      })
      setLoading(false)
    },
  })

  return {
    projects,
    isLoading,
  }
}
