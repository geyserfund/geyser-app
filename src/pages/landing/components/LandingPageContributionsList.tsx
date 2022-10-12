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
import { PaginationInput } from '../../../types/generated/graphql';

const ContributionItem = ({
  transactionResponsePayload,
}: {
  transactionResponsePayload: any;
}) => {
  const { sourceResource: project, ...fundingTx } = transactionResponsePayload;

  return (
    <Container justifyContent={'center'} width={['308px', '536px']}>
      <ProjectFundingContributionsFeedItem
        fundingTx={fundingTx}
        project={project}
        width="full"
      />
    </Container>
  );
};

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

  const [isShowingAllContributions, setIsShowingAllContributions] =
    useState(false);

  const paginationInput: PaginationInput = useMemo(() => {
    const options: PaginationInput = {};

    if (contributions.length > 0) {
      options.cursor = {
        id: Number(contributions[contributions.length - 1].id),
      };
    }

    return options;
  }, [contributions]);

  const handleLoadMoreButtonTapped = async () => {
    setIsLoadingMore(true);

    await fetchMore({
      variables: {
        input: {
          pagination: paginationInput,
        },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult.getFundingTxs.length < itemLimit) {
          setIsShowingAllContributions(true);
        }

        // return the result and let our `InMemoryCache` type policies handle
        // the merging logic.
        return {
          getFundingTxs: fetchMoreResult.getFundingTxs,
        };
      },
    });

    setIsLoadingMore(false);
  };

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
    <VStack flexDirection={'column'} spacing={6}>
      {isLoading && <Loader />}

      <List spacing={3}>
        {contributions.map((contribution: any) => (
          <ListItem key={contribution.id} justifyContent="center">
            <ContributionItem transactionResponsePayload={contribution} />
          </ListItem>
        ))}
      </List>

      {isShowingAllContributions === false ? (
        <>
          <Divider />

          {isLoadingMore === false ? (
            <Button onClick={handleLoadMoreButtonTapped}>View More</Button>
          ) : (
            <Loader />
          )}
        </>
      ) : null}
    </VStack>
  );
};
