import { Stack } from '@chakra-ui/react'

import { ProjectForLandingPageFragment } from '../../../../types'
import { LandingProjectCard } from '../../components'
import { ProjectRowLayout, ProjectRowLayoutProps } from '../elements'

interface ProjectDisplayBodyProps
  extends Omit<ProjectRowLayoutProps, 'children'> {
  projects: ProjectForLandingPageFragment[]
  seeAllText?: string
}

export const ProjectDisplayBody = ({
  title,
  subtitle,
  projects,
  onSeeAllClick,
  seeAllText,
}: ProjectDisplayBodyProps) => {
  return (
    <ProjectRowLayout
      title={title}
      subtitle={subtitle}
      width="100%"
      onSeeAllClick={onSeeAllClick}
      seeAllText={seeAllText}
    >
      <Stack
        width="100%"
        direction={{ base: 'column', xl: 'row' }}
        spacing="20px"
      >
        {projects.map((project) => {
          return <LandingProjectCard key={project.id} project={project} />
        })}
      </Stack>
    </ProjectRowLayout>
  )
}
