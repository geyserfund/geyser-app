import { VStack } from '@chakra-ui/react';
import React from 'react';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules';
import { ID } from '../../../constants/components';
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
  const id = ID.project.activity.contribution;
  return (
    <VStack
      id={id}
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
        elementId={!isMobile ? id : undefined}
        onScrollEnd={fundingTxs.fetchNext}
        isLoading={fundingTxs.isLoadingMore}
        noMoreItems={fundingTxs.noMoreItems}
      />
    </VStack>
  );
};
