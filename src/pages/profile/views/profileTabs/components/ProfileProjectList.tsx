import { CardLayout } from '../../../../../components/layouts'
import { ProjectForProfilePageFragment } from '../../../../../types'
import { ProfileProjectCard } from './ProfileProjectCard'

interface ProfileProjectListProps {
  projects: ProjectForProfilePageFragment[]
  showStatus?: boolean
  showFollow?: boolean
  showStats?: boolean
}

export const ProfileProjectList = ({ projects, ...rest }: ProfileProjectListProps) => {
  return (
    <CardLayout w="full" padding="0px" overflow="visible" spacing="0px">
      {projects.map((project, index) => {
        return (
          <ProfileProjectCard
            key={project.id}
            project={project}
            borderX="none"
            borderBottom="none"
            {...(index === 0
              ? { borderTop: 'none' }
              : {
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                })}
            _hover={{ backgroundColor: 'neutral.50', cursor: 'pointer', transition: 'background-color 0.2s' }}
            {...rest}
          />
        )
      })}
    </CardLayout>
  )
}
