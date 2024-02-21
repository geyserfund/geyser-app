import { useTranslation } from 'react-i18next'

import { ProjectForProfilePageFragment } from '../../../../../types'
import { ProfileTabLayout } from '../../../components'
import { ProfileProjectList } from '../components/ProfileProjectList'
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
      <ProfileProjectList projects={projects} showFollow />
    </ProfileTabLayout>
  )
}
