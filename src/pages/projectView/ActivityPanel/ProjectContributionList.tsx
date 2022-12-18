import { VStack } from '@chakra-ui/react';
import React from 'react';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules';
import { ScrollInvoke } from '../../../helpers';
import { PaginationHookReturn } from '../../../hooks/types';
import { FundingTxWithCount, isMobileMode } from '../../../utils';

interface ProjectContributionListProps {
  transactions: PaginationHookReturn<FundingTxWithCount>;
}

export const ProjectContributionList = ({
  transactions,
}: ProjectContributionListProps) => {
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
      {transactions.data.map((fundingTx, index) => (
        <>
          <ProjectFundingContributionsFeedItem
            key={index}
            fundingTx={fundingTx}
            count={fundingTx.count}
            width={'95%'}
          />
        </>
      ))}

      {transactions.noMoreItems.current === false && (
        <ScrollInvoke
          elementId="project-activity-list-container"
          onScrollEnd={transactions.fetchNext}
          isLoading={transactions.isLoadingMore.current}
        />
      )}
    </VStack>
  );
};
