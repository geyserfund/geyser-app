import { useMemo, useState } from 'react'

import { ProjectForProfilePageFragment, useUserProfileProjectsQuery } from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import { ProfileProjects } from '../views/ProfileProjects'

export const useProfileProjects = (userId: number) => {
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

  const renderComponent = useMemo(
    () => <ProfileProjects projects={projects} isLoading={isLoading} />,
    [projects, isLoading],
  )

  return {
    title: 'Projects',
    sub: projects.length,
    isLoading,
    renderComponent,
  }
}
