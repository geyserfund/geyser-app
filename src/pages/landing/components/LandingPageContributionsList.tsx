import React, { useMemo, useState } from 'react';
import {
  ListItem,
  List,
  Container,
  Button,
  Divider,
  VStack,
} from '@chakra-ui/react';

import Loader from '../../../components/ui/Loader';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules';
import { AlertBox } from '../../../components/ui';
import { useProjectFundingTransactions } from '../../../hooks/useProjectFundingTransactions';
import { FundingTx } from '../../../types/generated/graphql';

type Props = {
  itemLimit?: number;
};

export const LandingPageContributionsList = ({ itemLimit = 10 }: Props) => {
  const {
    isLoading,
    error,
    data: contributions,
    fetchMore,
  } = useProjectFundingTransactions({
    itemLimit,
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const isShowingAllContributions: boolean = useMemo(() => {
    // TODO: Implement the right logic for this
    // based upon data returned
    // from fetching (and fetching more).
    return false;
  }, [contributions, itemLimit]);

  if (error) {
    return (
      <AlertBox
        height="200px"
        status="error"
        title="An error occurred while attempting to fetch contributions."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  if (isLoading && !contributions) {
    return <Loader />;
  }

  if (contributions?.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no project contributions."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      {isLoading && <Loader />}

      <VStack alignItems={'center'} width="full" spacing={'24px'}>
        {contributions.map((contribution: FundingTx) => {
          if (contribution.sourceResource?.__typename === 'Project') {
            return (
              <ProjectFundingContributionsFeedItem
                key={contribution.id}
                fundingTx={contribution}
                project={contribution.sourceResource}
              />
            );
          }

          return null;
        })}
      </VStack>

      {isShowingAllContributions === false ? (
        <>
          <Divider />

          {isLoadingMore === false ? (
            <Button
              onClick={async () => {
                setIsLoadingMore(true);

                await fetchMore({
                  variables: {
                    input: { pagination: { take: itemLimit } },
                  },
                });

                setIsLoadingMore(false);
              }}
            >
              View More
            </Button>
          ) : (
            <Loader />
          )}
        </>
      ) : null}
    </VStack>
  );
};
