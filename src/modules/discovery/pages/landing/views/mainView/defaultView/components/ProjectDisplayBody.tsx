import { GridItem, SimpleGrid, Stack } from '@chakra-ui/react'

import { LandingCardBaseSkeleton, SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography/Body.tsx'

import {
  ContributionsSummary,
  PostForLandingPageFragment,
  ProjectForLandingPageFragment,
} from '../../../../../../../../types/index.ts'
import { LandingProjectCard } from '../../../../components/LandingProjectCard.tsx'
import { LandingPostCard } from './LandingPostCard.tsx'
import { ProjectRowLayout, ProjectRowLayoutProps } from './ProjectRowLayout.tsx'

interface ProjectDisplayBodyProps extends Omit<ProjectRowLayoutProps, 'children'> {
  projects: (ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  })[]
  onSubtitleClick?: () => void
  subtitleId?: string
  rightContent?: React.ReactNode
  posts?: PostForLandingPageFragment[]
  description?: string
}

export const ProjectDisplayBody = ({
  title,
  subtitle,
  subtext,
  projects,
  onSubtitleClick,
  subtitleId,
  rightContent,
  posts,
  description,
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
        fontStyle: 'italic',
        textTransform: 'capitalize',
      }}
      rightContent={rightContent}
    >
      {description && (
        <Body size="sm" medium>
          {description}
        </Body>
      )}
      <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
        {projects.map((project) => {
          return (
            <GridItem key={project.id}>
              <LandingProjectCard key={project.id} project={project} />
            </GridItem>
          )
        })}
      </SimpleGrid>
      {posts && (
        <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }} paddingTop={4}>
          {posts.map((post) => (
            <LandingPostCard post={post} key={post.id} />
          ))}
        </SimpleGrid>
      )}
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
