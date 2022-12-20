import { VStack } from '@chakra-ui/react';
import React from 'react';
import { ProjectFundingLeaderboardFeedItem } from '../../../components/molecules';
import { ScrollInvoke } from '../../../helpers';
import { PaginationHookReturn } from '../../../hooks/types';
import { Funder, Project } from '../../../types/generated/graphql';
import { isMobileMode } from '../../../utils';

interface ProjectLederboardListProps {
  project: Project;
  funders: PaginationHookReturn<Funder>;
}

export const ProjectLederboardList = ({
  project,
  funders,
}: ProjectLederboardListProps) => {
  const isMobile = isMobileMode();

  return (
    <VStack
      id="project-activity-list-container"
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
      {funders.noMoreItems.current === false && (
        <ScrollInvoke
          elementId="project-activity-list-container"
          onScrollEnd={funders.fetchNext}
          isLoading={funders.isLoadingMore.current}
        />
      )}
    </VStack>
  );
};
