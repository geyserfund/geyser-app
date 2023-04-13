import { useQuery } from '@apollo/client'

import { CardLayout } from '../../../../components/layouts'
import Loader from '../../../../components/ui/Loader'
import { USER_FOLLOWED_PROJECTS } from '../../../../graphql'
import { Project, User, UserGetInput } from '../../../../types'
import { LandingProjectCard } from '../../../landing/components'

export const ProfileFollowed = ({ userProfile }: { userProfile: User }) => {
  const { data, loading: projectsLoading } = useQuery<
    { user: User },
    { where: UserGetInput }
  >(USER_FOLLOWED_PROJECTS, {
    variables: {
      where: {
        id: userProfile.id,
      },
    },
  })

  const projects = (data?.user.projectFollows as Project[]) || []

  if (projectsLoading) {
    return <Loader />
  }

  return (
    <CardLayout spacing="20px" h="100%" overflowY="auto">
      {projects.map((project) => {
        return (
          <LandingProjectCard key={project.id} project={project} isMobile />
        )
      })}
    </CardLayout>
  )
}
