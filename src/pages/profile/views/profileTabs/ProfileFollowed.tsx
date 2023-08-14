import { useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { LandingCardBaseSkeleton } from '../../../../components/layouts'
import { QUERY_USER_FOLLOWED_PROJECTS } from '../../../../graphql'
import { User, UserGetInput } from '../../../../types'
import { LandingProjectCard } from '../../../landing/components'
import { ProfileTabLayout } from '../../components'

export const ProfileFollowed = ({ userProfile }: { userProfile: User }) => {
  const { t } = useTranslation()
  const { data, loading: projectsLoading } = useQuery<
    { user: User },
    { where: UserGetInput }
  >(QUERY_USER_FOLLOWED_PROJECTS, {
    variables: {
      where: {
        id: userProfile.id,
      },
    },
    skip: !userProfile?.id,
  })

  const projects = data?.user.projectFollows || []
  const projectsToRender = [...projects].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  )

  return (
    <ProfileTabLayout title={t('Followed projects')}>
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
