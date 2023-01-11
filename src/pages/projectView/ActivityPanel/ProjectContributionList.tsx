import { VStack } from '@chakra-ui/react';
import React from 'react';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules';
import { ProjectNavBar } from '../../../components/nav';
import { ScrollInvoke } from '../../../helpers';
import { PaginationHookReturn } from '../../../hooks/types';
import { FundingTxWithCount, isMobileMode } from '../../../utils';

interface ProjectContributionListProps {
  fundingTxs: PaginationHookReturn<FundingTxWithCount>;
}

export const ProjectContributionList = ({
  fundingTxs,
}: ProjectContributionListProps) => {
  const isMobile = isMobileMode();
  return (
    <>
      <VStack
        id="project-activity-list-container"
        spacing={'8px'}
        width="100%"
        overflow="auto"
        height={'100%'}
        paddingBottom="10px"
      >
        {fundingTxs.data.map((fundingTx, index) => (
          <>
            <ProjectFundingContributionsFeedItem
              key={fundingTx.id}
              fundingTx={fundingTx}
              count={fundingTx.count}
              width={'95%'}
            />
          </>
        ))}

        <ScrollInvoke
          elementId="project-activity-list-container"
          onScrollEnd={fundingTxs.fetchNext}
          isLoading={fundingTxs.isLoadingMore}
          noMoreItems={fundingTxs.noMoreItems}
        />
      </VStack>
      {isMobile && (
        <ProjectNavBar elementId={'project-activity-list-container'} />
      )}
    </>
  );
};
