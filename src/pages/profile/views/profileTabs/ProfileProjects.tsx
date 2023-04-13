import { useQuery } from '@apollo/client'
import { Loader } from '@giphy/react-components'

import { CardLayout } from '../../../../components/layouts'
import { USER_PROFILE_PROJECTS } from '../../../../graphql'
import { Project, User, UserGetInput } from '../../../../types'
import { LandingProjectCard } from '../../../landing/components'

export const ProfileProjects = ({ userProfile }: { userProfile: User }) => {
  const { data, loading: projectsLoading } = useQuery<
    { user: User },
    { where: UserGetInput }
  >(USER_PROFILE_PROJECTS, {
    variables: {
      where: {
        id: userProfile.id,
      },
    },
  })

  const projects =
    (data?.user.ownerOf?.map((val) => val?.project) as Project[]) || []

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
