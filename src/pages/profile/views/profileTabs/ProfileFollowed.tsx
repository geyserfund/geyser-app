import { useQuery } from '@apollo/client'

import { LandingCardBaseSkeleton } from '../../../../components/layouts'
import { USER_FOLLOWED_PROJECTS } from '../../../../graphql'
import { Project, User, UserGetInput } from '../../../../types'
import { LandingProjectCard } from '../../../landing/components'
import { ProfileTabLayout } from '../../components'

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
