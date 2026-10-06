import { GridItem, SimpleGrid } from '@chakra-ui/react'

import { LandingCardBaseSkeleton, SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography/Body.tsx'

import {
  ContributionsSummary,
  PostForLandingPageFragment,
  ProjectForLandingPageFragment,
} from '../../../../../../../../types/index.ts'
import { LandingProjectCard } from '../../../../components/LandingProjectCard.tsx'
import { LandingPostCardPost, LandingProjectCardProject } from '../../../../graphql/landingPageTypes.ts'
import { LandingPostCard } from './LandingPostCard.tsx'
import { ProjectRowLayout, ProjectRowLayoutProps } from './ProjectRowLayout.tsx'

export type ProjectDisplayItem = (ProjectForLandingPageFragment | LandingProjectCardProject) & {
  contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  statusPillLabel?: string
}

interface ProjectDisplayBodyProps extends Omit<ProjectRowLayoutProps, 'children'> {
  projects: ProjectDisplayItem[]
  onSubtitleClick?: () => void
  subtitleId?: string
  rightContent?: React.ReactNode
  posts?: (PostForLandingPageFragment | LandingPostCardPost)[]
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
      <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
        {projects.map((project) => {
          return (
            <GridItem key={project.id}>
              <LandingProjectCard key={project.id} project={project} statusPillLabel={project.statusPillLabel} />
            </GridItem>
          )
        })}
      </SimpleGrid>
      {posts && (
        <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }} paddingTop={4}>
          {posts.map((post) => (
            <LandingPostCard post={post} key={post.id} />
          ))}
        </SimpleGrid>
      )}
    </ProjectRowLayout>
  )
}

type ProjectDisplayBodySkeletonProps = {
  /** Real section title, shown while cards load so the heading does not jump. */
  title?: string
  /** Number of placeholder cards; match the number of cards the section will show. */
  count?: number
  rightContent?: React.ReactNode
}

/** Loading placeholder for a project row that keeps the final layout: same title, same number of cards. */
export const ProjectDisplayBodySkeleton = ({ title, count = 3, rightContent }: ProjectDisplayBodySkeletonProps) => {
  return (
    <ProjectRowLayout
      title={title ?? <SkeletonLayout height="38px" width="250px" />}
      width="100%"
      rightContent={rightContent}
    >
      <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
        {Array.from({ length: count }).map((_, index) => {
          return <LandingCardBaseSkeleton key={index} />
        })}
      </SimpleGrid>
    </ProjectRowLayout>
  )
}
