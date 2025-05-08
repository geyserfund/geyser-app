import { Stack } from '@chakra-ui/react'

import { LandingCardBaseSkeleton, SkeletonLayout } from '@/shared/components/layouts'

import { ContributionsSummary, ProjectForLandingPageFragment } from '../../../../../../../types'
import { LandingProjectCard } from '../../../components/LandingProjectCard'
import { ProjectRowLayout, ProjectRowLayoutProps } from './ProjectRowLayout'

interface ProjectDisplayBodyProps extends Omit<ProjectRowLayoutProps, 'children'> {
  projects: (ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  })[]
  onSubtitleClick?: () => void
  subtitleId?: string
  rightContent?: React.ReactNode
}

export const ProjectDisplayBody = ({
  title,
  subtitle,
  subtext,
  projects,
  onSubtitleClick,
  subtitleId,
  rightContent,
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
      rightContent={rightContent}
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
