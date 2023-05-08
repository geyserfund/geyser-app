import { useQuery } from '@apollo/client'

import { LandingCardBaseSkeleton } from '../../../../components/layouts'
import { QUERY_USER_PROFILE_PROJECTS } from '../../../../graphql'
import { Project, User, UserGetInput } from '../../../../types'
import { LandingProjectCard } from '../../../landing/components'
import { CreateAProjectButton, ProfileTabLayout } from '../../components'
import { CreateProject } from '../CreateProject'

export const ProfileProjects = ({
  userProfile,
  isViewingOwnProfile,
}: {
  userProfile: User
  isViewingOwnProfile?: boolean
}) => {
  const { data, loading: projectsLoading } = useQuery<
    { user: User },
    { where: UserGetInput }
  >(QUERY_USER_PROFILE_PROJECTS, {
    variables: {
      where: {
        id: userProfile.id,
      },
    },
    skip: !userProfile?.id,
  })

  const projects =
    (data?.user.ownerOf?.map((val) => val?.project) as Project[]) || []

  if (projects.length === 0 && isViewingOwnProfile) {
    return <CreateProject marginTop="20px" />
  }

  return (
    <ProfileTabLayout
      title="Projects"
      headerContent={
        isViewingOwnProfile ? <CreateAProjectButton size="sm" /> : undefined
      }
    >
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
