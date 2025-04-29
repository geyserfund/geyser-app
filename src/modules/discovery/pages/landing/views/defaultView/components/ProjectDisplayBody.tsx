import { Stack } from '@chakra-ui/react'

import { LandingCardBaseSkeleton, SkeletonLayout } from '@/shared/components/layouts'

import { ProjectForLandingPageFragment } from '../../../../../../../types'
import { LandingProjectCard } from '../../../components/LandingProjectCard'
import { ProjectRowLayout, ProjectRowLayoutProps } from './ProjectRowLayout'

interface ProjectDisplayBodyProps extends Omit<ProjectRowLayoutProps, 'children'> {
  projects: ProjectForLandingPageFragment[]
  onSubtitleClick?: () => void
  subtitleId?: string
}

export const ProjectDisplayBody = ({
  title,
  subtitle,
  subtext,
  projects,
  onSubtitleClick,
  subtitleId,
}: ProjectDisplayBodyProps) => {
  return (
    <ProjectRowLayout
      title={title}
      subtitle={subtitle}
      subtext={subtext}
      width="100%"
      subtitleProps={{
        id: subtitleId,
        onClick: onSubtitleClick,
        textDecoration: 'underline',
        _hover: { cursor: 'pointer' },
      }}
    >
      <Stack width="100%" direction={{ base: 'column', lg: 'row' }} spacing={4}>
        {projects.map((project) => {
          return (
            <LandingProjectCard
              key={project.id}
              project={project}
              maxWidth={{ base: 'unset', lg: 'calc((100% - 48px) / 4 )' }}
            />
          )
        })}
      </Stack>
    </ProjectRowLayout>
  )
}

export const ProjectDisplayBodySkeleton = () => {
  return (
    <ProjectRowLayout title={<SkeletonLayout height="38px" width="250px" />} width="100%">
      <Stack width="100%" direction={{ base: 'column', lg: 'row' }} spacing={4}>
        {[1, 2, 3, 4].map((id) => {
          return <LandingCardBaseSkeleton key={id} />
        })}
      </Stack>
    </ProjectRowLayout>
  )
}
