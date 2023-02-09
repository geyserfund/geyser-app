import { VStack } from '@chakra-ui/react'

import { ProjectFundingLeaderboardFeedItem } from '../../../../components/molecules'
import { ID } from '../../../../constants/components'
import { ScrollInvoke } from '../../../../helpers'
import { PaginationHookReturn } from '../../../../hooks/types'
import { Funder, Project } from '../../../../types/generated/graphql'
import { useMobileMode } from '../../../../utils'

interface ProjectLeaderboardListProps {
  project: Project
  funders: PaginationHookReturn<Funder>
}

export const ProjectLeaderboardList = ({
  project,
  funders,
}: ProjectLeaderboardListProps) => {
  const isMobile = useMobileMode()
  const id = ID.project.activity.leaderboard
  return (
    <VStack
      id={id}
      spacing={'8px'}
      width="100%"
      overflow="auto"
      height={isMobile ? 'calc(100% - 44px)' : '100%'}
      paddingBottom="10px"
    >
      {funders.data.map((funder, index) => (
        <ProjectFundingLeaderboardFeedItem
          key={index}
          funder={funder}
          leaderboardPosition={index + 1}
          project={project}
        />
      ))}
      <ScrollInvoke
        elementId={!isMobile ? id : undefined}
        onScrollEnd={funders.fetchNext}
        isLoading={funders.isLoadingMore}
        noMoreItems={funders.noMoreItems}
      />
    </VStack>
  )
}
