import { Stack } from '@chakra-ui/react'

import { Project } from '../../../../types'
import { LandingProjectCard } from '../../components'
import { ProjectRowLayout, ProjectRowLayoutProps } from '../elements'

interface ProjectDisplayBodyProps
  extends Omit<ProjectRowLayoutProps, 'children'> {
  projects: Project[]
}

export const ProjectDisplayBody = ({
  title,
  subtitle,
  projects,
  onSeeAllClick,
}: ProjectDisplayBodyProps) => {
  return (
    <ProjectRowLayout
      title={title}
      subtitle={subtitle}
      width="100%"
      onSeeAllClick={onSeeAllClick}
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
