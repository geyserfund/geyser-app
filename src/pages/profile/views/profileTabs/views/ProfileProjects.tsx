import { useTranslation } from 'react-i18next'

import { ProjectForProfilePageFragment } from '../../../../../types'
import { CreateAProjectButton, ProfileTabLayout } from '../../../components'
import { useViewingOwnProfileAtomValue } from '../../../state'
import { CreateProject } from '../components/CreateProject'
import { ProfileProjectCard } from '../components/ProfileProjectCard'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'

const ProfileProjectsLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation()
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()
  return (
    <ProfileTabLayout
      heading={t('Projects')}
      headerContent={isViewingOwnProfile ? <CreateAProjectButton size="sm" marginTop={'0px'} /> : undefined}
    >
      {children}
    </ProfileTabLayout>
  )
}

export const ProfileProjects = ({
  projects,
  isLoading,
}: {
  projects: ProjectForProfilePageFragment[]
  isLoading: boolean
}) => {
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  if (isLoading) {
    return <TabPanelSkeleton />
  }

  if (projects.length === 0 && isViewingOwnProfile) {
    return <CreateProject marginTop="20px" />
  }

  const projectsToRender = projects.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))

  return (
    <ProfileProjectsLayout>
      {projectsToRender.map((project) => {
        return (
          <ProfileProjectCard
            key={project.id}
            project={project}
            showStatus={isViewingOwnProfile}
            showFollow={!isViewingOwnProfile}
            showStats
          />
        )
      })}
    </ProfileProjectsLayout>
  )
}
