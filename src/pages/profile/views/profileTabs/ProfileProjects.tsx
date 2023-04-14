import { useQuery } from '@apollo/client'

import { LandingCardBaseSkeleton } from '../../../../components/layouts'
import { USER_PROFILE_PROJECTS } from '../../../../graphql'
import { Project, User, UserGetInput } from '../../../../types'
import { LandingProjectCard } from '../../../landing/components'
import { ProfileTabLayout } from '../../components'

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

  return (
    <ProfileTabLayout title="Followed projects">
      {projectsLoading
        ? [1, 2].map((val) => <LandingCardBaseSkeleton key={val} isMobile />)
        : projects.map((project) => {
            return (
              <LandingProjectCard key={project.id} project={project} isMobile />
            )
          })}
    </ProfileTabLayout>
  )
}
