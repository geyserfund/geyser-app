import { useMemo, useState } from 'react'

import { ProjectForProfilePageFragment, useUserFollowedProjectsQuery } from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import { ProfileFollowed } from '../views/ProfileFollowed'

export const useProfileFollowed = (userId: number) => {
  const { toast } = useNotification()

  const [isLoading, setLoading] = useState(true)
  const [projects, setProjects] = useState<ProjectForProfilePageFragment[]>([])

  useUserFollowedProjectsQuery({
    variables: {
      where: {
        id: userId,
      },
    },
    skip: !userId,
    onCompleted(data) {
      setProjects(data.user.projectFollows as ProjectForProfilePageFragment[])
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

  const renderComponent = useMemo(
    () => <ProfileFollowed projects={projects} isLoading={isLoading} />,
    [projects, isLoading],
  )

  return {
    title: 'Followed',
    sub: projects.length,
    isLoading,
    renderComponent,
  }
}
