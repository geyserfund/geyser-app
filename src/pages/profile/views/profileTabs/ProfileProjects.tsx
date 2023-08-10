import { useTranslation } from 'react-i18next'

import { LandingCardBaseSkeleton } from '../../../../components/layouts'
import {
  ProjectForProfilePageFragment,
  User,
  useUserProfileProjectsQuery,
} from '../../../../types'
import { LandingProjectCard } from '../../../landing/components'
import { CreateAProjectButton, ProfileTabLayout } from '../../components'
import { CreateProject } from './CreateProject'

export const ProfileProjects = ({
  userProfile,
  isViewingOwnProfile,
}: {
  userProfile: User
  isViewingOwnProfile?: boolean
}) => {
  const { t } = useTranslation()
  const { data, loading: projectsLoading } = useUserProfileProjectsQuery({
    variables: {
      where: {
        id: userProfile.id,
      },
    },
    skip: !userProfile?.id,
  })

  const projects =
    (data?.user.ownerOf?.map(
      (val) => val?.project,
    ) as ProjectForProfilePageFragment[]) || []

  if (projects.length === 0 && isViewingOwnProfile) {
    return <CreateProject marginTop="20px" />
  }

  const projectsToRender = projects.sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  )

  return (
    <ProfileTabLayout
      title={t('Projects')}
      headerContent={
        isViewingOwnProfile ? (
          <CreateAProjectButton size="sm" marginTop={'0px'} />
        ) : undefined
      }
    >
      {projectsLoading
        ? [1, 2].map((val) => <LandingCardBaseSkeleton key={val} isMobile />)
        : projectsToRender.map((project) => {
            return (
              <LandingProjectCard key={project.id} project={project} isMobile />
            )
          })}
    </ProfileTabLayout>
  )
}
