import { useTranslation } from 'react-i18next'

import { ProjectForProfilePageFragment } from '../../../../../types'
import { ProfileTabLayout } from '../../../components'
import { ProfileProjectCard } from '../components/ProfileProjectCard'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'

interface ProfileFollowedProps {
  projects: ProjectForProfilePageFragment[]
  isLoading: boolean
}

export const ProfileFollowed = ({ projects, isLoading }: ProfileFollowedProps) => {
  const { t } = useTranslation()

  if (isLoading) {
    return <TabPanelSkeleton />
  }

  return (
    <ProfileTabLayout heading={t('Followed projects')}>
      {projects.map((project) => {
        return <ProfileProjectCard key={project.id} project={project} showFollow />
      })}
    </ProfileTabLayout>
  )
}
